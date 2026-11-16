#!/bin/bash
# 逐条验证 audit-content.mjs 的闸门有牙齿：故意弄坏一处 → 必须报错 → 改回去。
#
# 自己备份、自己恢复——不依赖 /tmp 下别人留下的文件，
# 换台机器跑也成立。
#
# ⚠️ 下面 FILES 里列的是**页面数据文件名**。第十三轮把跨页文件重编过一次
# （改成从偶数页起：31-search → 30-search……），改名之后这个脚本里的名字
# 一次性全失效了——备份那一步就报错退出，闸门其实一直没被验过。
# 改名之后记得把这里的名字一起改。
cd "$(dirname "$0")/.." || exit 1
SPEC=src/content/books/awulubo/specs
BAK=$(mktemp -d)

FILES="30-search.js 38-count.js 34-hide.js 14-rainbow.js 20-burp.js 42-shout.js 58-tomorrow.js"
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
  for f in $FILES; do cp "$BAK/$f" "$SPEC/$f" || return 1; done
}
# 退出时恢复现场（备份目录最后才删）
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
    echo "$out" | tail -5
    fail=1
  fi
}
# 破坏真的生效了吗？跟备份比一比。
# 页面数据一改（挪了位置、改了写法），写死的 sed / replace 就悄悄匹配不上了——
# 文件没被破坏，闸门当然还是绿的，于是「没报错」被当成了「闸门没牙齿」，
# 真实的情况是**根本没验**（2026-11-02 补，跟对比度、色系那两道闸门同一个毛病）。
broke() {
  local f="$1"
  if cmp -s "$f" "$BAK/$(basename "$f")"; then
    echo "✗ 破坏没生效：$f 跟备份一模一样——这一条根本没验"
    fail=1
    return 1
  fi
  return 0
}

echo "=== 1. 页号不连续 ==="
restore
node tools/mutate-spec.mjs "$SPEC/34-hide.js" "delete record.scene;record.pages[1].id='p34b';"
if broke "$SPEC/34-hide.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "页号跳号" "页号不连续" "$out"
fi
restore

echo "=== 2. trap 页没有热区 ==="
restore
node tools/mutate-spec.mjs "$SPEC/30-search.js" "delete record.pages[0].reading;record.pages[0].trap=true;delete record.pages[0].hotspot;"
if broke "$SPEC/30-search.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "trap 页无热区" "但本页没有任何热区" "$out"
fi
restore

echo "=== 3. find 对象身份解析不出来 ==="
restore
node tools/mutate-spec.mjs "$SPEC/30-search.js" "record.pages[0].hotspot[0].targetId='missing-apple';"
if broke "$SPEC/30-search.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "find 指向缺失对象" '热区 targetId 不存在：missing-apple' "$out"
fi
restore

echo "=== 4. find 重复对象身份 ==="
restore
node tools/mutate-spec.mjs "$SPEC/30-search.js" "record.pages[0].hotspot[2].targetId=record.pages[0].hotspot[0].targetId;"
if broke "$SPEC/30-search.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "find 重复对象" "find 热区里有重复的 targetId" "$out"
  check "find 目标类型不匹配" "未指向匹配目标 star 的道具" "$out"
fi
restore

echo "=== 5. feed3 少了 apple ==="
restore
node tools/mutate-spec.mjs "$SPEC/14-rainbow.js" "record.pages[0].hotspot=record.pages[0].hotspot.filter(h=>h.target!=='apple');"
if broke "$SPEC/14-rainbow.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "feed3 少一样" "feed3 少了「apple」" "$out"
fi
restore

echo "=== 6. count 的 index 跳号 ==="
restore
node tools/mutate-spec.mjs "$SPEC/38-count.js" "record.pages[0].hotspot[1].index=4;"
if broke "$SPEC/38-count.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "count index 跳号" "count 的 index 必须是 1 开始的连续数" "$out"
fi
restore

echo "=== 7. count 的 .count-item 道具不够 ==="
restore
node tools/mutate-spec.mjs "$SPEC/38-count.js" "record.pages[0].props[0].class='prop-apple';"
if broke "$SPEC/38-count.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "count-item 不够" "只有 2 个 .count-item 道具" "$out"
fi
restore

echo "=== 8. 文字点名的物件没有热区 ==="
restore
node tools/mutate-spec.mjs "$SPEC/30-search.js" "record.pages[0].hotspot=record.pages[0].hotspot.filter(h=>h.target!=='star');"
if broke "$SPEC/30-search.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "星星没热区" "本页却没有指向它的热区" "$out"
fi
restore

echo "=== 9. 热区互相压住 ==="
restore
node tools/mutate-spec.mjs "$SPEC/30-search.js" "record.pages[0].hotspot[2].at=[...record.pages[0].hotspot[0].at];"
if broke "$SPEC/30-search.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "热区重叠" "重叠" "$out"
fi
restore

echo "=== 10. 热区小于 25% 页宽 ==="
restore
node tools/mutate-spec.mjs "$SPEC/30-search.js" "record.pages[0].hotspot[0].size=200;"
if broke "$SPEC/30-search.js"; then
  out=$(node tools/audit-content.mjs 2>&1)
  check "热区太小" "小于 25% 页宽" "$out"
fi
restore

echo "=== 11. 页数不是 4 的倍数 ==="
# 64 页是 4 的倍数，骑马钉才排得开（每帖 4 页）。
# 少一个跨页就变成 62 页——排版上排得开，但书脊那一帖会缺一面。
restore
mv "$SPEC/58-tomorrow.js" "$BAK/58-tomorrow.js.moved"
out=$(node tools/check-pages.mjs --full 2>&1)
check "页数不是 4 的倍数" "4 的倍数" "$out"
mv "$BAK/58-tomorrow.js.moved" "$SPEC/58-tomorrow.js"
restore

echo "=== 12. 一个文件里两页的次序写反 ==="
# 这条验的是「闸门的跨页判据跟网页里那份同源」：
# 闸门要是按页号建表配对，文件内部写反次序它看不见（照样认为同一跨），
# 可网页里按顺序配跨的那一份会把两页拆成两个独页——翻开来左右是两个故事。
restore
node tools/mutate-spec.mjs "$SPEC/34-hide.js" "delete record.scene;delete record.pages[1].responseTo;record.pages.reverse();"
if broke "$SPEC/34-hide.js"; then
  out=$(node tools/check-pages.mjs --full 2>&1)
  check "文件内两页写反" "的两页是 p35/p34" "$out"
fi
restore

echo
if [ "$fail" = "0" ]; then echo "全部 12 条都有牙齿"; else echo "有闸门没牙齿"; fi
exit $fail
