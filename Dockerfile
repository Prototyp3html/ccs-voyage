FROM node:24-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build && npm run vercel:html

FROM nginx:stable-alpine AS runtime

LABEL org.opencontainers.image.source="https://github.com/Prototyp3html/ccs-voyage"

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/client /usr/share/nginx/html

EXPOSE 80
