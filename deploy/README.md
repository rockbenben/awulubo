# 《啊呜噜啵！》部署速查

屏幕互动版是**纯静态**的：没有后端、没有账号、没有统计。
`dist/` 的内容传到任何能发静态文件的地方就能用。

## 方案 A：EdgeOne Pages（腾讯云，推荐，也是本项目默认目标）

**模式跟兄弟项目一样**（022-onepage / 025-kuafu / 039-text2handwriting / 046-gdp-map）：

```
main 分支（源码）──CI 验过──▶ gh-pages 分支（构建产物）──▶ EdgeOne Pages 直接取这个分支
```

**EdgeOne 只负责发布，不负责构建** —— 分支里已经是产物了，
所以 EdgeOne 侧的 Git 集成这样填：

| 项 | 填什么 |
|---|---|
| 仓库 | 这个仓 |
| 分支 | **`gh-pages`** |
| 构建命令 | **留空**（分支里就是产物，不用再构建） |
| 输出目录 | `/`（分支根目录） |

**缓存与安全响应头**由产物里的 `edgeone.json` 决定（`public/edgeone.json` → 构建时进 `dist/` → 随分支走）：

```json
{
  "name": "awulubo",
  "headers": [
    { "source": "**/*.html", "headers": [{ "key": "Cache-Control", "value": "no-store" }] },
    { "source": "**/*.pdf",  "headers": [{ "key": "Cache-Control", "value": "public, max-age=604800" }] },
    { "source": "/**", "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "interest-cohort=(), browsing-topics=()" }
    ] }
  ]
}
```

**两个 workflow**（`.github/workflows/`）：

| 文件 | 干什么 |
|---|---|
| `ci.yml` | 推 main / 提 PR 时：装 Node 24 + Python + Playwright chromium → `npm run check` → 构建 → 导 PDF → 冒烟 → 压力测试 |
| `deploy.yml` | 推 main 时：同样的门禁 → 构建 → 把 `dist/` 推到 `gh-pages` 分支 |

**CI 依赖**（`requirements.txt`）：

```
fonttools>=4.68
brotli>=1.2
```

只有字体那两步要 Python：`npm run fonts`（pyftsubset 切子集）与
`python tools/check-text.py`（核对子集有没有覆盖全书用字——漏字会退回未授权的系统字体）。
**子集本身是提交进仓库的**（`src/fonts/*.woff2`），CI 不用重新切字。

**Node 版本写死 '24'**：不写 `^24` 是因为 setup-node 会装"最新满足的"那个版本，
哪天 Node 26 出来 CI 就悄悄换了线。写死一条，CI 跑的就是本地那条。

**构建机上会得到什么**（干净构建实测）：5 个文件、合计 1.7 MB——
`index.html`（屏幕互动版）、`print.html`、`proof.html`（全部页面平铺）、`booklet.html`（A4 拼版）、
`edgeone.json`（响应头）。
`shots/` 与三个 PDF 是本地产物，**构建机不生成，也就不会被上传** ✓。

**要把印刷 PDF 也放到站上**（可选）：在 `deploy.yml` 的构建命令后面加

```
&& npm run pdf && npm run pdf:booklet && node tools/pdf-booklet.mjs --a3
```

PDF 必须由真的浏览器渲染，所以构建机上要有 Chromium（`npx playwright install --with-deps chromium`）。
这条路径在 Debian 容器里已验证可行（见下面 Docker 那套的构建阶段）✓。

**本地也推一次 gh-pages**（推到本地的裸 origin，验证机制）：

```bash
npx vite build --outDir dist-site --emptyOutDir
node tools/push-gh-pages.mjs dist-site
```

**Git 仓库**：EdgeOne Pages 要连的是 GitHub / GitLab / Gitee 上的仓库。
本项目现在的 origin 是本地裸库 `awulubo-origin.git`，推到代码托管站再连即可。

## 方案 B：nginx（自己的服务器）

```bash
# 1. 构建产物（本地或 CI 里跑）
npm ci && npm run build

# 2. 传到服务器
rsync -av dist/ user@server:/var/www/awulubo/

# 3. 装配置
cp deploy/nginx-root.conf /etc/nginx/conf.d/book.conf
nginx -t && systemctl reload nginx

# 4. 证书（certbot 会自己把配置改写成 https）
certbot --nginx -d book.example.com
```

配置：`deploy/nginx-root.conf`（整站根目录）、`deploy/nginx-subpath.conf`（挂在已有站点的 `/book/` 下）。

## 方案 C：Caddy（自动 HTTPS，两行）

```bash
cp deploy/Caddyfile /etc/caddy/Caddyfile   # 改里面的域名
caddy reload
```

## 方案 D：Docker（NAS、小主机、想隔离）

```bash
docker compose -f deploy/docker-compose.yml up -d --build
# → http://服务器IP:8080
```

镜像里是 nginx + 静态文件，只暴露 80 端口。

## 方案 E：一条命令（家里、局域网、临时看看）

```bash
bash deploy/serve.sh          # 默认 8080
bash deploy/serve.sh 9000     # 换端口
```

用 Python 自带的静态服务器，**不需要 nginx**。
手机连同一个 Wi-Fi，用这台机器的内网 IP 打开就能读。

Windows 上：

```powershell
npx serve dist -l 8080
```

## 方案 F：对象存储 / GitHub Pages（不想有服务器）

整个 `dist/` 传上去，首页指向 `index.html` 即可。

- **GitHub Pages**：仓库 Settings → Pages → 选 `main` 分支 `/dist`。
  （仓库里 dist/ 在 .gitignore 里，要么改忽略，要么用 Actions 构建后发布。）
- **对象存储（OSS/COS/S3）**：上传 `dist/` 的内容，设静态网站首页为 `index.html`。
  **记得给 `.pdf` 设 `Content-Type: application/pdf`**，否则浏览器只会强制下载。

---

## 已实测

这两套是**在这台机器上真跑过的**，不是纸面配置：

| 方案 | 怎么验的 | 结果 |
|---|---|---|
| nginx | `nginx -t` → 起服务 → curl + 真浏览器加载 | 语法 ok；`index.html` 200 / `text/html; charset=utf-8`；`book.pdf` 200 / `application/pdf`；gzip 协商成功（`Content-Encoding: gzip`）；`index.html` 带 `Cache-Control: no-cache`；浏览器里 32 页正常、点封面进 p02、声音峰值 0.117、零 console 错误 |
| Docker | `docker build` → `docker run` → curl + 真浏览器加载 | 镜像 53.7 MB；容器里 `index.html` 与三个 PDF 全部 200、Content-Type 正确；浏览器里 32 页正常、点封面进 p02、声音峰值 0.117、零 console 错误 |
| EdgeOne 构建产物 | 干净构建（`vite build --outDir`）→ 列清单 | 4 个 HTML / 1.7 MB；`shots/` 与 PDF 不会被上传 ✓ |

> 第一版的 Dockerfile **漏了打印 PDF**：镜像里只跑了 `npm run build`，
> PDF 要真浏览器渲染，`npm run pdf` 得在构建阶段跑（已修）。
> 顺带：构建阶段用 `node:22-bookworm-slim` 而不是 alpine——
> musl 上 Playwright 的 Chromium 装不稳。

---

## 部署完怎么验

```bash
# 1. 页面在
curl -I https://book.example.com/index.html      # 期望 200 + Content-Type: text/html

# 2. PDF 类型对
curl -I https://book.example.com/book.pdf         # 期望 Content-Type: application/pdf

# 3. 深链接能直达（hash 路由，不需要服务器配合）
curl -s https://book.example.com/index.html | grep -c "啊呜噜啵"   # >0 即可
```

然后**用手机（iPad 最好）打开**：

1. 封面能显示 → 说明字体子集内联成功 ✓
2. 点封面能进第二页、**能听见声音** → 说明音频在 https 下能解锁 ✓
3. 拖动/滑动能翻页 ✓

> 手机上**必须用 http(s) 打开**，别用 `file://`——`file://` 下音频与字体会被浏览器限制。

## 常见坑

| 症状 | 原因 |
|---|---|
| 手机上没声音 | 用了 `file://`；或浏览器要求用户手势（点一下页面即可解锁） |
| PDF 变成强制下载 | 服务器没给 `.pdf` 设 `Content-Type: application/pdf` |
| 改了版但页面还是旧的 | `index.html` 被缓存了 → 配置里给它 `no-cache` |
| 点了没反应 | 页面脚本报错 → 浏览器控制台看 console |
