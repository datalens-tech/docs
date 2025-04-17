FROM --platform=${BUILDPLATFORM} node:20-alpine3.19 AS build-stage

RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /opt/app

COPY package.json package-lock.json .npmrc /opt/app/
RUN npm ci

COPY . .

RUN npm run build:prepare
RUN npm run build
RUN npm run build:fix
RUN npm run build:api

FROM nginx:stable-alpine3.19 AS runtime-stage

RUN rm -rf /etc/nginx/conf.d
RUN rm -rf /docker-entrypoint.d

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/docker-entrypoint.sh /docker-entrypoint.sh
COPY ./assets/index.html /usr/share/nginx/html/index.html
COPY --from=build-stage /opt/app/build/docs /usr/share/nginx/html/docs

ENTRYPOINT [ "/docker-entrypoint.sh" ]