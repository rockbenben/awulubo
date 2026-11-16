#!/bin/bash
# 逐条验证授权闸门有牙齿：故意弄坏一处 → 必须报错 → 改回去。
#
# 自己备份、自己恢复——不依赖 /tmp 下别人留下的文件，换台机器跑也成立。
#
# 验的是两道新闸门：
#   tools/check-licenses.mjs  字体授权 + 授权分层 + 本机路径泄漏
#   tools/check-publish.mjs   发布前那几件发出去就收不回来的事
cd "$(dirname "$0")/.." || exit 1
BAK=$(mktemp -d)

LIC=LICENSE-CONTENT.md
README=README.md
LICENSE=LICENSE

for f in "$LIC" "$README" "$LICENSE"; do
  # 备份失败就**立刻停**：否则下面的破坏改完恢复不回来，
  # 闸门变红是真的，可工作区已经被改坏了。
  cp "$f" "$BAK/$f" || { echo "备份失败：$f"; exit 1; }
done

restore() {
  for f in "$LIC" "$README" "$LICENSE"; do cp "$BAK/$f" "$f"; done
  rm -rf src/teeth-probe
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
    echo "$out" | tail -6
    fail=1
  fi
}
# 反向检查：不该报的时候别报
check_absent() {
  local name="$1" expect="$2" out="$3"
  if echo "$out" | grep -qF "$expect"; then
    echo "✗ $name → 还在报，闸门没在读这个值"
    echo "$out" | tail -6
    fail=1
  else
    echo "✓ $name → 不报了"
  fi
}
# 破坏真的生效了吗？跟备份比一比。
# 写死的 sed 在文档改版后会悄悄匹配不上——文件没被破坏，闸门当然还是绿的，
# 于是「没报错」被当成了「闸门没牙齿」，真实的情况是根本没验。
broke() {
  local f="$1"
  if cmp -s "$f" "$BAK/$(basename "$f")"; then
    echo "✗ 破坏没生效：$f 跟备份一模一样——这一条根本没验"
    fail=1
    return 1
  fi
  return 0
}

run_lic() { node tools/check-licenses.mjs 2>&1; }
SITE="$BAK/site"
mkdir "$SITE" || exit 1
for f in index.html print.html proof.html booklet.html edgeone.json; do
  cp "dist/$f" "$SITE/$f" || exit 1
done
run_pub() { node tools/check-publish.mjs "$SITE" 2>&1; }

echo "=== 1. 作品内容许可文件不见了 ==="
restore
mv "$LIC" "$BAK/hidden.md"
check "删掉 LICENSE-CONTENT.md" "缺 LICENSE-CONTENT.md" "$(run_lic)"
restore

echo "=== 2. 内容许可写成了别的协议 ==="
restore
sed -i 's/CC BY-NC-ND 4\.0/CC BY-NC 4.0/g' "$LIC"
if broke "$LIC"; then
  check "内容许可不是 BY-NC-ND" "没有写明 CC BY-NC-ND 4.0" "$(run_lic)"
fi
restore

echo "=== 3. 适用范围漏了一个内容目录 ==="
restore
sed -i 's|`src/components/`|`src/角色/`|' "$LIC"
if broke "$LIC"; then
  check "适用范围漏写 src/components/" "适用范围里没写 src/components/" "$(run_lic)"
fi
restore

echo "=== 4. README 不提作品内容那层 ==="
restore
sed -i 's|LICENSE-CONTENT\.md|LICENSE-MISSING.md|g' "$README"
if broke "$README"; then
  check "README 少了内容许可入口" "README 里没有指向 LICENSE-CONTENT.md 的入口" "$(run_lic)"
fi
restore

echo "=== 5. README 的授权一节只字不提内容许可 ==="
restore
# 只改「## 授权」到下一个二级标题之间的那一段，首屏徽章与支持范围表里的链接留着
sed -i '/^## 授权[[:space:]]*$/,/^## 关于/{s|LICENSE-CONTENT\.md|LICENSE-MISSING.md|g}' "$README"
if broke "$README"; then
  check "授权一节没提内容那层" "README 的「授权」一节没提作品内容那层" "$(run_lic)"
fi
restore

echo "=== 6. 仓库里写进了本机绝对路径 ==="
restore
# 造一个假的盘符路径当例子。**不能把它原样写在这份文件里**——
# 泄漏检查扫的是 git 跟踪的文本文件，包括这个脚本自己：
# 原样写出来，这道闸门会先把自己扫红（真发生过）。
# 盘符跟斜杠拆成两段拼：拼好的样子带着冒号加斜杠，漏检的正则会当场把自己扫红。
SAMPLE_PATH='Q:'"/Backup/Somewhere"
printf '\n本机路径示例：%s\n' "$SAMPLE_PATH" >> "$README"
# 认的是**失败时才会出现**的那半句。「有本机绝对路径」不能用——
# 成功时那句「没有本机绝对路径」里也含这五个字，闸门没报也算通过（2026-11-01 修）。
if broke "$README"; then
  check "README 里出现本机路径" "公开仓库会把本机目录结构发出去" "$(run_lic)"
fi
restore

echo "=== 7. src/ 下多了个没归类的目录 ==="
restore
mkdir -p src/teeth-probe && echo x > src/teeth-probe/a.txt
check "src/ 新目录没归类" "没有归到授权分层里" "$(run_lic)"
restore

echo "=== 8. LICENSE 不是 MIT 了 ==="
restore
sed -i 's/MIT License/Some Other License/' "$LICENSE"
if broke "$LICENSE"; then
  check "LICENSE 不是 MIT" "没有 MIT License 标题" "$(run_lic)"
fi
restore

echo "=== 9. 公开目录只收齐全的五个文件 ==="
for entry in book.pdf private; do
  if [ "$entry" = private ]; then
    mkdir "$SITE/private" && printf '%%PDF-1.4\n' > "$SITE/private/book.pdf" || exit 1
  else
    printf '%%PDF-1.4\n' > "$SITE/book.pdf" || exit 1
  fi
  if out=$(run_pub); then fail=1; fi
  check "拒收 $entry" "发布目录含清单外文件或目录 $entry" "$out"
  rm -rf "$SITE/$entry"
done
mv "$SITE/print.html" "$BAK/print.html" || exit 1
if out=$(run_pub); then fail=1; fi
check "缺少印刷入口" "缺少有效文件" "$out"
mv "$BAK/print.html" "$SITE/print.html" || exit 1
check_absent "恢复公开目录" "缺少有效文件" "$(run_pub)"

echo "=== 10. 商业授权联系方式是占位符的时候要报 ==="
restore
# 把邮箱换成一个占位符——占位符还在就得报。
# （不能靠文件里本来就有占位符：邮箱填好之后就没有了。）
sed -i 's|联系：`[^`]*`|联系：`<!-- CONTACT -->`|' "$LIC"
if broke "$LIC"; then
  check "占位符还在会报" "联系方式还是占位符" "$(run_pub)"
fi
restore

echo "=== 11. 联系方式填好了就不报 ==="
restore
check_absent "联系方式填好了" "联系方式还是占位符" "$(run_pub)"

echo
if [ "$fail" -eq 0 ]; then
  echo "✓ 授权闸门的牙齿验完了：每一处破坏都报出来了"
else
  echo "✗ 有闸门没牙齿"
fi
exit $fail
