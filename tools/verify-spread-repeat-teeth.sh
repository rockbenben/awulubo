#!/bin/bash
# 逐条验证 check-spread-repeat.mjs 的闸门有牙齿：
# 故意弄坏一处 → 必须报错 → 改回去。
#
# 自己备份、自己恢复——不依赖 /tmp 下别人留下的文件，换台机器跑也成立。
#
# ⚠️ 不要把「要改的那个值」写死在 sed 里：页面数据一改，
# 写死的 sed 就悄悄匹配不上了——文件没被破坏，闸门当然还是绿的，
# 于是「没报错」被当成了「闸门没牙齿」，真实的情况是**根本没验**
# （这个坑本项目踩过三次）。所以这里的 sed 按结构找，
# 破坏完立刻跟备份比一比，没变化就报「这一条根本没验」。
cd "$(dirname "$0")/.." || exit 1
SPEC=src/content/books/awulubo/specs
SPEC2=src/content/books/wuzilai/specs
BAK=$(mktemp -d)

FILES="$SPEC/42-shout.js $SPEC/44-seen.js $SPEC2/16-works.js $SPEC2/01-front.js $SPEC2/02-say.js src/content/books/yiqiwan/specs/60-back.js"
# 第 7、8 条破坏的是闸门**自己**读文字的那几行：读空了必须红，不许报「0 处重复」
TOOLS="tools/audit-script.mjs tools/check-spread-repeat.mjs"
for f in $FILES $TOOLS; do
  # 备份失败就**立刻停**：否则下面的破坏改完恢复不回来。
  cp "$f" "$BAK/$(basename "$f")" || {
    echo "备份失败：$f"
    echo "（页面数据改名过的话，这里的名字要一起改——文件清单：ls $SPEC）"
    exit 1
  }
done

restore() {
  for f in $FILES $TOOLS; do cp "$BAK/$(basename "$f")" "$f"; done
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

echo "=== 1. 相邻两页出现同一句（整句包含） ==="
restore
# 42-shout.js 的 p43 旁白是「你喊它……它听见了吗？」，
# 提示是「听声音。」。把提示改成跟 p44 的旁白「它看见你啦！」同款，
# 就造出一处「相邻两页说了同一句」。
node tools/mutate-spec.mjs "$SPEC/42-shout.js" "record.pages[1].text.narration.text='你认出它的声音了。';"
if broke "$SPEC/42-shout.js"; then
  out=$(node tools/check-spread-repeat.mjs 2>&1)
  check "相邻两页整句重复" "awulubo/p43→p44" "$out"
fi
restore

echo "=== 2. 相邻两页换个说法说同一件事 ==="
restore
# 临时夹具明确构造两句字序不同、字集近似的重复，不依赖当前读词或引号格式。
node tools/mutate-spec.mjs "$SPEC2/16-works.js" "record.pages[0].text.narration.text='它笑着抬起头。';record.pages[1].text.narration.text='它抬起头笑了。';"
if broke "$SPEC2/16-works.js"; then
  out=$(node tools/check-spread-repeat.mjs 2>&1)
  check "相邻两页换词重复" "wuzilai/p32→p33" "$out"
fi
restore

echo "=== 3. 主语相同就不是对仗，必须报 ==="
restore
# 第一册 p44 旁白「它看见你啦！」与 p45 拟声词「我看见你啦！」是两个孩子
# 各说一句——剥掉主语后核心相同、主语不同，是**对仗**，闸门要放行。
# 可一旦主语也变成同一个（它/它），那就不是对仗，是同一句说了两遍，
# 闸门必须报出来。
node tools/mutate-spec.mjs "$SPEC/44-seen.js" "record.pages[0].text.narration.text='它看见你啦！';record.pages[1].text.narration.text='它看见你啦！';"
if broke "$SPEC/44-seen.js"; then
  out=$(node tools/check-spread-repeat.mjs 2>&1)
  check "主语相同＝真重复" "awulubo/p44→p45" "$out"
fi
restore

echo "=== 4. 真对仗必须放行（不许误报） ==="
restore
node tools/mutate-spec.mjs "$SPEC/44-seen.js" "record.pages[0].text.narration.text='它看见你啦！';record.pages[1].text.narration.text='我看见你啦！';"
# 保持 p44 旁白「它看见你啦！」与 p45 拟声词「我看见你啦！」的原样：
# 主语不同、剥掉主语后核心相同 —— 这是刻意的呼应，不是卡带。
# 闸门要是把它报出来，就等于逼着人把对仗改成同一句。
out=$(node tools/check-spread-repeat.mjs 2>&1)
if echo "$out" | grep -q "awulubo/p44→p45"; then
  echo "✗ 对仗被当成重复报出来了——闸门太紧，会逼人把对仗改成同一句"
  echo "$out" | tail -8
  fail=1
else
  echo "✓ 对仗放行 → 没有误报"
fi

echo "=== 5. 基线：没破坏时必须是 0 处 ==="
restore
out=$(node tools/check-spread-repeat.mjs 2>&1)
if echo "$out" | grep -q "相邻两页重复 0 处"; then
  echo "✓ 基线 0 处 → 闸门绿着"
else
  echo "✗ 基线就不是 0 处"
  echo "$out" | tail -8
  fail=1
fi

echo "=== 6. audit-script.mjs 的退出码要跟着结果走 ==="
# 这道闸门 2026-11-04 接进 CI，可它原来不管有没有重复都退出 0——
# 门是关着的，但看起来像关着。退出码不跟结果走，CI 就永远发现不了。
#
# ⚠️ 用例要挑 **audit-script 查得到的那种重复**：
# 它查「相邻两页的旁白」，不查「相邻两页的旁白 × 拟声词」
# （那一档是 check-spread-repeat.mjs 的活，两道闸门互补）。
restore
node tools/mutate-spec.mjs "$SPEC/44-seen.js" "record.pages[0].text.narration.text='草里两只脚一翘：我在这儿！';"
if broke "$SPEC/44-seen.js"; then
  node tools/audit-script.mjs >/dev/null 2>&1
  code=$?
  if [ "$code" != "0" ]; then
    echo "✓ 有重复时退出码非 0（$code）→ CI 拦得住"
  else
    echo "✗ 有重复却退出 0——闸门在 CI 里是装饰，门是关着的但看起来像关着"
    fail=1
  fi
fi
restore
node tools/audit-script.mjs >/dev/null 2>&1
code=$?
if [ "$code" = "0" ]; then
  echo "✓ 没重复时退出 0 → 闸门绿着"
else
  echo "✗ 没重复却退出 $code"
  fail=1
fi

echo "=== 7. 读空了必须红：audit-script 不许报「0 处重复」 ==="
# 把闸门读文字的那三个槽名改成对不上任何页面数据的样子：
# 三句全读成空串，重复数永远是 0。这时闸门必须红——
# 读到空就说「没有重复」，等于把没量到报成合格（check-contrast 的 measured===0 同一形状）。
restore
sed -i "s/\.text\.narration/.text.narrateX/g; s/\.text\.prompt/.text.prompX/g; s/\.text\.sound/.text.sounX/g" tools/audit-script.mjs
if broke tools/audit-script.mjs; then
  check "audit-script 读空要报" "一处文字都没读到" "$(node tools/audit-script.mjs 2>&1)"
  node tools/audit-script.mjs >/dev/null 2>&1
  code=$?
  if [ "$code" != "0" ]; then
    echo "✓ audit-script 读空时退出码非 0（$code）→ CI 拦得住"
  else
    echo "✗ audit-script 读空却退出 0——读到空被当成了合格"
    fail=1
  fi
fi
restore

echo "=== 8. 读空了必须红：check-spread-repeat 同一件事 ==="
restore
sed -i "s/'narration'/'narrateX'/g; s/'prompt'/'prompX'/g; s/'sound'/'sounX'/g" tools/check-spread-repeat.mjs
if broke tools/check-spread-repeat.mjs; then
  check "check-spread-repeat 读空要报" "一处文字都没读到" "$(node tools/check-spread-repeat.mjs 2>&1)"
  node tools/check-spread-repeat.mjs >/dev/null 2>&1
  code=$?
  if [ "$code" != "0" ]; then
    echo "✓ check-spread-repeat 读空时退出码非 0（$code）"
  else
    echo "✗ check-spread-repeat 读空却退出 0——读到空被当成了合格"
    fail=1
  fi
fi
restore

echo
echo "=== 9. 版权书名放行，但版权页真重复仍须拦截 ==="
restore
node tools/mutate-spec.mjs src/content/books/yiqiwan/specs/60-back.js "record.pages[0].text.narration.text='明天，还一起玩。';"
if broke src/content/books/yiqiwan/specs/60-back.js; then
  out=$(node tools/check-spread-repeat.mjs 2>&1)
  check "版权页故事句重复" "yiqiwan/p59→p60" "$out"
fi
restore
echo "=== 10. 扉页只排除与册名完全一致的标题 ==="
restore
node tools/mutate-spec.mjs "$SPEC2/01-front.js" "record.pages.find(p=>p.id==='p03').text.sound.text='我自己来！我自己来！';"
if broke "$SPEC2/01-front.js"; then
  out=$(node tools/check-spread-repeat.mjs 2>&1); code=$?
  check "扉页非书名重复" "wuzilai/p03→p04" "$out"
  if [ "$code" = "0" ]; then echo "✗ 标题破坏却退出0"; fail=1; fi
fi
restore
echo "=== 11. 同字首句不能放过正文内的重复 ==="
node tools/mutate-spec.mjs "$SPEC2/02-say.js" "record.pages[1].text.narration.text='我自己来！';"
if broke "$SPEC2/02-say.js"; then
  out=$(node tools/check-spread-repeat.mjs 2>&1); code=$?
  check "正文同句重复" "wuzilai/p04→p05" "$out"
  if [ "$code" = "0" ]; then echo "✗ 正文重复却退出0"; fail=1; fi
fi
restore
if [ "$fail" = "0" ]; then echo "全部 11 条都有牙齿"; else echo "有闸门没牙齿"; fi
exit $fail
