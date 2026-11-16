#!/usr/bin/env bash
# 一条命令把《啊呜噜啵！》跑起来——不需要 nginx、不需要 Docker。
# 家里、局域网、临时给谁看看，都够用。
#
#   bash deploy/serve.sh          # 默认 8080
#   bash deploy/serve.sh 9000     # 换端口
#
# 手机：连同一个 Wi-Fi，用这台机器的内网 IP + 端口打开。
# Windows 上用：python -m http.server 8080 --directory dist-site
set -euo pipefail

cd "$(dirname "$0")/.."

PORT="${1:-8080}"
node tools/site-files.mjs --check

# 内网 IP，方便手机扫
IPS=$(hostname -I 2>/dev/null || ip -4 addr show 2>/dev/null | awk '/inet /{print $2}' | cut -d/ -f1 || true)

echo "《啊呜噜啵！》已经起来了："
echo "  本机   → http://127.0.0.1:${PORT}/index.html"
for ip in $IPS; do
  echo "  局域网 → http://${ip}:${PORT}/index.html"
done
echo "Ctrl-C 停止。"

exec python3 -m http.server "$PORT" --directory dist-site --bind 0.0.0.0
