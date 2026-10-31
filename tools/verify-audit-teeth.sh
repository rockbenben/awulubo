#!/bin/bash
# 逐条验证 audit-content.mjs 的闸门有牙齿：故意弄坏一处 → 必须报错 → 改回去。
#
# 自己备份、自己恢复——不依赖 /tmp 下别人留下的文件，
# 换台机器跑也成立。
cd "$(dirname "$0")/.." || exit 1
SPEC=src/content/specs
BAK=$(mktemp -d)

FILES="31-search.js 39-count.js 35-hide.js 15-rainbow.js 21-burp.js 43-shout.js"
for f in $FILES; do cp "$SPEC/$f" "$BAK/$f"; done

restore() {
  for f in $FILES; do cp "$BAK/$f" "$SPEC/$f"; done
}
# 退出时恢复现场（备份目录最后才删）
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
    echo "$out" | tail -5
    fail=1
  fi
}

echo "=== 1. 页号不连续 ==="
restore
sed -i "s/id: 'p35'/id: 'p34b'/" $SPEC/35-hide.js
out=$(node tools/audit-content.mjs 2>&1)
check "页号跳号" "页号不连续" "$out"
restore

echo "=== 2. trap 页没有热区 ==="
restore
python - <<'PY'
import io, re
p='src/content/specs/31-search.js'
s=io.open(p,encoding='utf-8').read()
# 把这一页的热区整个去掉（孩子会卡死在这一页）
s=re.sub(r"    hotspot: \[\n(?:.*\n)*?    \],\n", "", s, count=1)
io.open(p,'w',encoding='utf-8').write(s)
PY
out=$(node tools/audit-content.mjs 2>&1)
check "trap 页无热区" "但本页没有任何热区" "$out"
restore

echo "=== 3. target 解析不出来（道具少了 class） ==="
restore
sed -i "s/class: 'prop-apple' }/}/" $SPEC/31-search.js
out=$(node tools/audit-content.mjs 2>&1)
check "道具缺 class" "找不到 class 为 prop-apple 的道具" "$out"
restore

echo "=== 4. find 目标凑不齐 ==="
restore
python - <<'PY'
import io
p='src/content/specs/31-search.js'
s=io.open(p,encoding='utf-8').read()
s=s.replace("      { action: 'find', target: 'star', at: [540, 118], size: 250, label: '找黄星星' },\n","")
io.open(p,'w',encoding='utf-8').write(s)
PY
out=$(node tools/audit-content.mjs 2>&1)
check "find 少一个目标" "find 只有 2 个目标" "$out"
restore

echo "=== 5. feed3 少了 apple ==="
restore
python - <<'PY'
import io
p='src/content/specs/15-rainbow.js'
s=io.open(p,encoding='utf-8').read()
s=s.replace("      { action: 'feed3', target: 'apple', at: [143, 177], size: 250, label: '喂红苹果' },\n","")
io.open(p,'w',encoding='utf-8').write(s)
PY
out=$(node tools/audit-content.mjs 2>&1)
check "feed3 少一样" "feed3 少了「apple」" "$out"
restore

echo "=== 6. count 的 index 跳号 ==="
restore
sed -i "s/index: 2, at: \[634, 268\]/index: 4, at: [634, 268]/" $SPEC/39-count.js
out=$(node tools/audit-content.mjs 2>&1)
check "count index 跳号" "count 的 index 必须是 1 开始的连续数" "$out"
restore

echo "=== 7. count 的 .count-item 道具不够 ==="
restore
python - <<'PY'
import io
p='src/content/specs/39-count.js'
s=io.open(p,encoding='utf-8').read()
s=s.replace("      { kind: 'apple', at: [370, 520], scale: 0.26, class: 'prop-apple count-item' },\n","",1)
io.open(p,'w',encoding='utf-8').write(s)
PY
out=$(node tools/audit-content.mjs 2>&1)
check "count-item 不够" "只有 2 个 .count-item 道具" "$out"
restore

echo "=== 8. 文字点名的物件没有热区 ==="
restore
python - <<'PY'
import io
p='src/content/specs/31-search.js'
s=io.open(p,encoding='utf-8').read()
s=s.replace("      { action: 'find', target: 'star', at: [540, 118], size: 250, label: '找黄星星' },\n","")
s=s.replace("      { action: 'find', target: 'fish', at: [646, 596], size: 250, label: '找蓝小鱼' },",
            "      { action: 'find', target: 'apple', at: [646, 596], size: 250, label: '找蓝小鱼' },")
s=s.replace("{ kind: 'star', at: [600, 150], scale: 0.13, rotate: 18, class: 'prop-star' },",
            "{ kind: 'star', at: [600, 150], scale: 0.13, rotate: 18 },")
io.open(p,'w',encoding='utf-8').write(s)
PY
out=$(node tools/audit-content.mjs 2>&1)
check "星星没热区" "本页却没有指向它的热区" "$out"
restore

echo "=== 9. 热区互相压住 ==="
restore
sed -i "s/at: \[540, 118\], size: 250, label: '找黄星星'/at: [300, 200], size: 250, label: '找黄星星'/" $SPEC/31-search.js
out=$(node tools/audit-content.mjs 2>&1)
check "热区重叠" "重叠" "$out"
restore

echo "=== 10. 热区小于 25% 页宽 ==="
restore
sed -i "s/at: \[104, 155\], size: 250, label: '找红苹果'/at: [104, 155], size: 200, label: '找红苹果'/" $SPEC/31-search.js
out=$(node tools/audit-content.mjs 2>&1)
check "热区太小" "小于 25% 页宽" "$out"
restore

echo "=== 11. 页数不是 4 的倍数 ==="
# 64 页是 4 的倍数，骑马钉才排得开（每帖 4 页）。
# 少一个跨页就变成 62 页——排版上排得开，但书脊那一帖会缺一面。
restore
mv "$SPEC/59-tomorrow.js" "$BAK/59-tomorrow.js.moved"
out=$(node tools/check-pages.mjs --full 2>&1)
check "页数不是 4 的倍数" "4 的倍数" "$out"
mv "$BAK/59-tomorrow.js.moved" "$SPEC/59-tomorrow.js"
restore

echo
if [ "$fail" = "0" ]; then echo "全部 11 条都有牙齿"; else echo "有闸门没牙齿"; fi
exit $fail
