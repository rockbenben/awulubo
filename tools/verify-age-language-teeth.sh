#!/bin/bash
# 逐条验证 check-age-language.mjs 的闸门有牙齿：
# 故意往书稿里塞一句三岁接不住的话 → 必须报错 → 改回去。
#
# 只改临时副本里的文件（verify-teeth.mjs 已经把整个仓库复制过去了），
# 脚本自己也备份、自己恢复，单独跑也不会弄坏作者工作区。
#
# ⚠️ 破坏按结构找，不写死「要改的那个值」：文案一改，写死的 sed
# 就悄悄匹配不上了，文件没被破坏、闸门自然还是绿的——那就根本没验。
cd "$(dirname "$0")/.." || exit 1
SPEC=src/content/books/shengqi/specs/29-tomorrow.js
SPEC2=src/content/books/labuluo/specs/24-song.js
GATE=tools/check-age-language.mjs
BAK=$(mktemp -d)

cp "$SPEC" "$BAK/spec.js" || exit 1
cp "$SPEC2" "$BAK/spec2.js" || exit 1
cp "$GATE" "$BAK/gate.mjs" || exit 1

restore() {
  cp "$BAK/spec.js" "$SPEC" || return 1
  cp "$BAK/spec2.js" "$SPEC2" || return 1
  cp "$BAK/gate.mjs" "$GATE" || return 1
}
cleanup() {
  restore || { echo "恢复失败，保留备份：$BAK"; return 1; }
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
broke() {
  local f="$1" bak="$2"
  if cmp -s "$f" "$bak"; then
    echo "✗ 破坏没生效：$f 跟备份一模一样——这一条根本没验"
    fail=1
    return 1
  fi
  return 0
}
# 按旁白结构写入违规句，不依赖书稿使用单引号还是JSON格式。
break_text() {
  local bad="$1"
  BAD="$bad" node --input-type=module - "$SPEC" <<'JS'
import fs from 'node:fs';
import assert from 'node:assert/strict';
const file=process.argv[2],original=fs.readFileSync(file,'utf8');
assert.match(original,/export default/);
const changed=original.replace('export default','const record =')+
  '\nrecord.pages[0].text.narration.text='+JSON.stringify(process.env.BAD)+';\nexport default record;';
fs.writeFileSync(file,changed);
assert.notEqual(fs.readFileSync(file,'utf8'),original,'语言破坏必须实际改变文件');
JS
}

echo "=== 1. 正文出现明喻 ==="
restore
break_text '像云一样散了。'
if broke "$SPEC" "$BAK/spec.js"; then
  out=$(node "$GATE" 2>&1)
  check "明喻" "比喻/类比" "$out"
fi
restore

echo "=== 2. 第四册出现「没关系」 ==="
restore
break_text '没关系。'
if broke "$SPEC" "$BAK/spec.js"; then
  out=$(node "$GATE" 2>&1)
  check "否定情绪" "否定情绪" "$out"
fi
restore

echo "=== 3. 正文出现条件复句 ==="
restore
break_text '不然不会好。'
if broke "$SPEC" "$BAK/spec.js"; then
  out=$(node "$GATE" 2>&1)
  check "复句" "条件或转折复句" "$out"
fi
restore

echo "=== 4. 正文出现抽象词 ==="
restore
break_text '满满当当。'
if broke "$SPEC" "$BAK/spec.js"; then
  out=$(node "$GATE" 2>&1)
  check "抽象词" "抽象或指令不明的词" "$out"
fi
restore

echo "=== 5. 闸门读空了必须红 ==="
restore
sed -i 's/n >= 4 && n <= 59/n >= 999 \&\& n <= 999/' "$GATE"
if broke "$GATE" "$BAK/gate.mjs"; then
  out=$(node "$GATE" 2>&1)
  check "读到零条" "一页正文文字都没读到" "$out"
fi
restore

echo "=== 6. 纸书 print 文案也要过闸门 ==="
restore
node tools/mutate-spec.mjs "$SPEC2" "record.pages[0].text.prompt.print='像云一样散了。';"
if broke "$SPEC2" "$BAK/spec2.js"; then
  out=$(node "$GATE" 2>&1)
  check "印刷版文案" "印刷版提示" "$out"
fi
restore

echo
if [ "$fail" = "0" ]; then echo "全部 6 条都有牙齿"; else echo "有闸门没牙齿"; fi
exit $fail
