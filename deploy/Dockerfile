# 《啊呜噜啵！》—— 只留 nginx + 静态文件的镜像
# 构建：docker build -f deploy/Dockerfile -t awulubo .
# 运行：docker run -d -p 8080:80 awulubo
#
# 注意：字体子集是**提交进仓库**的（src/fonts/*.woff2），
# 所以这个镜像不需要 Python/fontTools。
# 但印刷 PDF 必须由真的浏览器渲染，所以构建阶段要装 Playwright 的 Chromium
# （用 debian 而不是 alpine：musl 上 Playwright 的 Chromium 装不稳）。

FROM node:22-bookworm-slim AS build
WORKDIR /app

# 先只拷依赖清单，装完再拷源码——改代码不会让 npm ci 缓存失效
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# 印刷 PDF 要 Chromium：装在构建阶段，最终镜像里不留它
RUN npx playwright install --with-deps chromium

# 构建产物 + 三个 PDF（单页、A4 拼版、A3 拼版）
RUN npm run build \
    && npm run pdf \
    && npm run pdf:booklet \
    && node tools/pdf-booklet.mjs --a3

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY deploy/nginx-docker.conf /etc/nginx/conf.d/default.conf

# 容器里只有静态文件
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
