# 部署《啊呜噜啵！》

公开目录是 `dist-site/`，包含 `index.html`、`print.html`、`proof.html`、`booklet.html` 和 `edgeone.json`。四个入口都是离线单文件。印刷 PDF 位于 `dist-print/`，逐页截图位于 `dist/shots/`。

## EdgeOne Pages

将 Git 集成设为 `gh-pages` 分支、构建命令留空、输出目录选分支根目录。响应头取自产物里的 `edgeone.json`。

推送到 `main` 或从 Actions 手动运行 `main` 的 CI 后，`ci.yml` 构建一次，取出五个公开文件，再验收页面、字体、PDF、互动、截图、对比度和各项闸门。验收通过后，`deploy.yml` 下载同一次运行的产物并发布。PR 只进行验收。仓库需允许发布任务写入 `gh-pages`。

## 手动部署

在仓库根目录运行：

```sh
npm ci
npm run build
npm run site
npm run check:publish
```

`npm run site` 从本次构建复制清单内的文件。若发布目录里已有额外文件或子目录，命令会指出名称，移出后可重试。`check:publish` 同时核对 Git 远端、商业授权联系方式和社交预览图。旧版本遗留在 `dist/` 的印刷文件可继续在本机使用。

- **nginx**：将五个文件同步到这个站点专用的空目录。整站部署使用 `deploy/nginx-root.conf`，挂在已有站点的 `/book/` 下使用 `deploy/nginx-subpath.conf`。改好域名与根目录后，运行 `nginx -t` 验证配置，再重载服务。
- **Caddy**：将五个文件放到 `deploy/Caddyfile` 指向的站点目录，配置自己的域名后重载服务。
- **对象存储**：上传 `dist-site/` 的内容到公开站点专用目录，首页设为 `index.html`。
- **GitHub Pages**：在 Pages 设置里选 `gh-pages` 分支的根目录。CI 会更新该分支。

若需要从本机维护产物分支，可在准备并核对发布目录后运行 `node tools/push-gh-pages.mjs dist-site`。这条命令会替换本地 `gh-pages`，配置了 `origin` 时也会推送到该远端。

## Docker

```sh
docker compose -f deploy/docker-compose.yml up -d --build
```

浏览器打开服务器的 8080 端口。构建阶段使用 Node 24 生成公开目录，运行阶段由 nginx 提供这五个静态文件。

## 局域网预览

先完成 `npm run build` 和 `npm run site`。在 Linux 或 macOS 上运行 `bash deploy/serve.sh`，可附加端口号，默认 8080。Windows 上可运行：

```powershell
node tools/site-files.mjs --check
python -m http.server 8080 --directory dist-site
```

手机连到同一 Wi-Fi，用电脑的局域网地址和端口打开。上线后可打开 `index.html?book=labuluo#p30`，检查能否直达指定页，再切换到打印或拼版入口。
