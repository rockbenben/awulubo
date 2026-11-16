#!/bin/bash
# 逐条验证 check-spread-palette.mjs 的闸门有牙齿：
# 故意弄坏一处 → 必须报错 → 改回去。
#
# 自己备份、自己恢复——不依赖 /tmp 下别人留下的文件，换台机器跑也成立。
#
# ⚠️ FILES 里是**页面数据文件名**。跨页文件改名过（31-search → 30-search……），
# 改名之后这里的名字要一起改，否则备份那一步就报错退出，闸门其实一直没被验过。
cd "$(dirname "$0")/.." || exit 1
SPEC=src/content/books/awulubo/specs
BAK=$(mktemp -d)

FILES="08-red.js 26-night.js 34-hide.js 36-here.js"
for f in $FILES; do
  # 备份失败就**立刻停**：否则下面的破坏改完恢复不回来，
  # 闸门变红是真的，可工作区已经被改坏了。
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
# 页面数据一改（挪了位置、改了写法），写死的 sed 就悄悄匹配不上了——
# 文件没被破坏，闸门当然还是绿的，于是「没报错」被当成了「闸门没牙齿」，
# 真实的情况是**根本没验**（2026-11-02 补，跟对比度那道闸门同一个毛病）。
broke() {
  local f="$1"
  if cmp -s "$f" "$BAK/$(basename "$f")"; then
    echo "✗ 破坏没生效：$f 跟备份一模一样——这一条根本没验"
    fail=1
    return 1
  fi
  return 0
}

change_wash() {
node --input-type=module - "$1" "$2" <<'JS'
import fs from 'node:fs';
const file = process.argv[2];
const { default: spread } = await import('./' + file);
spread.pages[1].bg = { ...spread.background, ...spread.pages[1].bg, wash: process.argv[3] };
fs.writeFileSync(file, 'export default ' + JSON.stringify(spread));
JS
}

echo "=== 1. 换色系但正文没说 ==="
restore
# 36-here 的两页都是紫色的（同一幅画），正文也没交代什么转折。
# 把前一页换成绿的，这一跨就换色系了。
change_wash $SPEC/36-here.js --wash-green
if broke "$SPEC/36-here.js"; then
  out=$(node tools/check-spread-palette.mjs 2>&1)
  check "换色系没交代" "这一跨换色系了，正文却没说为什么" "$out"
fi
restore

echo "=== 2. turn 写的字正文里没有 ==="
restore
node tools/mutate-spec.mjs "$SPEC/08-red.js" "record.pages[1].turn='变紫啦';"
if broke "$SPEC/08-red.js"; then
  out=$(node tools/check-spread-palette.mjs 2>&1)
  check "turn 是假的" "但这几个字不在这一跨的文字里" "$out"
fi
restore

echo "=== 3. turn 写的是别的跨页才有的字 ==="
restore
node tools/mutate-spec.mjs "$SPEC/08-red.js" "record.pages[1].turn='全找到了';"
if broke "$SPEC/08-red.js"; then
  out=$(node tools/check-spread-palette.mjs 2>&1)
  check "turn 串到别的跨页" "但这几个字不在这一跨的文字里" "$out"
fi
restore

echo "=== 4. 把 turn 删掉（换色就没人交代了） ==="
restore
node tools/mutate-spec.mjs "$SPEC/08-red.js" "delete record.pages[1].turn;"
if broke "$SPEC/08-red.js"; then
  out=$(node tools/check-spread-palette.mjs 2>&1)
  check "删掉 turn" "这一跨换色系了，正文却没说为什么" "$out"
fi
restore

echo "=== 5. 本来同族的一跨，被改成别族就不放行 ==="
restore
# 34-hide 的两页都是紫色的（同一幅画）。把后一页换成黄的，就换色系了。
change_wash $SPEC/34-hide.js --wash-yellow
if broke "$SPEC/34-hide.js"; then
  out=$(node tools/check-spread-palette.mjs 2>&1)
  check "换成别族就不放行" "这一跨换色系了，正文却没说为什么" "$out"
fi
restore

echo
if [ "$fail" = "0" ]; then echo "全部 5 条都有牙齿"; else echo "有闸门没牙齿"; fi
exit $fail
