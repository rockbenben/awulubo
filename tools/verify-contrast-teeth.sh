#!/bin/bash
# 验证 check-contrast.mjs 的文字可见性与局部底色检查：
# 故意把字挪到角色身上 → 必须报错 → 改回去。
#
# 这条规则量的是**像素**：同一页拍两张，一张有字一张没字，
# 差出来的像素是字的墨迹，墨迹底下被角色/道具盖住的那部分就算数。
# 以前只量「整框字压在什么底色上」（取众数），
# 所以一句话只压住角色一小块时闸门全绿——那句话其实读不出来。
#
# 自己备份、自己恢复——不依赖 /tmp 下别人留下的文件，换台机器跑也成立。
#
# ⚠️ **破坏必须真的生效**（2026-11-02 修）：
# 原来这里用 sed 改一个写死的 at 值（`at: [60, 150]`），
# 页面数据一改（挪到 [70, 150]）sed 就悄悄匹配不上了——
# 文件没被破坏，闸门当然还是绿的，于是「没报错」被当成了「闸门没牙齿」。
# 真实的情况是**根本没验**。现在破坏完立刻跟备份比一比：
# 没变化 = 破坏没生效，直接判失败，不往下走。
cd "$(dirname "$0")/.." || exit 1
SPEC=src/content/books/awulubo/specs
BAK=$(mktemp -d)

FILES="26-night.js"
for f in $FILES; do
  cp "$SPEC/$f" "$BAK/$f" || {
    echo "备份失败：$SPEC/$f"
    echo "（页面数据改名过的话，这里的名字要一起改——文件清单：ls $SPEC）"
    exit 1
  }
done

restore() {
  for f in $FILES; do cp "$BAK/$f" "$SPEC/$f"; done
}
cleanup() {
  restore
  rm -rf "$BAK"
}
trap cleanup EXIT

fail=0
check() {
  local name="$1" expect="$2" out="$3"
  if echo "$out" | grep -qF "$expect"; then
    echo "✓ $name → 报出来了"
  else
    echo "✗ $name → 没报错！闸门没牙齿"
    echo "$out" | tail -8
    fail=1
  fi
}
# 破坏真的生效了吗？跟备份比一比。
broke() {
  local f="$1"
  if cmp -s "$f" "$BAK/$(basename "$f")"; then
    echo "✗ 破坏没生效：$f 跟备份一模一样——这一条根本没验"
    fail=1
    return 1
  fi
  return 0
}

# 按同月亮的实际故事坐标及取景，把白字放进月亮中央。
# 文字不随取景变换，不能继续拿旧的页面坐标制造反例。
break_onto_moon() {
  node tools/mutate-spec.mjs "$SPEC/26-night.js" "const p=record.pages[0],moon=p.props.find(o=>o.kind==='moon');if(!moon)throw new Error('反例须读到同月亮');const f=p.framing||{at:[0,0],scale:1};p.text.narration={text:'月亮',at:[(moon.at[0]+500*moon.scale-50)*f.scale+f.at[0],(moon.at[1]+500*moon.scale-40)*f.scale+f.at[1]],size:4*f.scale,width:180*f.scale};"
}

# 只量 p26 这一页：闸门支持按页过滤，跑全量要五分钟，验牙齿不用等那么久。
SCOPE=awulubo/p26

echo "=== 1. 没坏的时候是绿的 ==="
restore
npm run build >/dev/null 2>&1
out=$(node tools/check-contrast.mjs "$SCOPE" 2>&1)
if echo "$out" | grep -qF "✓ 文字对比度全部达标"; then
  echo "✓ 全部达标 → 闸门没误报"
else
  echo "✗ 没坏就报错了 → 闸门有误报"
  echo "$out" | tail -8
  fail=1
fi

echo "=== 2. 把字挪到月亮上（白字压浅黄的月亮） ==="
restore
break_onto_moon
if broke "$SPEC/26-night.js"; then
  # 闸门量的是**构建产物**，不改产物就量的还是上一版页面
  npm run build >/dev/null 2>&1
  out=$(node tools/check-contrast.mjs "$SCOPE" 2>&1)
  code=$?
  check "字压在月亮上" "笔画底色对比度不足" "$out"
  if [ "$code" = 0 ]; then fail=1; fi
fi
restore
npm run build >/dev/null 2>&1

echo "=== 3. 单句文字消失必须报错 ==="
node --input-type=module <<'JS'
import fs from 'node:fs';
for (const name of ['index', 'proof']) {
  const file = 'dist/' + name + '.html';
  const html = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, html.replace('</head>', '<style>[data-book="awulubo"][data-id="p03"] .narration{visibility:hidden!important}</style></head>'));
}
JS
out=$(node tools/check-contrast.mjs awulubo/p03 2>&1)
code=$?
check "旁白消失" "应显示的文字缺失或不可见" "$out"
if [ "$code" = 0 ]; then fail=1; fi
npm run build >/dev/null 2>&1

echo "=== 4. display:none 不能逃过文字清单检查 ==="
node --input-type=module <<'JS'
import fs from 'node:fs';
for (const name of ['index', 'proof']) {
  const file = 'dist/' + name + '.html';
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('</head>', '<style>[data-book="awulubo"][data-id="p03"] .narration{display:none!important}</style></head>'));
}
JS
out=$(node tools/check-contrast.mjs awulubo/p03 2>&1)
code=$?
check "旁白无布局" "应显示的文字缺失或不可见" "$out"
if [ "$code" = 0 ]; then fail=1; fi
npm run build >/dev/null 2>&1

echo "=== 5. 透明的文字必须报错 ==="
node --input-type=module <<'JS'
import fs from 'node:fs';
for (const name of ['index', 'proof']) {
  const file = 'dist/' + name + '.html';
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('</head>', '<style>[data-book="awulubo"][data-id="p03"] .narration{opacity:0!important}</style></head>'));
}
JS
out=$(node tools/check-contrast.mjs awulubo/p03 2>&1)
code=$?
check "透明旁白" "应显示的文字缺失或不可见" "$out"
if [ "$code" = 0 ]; then fail=1; fi
npm run build >/dev/null 2>&1

echo "=== 6. 浅底上的局部深紫笔触必须报错 ==="
node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import fs from 'node:fs';
for (const name of ['index', 'proof']) {
  const file = 'dist/' + name + '.html';
  const original = fs.readFileSync(file, 'utf8');
  const changed = original.replace('</head>', '<style>[data-book="awulubo"][data-id="p03"] .art{background:linear-gradient(90deg,white 0 38%,#5B4A8A 38% 42%,white 42% 100%)}[data-book="awulubo"][data-id="p03"] .fx{visibility:hidden!important}</style></head>');
  assert.notEqual(changed, original, '深紫笔触破坏没有生效');
  fs.writeFileSync(file, changed);
}
JS
if [ "$?" != 0 ]; then exit 1; fi
out=$(node tools/check-contrast.mjs awulubo/p03 2>&1)
code=$?
check "局部深紫笔触" "笔画底色对比度不足" "$out"
if [ "$code" = 0 ]; then fail=1; fi
npm run build >/dev/null 2>&1

echo
if [ "$fail" = "0" ]; then echo "六条都有牙齿"; else echo "有闸门没牙齿"; fi
exit $fail
