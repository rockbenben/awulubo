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
  rm -f dist/teeth-probe.pdf
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

run_lic() { node tools/check-licenses.mjs 2>&1; }
run_pub() { node tools/check-publish.mjs 2>&1; }

echo "=== 1. 作品内容许可文件不见了 ==="
restore
mv "$LIC" "$BAK/hidden.md"
check "删掉 LICENSE-CONTENT.md" "缺 LICENSE-CONTENT.md" "$(run_lic)"
restore

echo "=== 2. 内容许可写成了别的协议 ==="
restore
sed -i 's/CC BY-NC-ND 4\.0/CC BY-NC 4.0/g' "$LIC"
check "内容许可不是 BY-NC-ND" "没有写明 CC BY-NC-ND 4.0" "$(run_lic)"
restore

echo "=== 3. 适用范围漏了一个内容目录 ==="
restore
sed -i 's|`src/components/`|`src/角色/`|' "$LIC"
check "适用范围漏写 src/components/" "适用范围里没写 src/components/" "$(run_lic)"
restore

echo "=== 4. README 不提作品内容那层 ==="
restore
sed -i 's|LICENSE-CONTENT\.md|LICENSE-MISSING.md|g' "$README"
check "README 少了内容许可入口" "README 里没有指向 LICENSE-CONTENT.md 的入口" "$(run_lic)"
restore

echo "=== 5. README 的授权一节只字不提内容许可 ==="
restore
# 只改「## 授权」到下一个二级标题之间的那一段，首屏徽章与支持范围表里的链接留着
sed -i '/^## 授权$/,/^## 关于/{s|LICENSE-CONTENT\.md|LICENSE-MISSING.md|g}' "$README"
check "授权一节没提内容那层" "README 的「授权」一节没提作品内容那层" "$(run_lic)"
restore

echo "=== 6. 仓库里写进了本机绝对路径 ==="
restore
# 造一个假的盘符路径当例子。**不能把它原样写在这份文件里**——
# 泄漏检查扫的是 git 跟踪的文本文件，包括这个脚本自己：
# 原样写出来，这道闸门会先把自己扫红（真发生过）。
SAMPLE_PATH='Q:' '/Backup/Somewhere'
printf '\n本机路径示例：%s\n' "$SAMPLE_PATH" >> "$README"
check "README 里出现本机路径" "有本机绝对路径" "$(run_lic)"
restore

echo "=== 7. src/ 下多了个没归类的目录 ==="
restore
mkdir -p src/teeth-probe && echo x > src/teeth-probe/a.txt
check "src/ 新目录没归类" "没有归到授权分层里" "$(run_lic)"
restore

echo "=== 8. LICENSE 不是 MIT 了 ==="
restore
sed -i 's/MIT License/Some Other License/' "$LICENSE"
check "LICENSE 不是 MIT" "没有 MIT License 标题" "$(run_lic)"
restore

echo "=== 9. 印刷 PDF 混进了 dist/ ==="
restore
# dist/ 不进仓库，新克隆里没有这一层——先建出来再放 PDF
mkdir -p dist
printf '%%PDF-1.4\n' > dist/teeth-probe.pdf
check "dist/ 里有 PDF" "dist/ 里有印刷 PDF" "$(run_pub)"
rm -f dist/teeth-probe.pdf

echo "=== 10. 商业授权联系方式是占位符的时候要报 ==="
restore
# 把邮箱换成一个占位符——占位符还在就得报。
# （不能靠文件里本来就有占位符：邮箱填好之后就没有了。）
sed -i 's|联系：`[^`]*`|联系：`<!-- CONTACT -->`|' "$LIC"
check "占位符还在会报" "联系方式还是占位符" "$(run_pub)"
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
