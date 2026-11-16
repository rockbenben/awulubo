# 从与 CI 相同的 Node 主版本构建四个离线入口。
FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm run site

FROM nginx:1.27-alpine
COPY --from=build /app/dist-site /srv/awulubo
COPY deploy/nginx-docker.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
