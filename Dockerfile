FROM --platform=${BUILDPLATFORM} node:20-alpine3.19 AS build-stage

ARG BUILD_PREFIX=/docs

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
RUN npm run build -- --output ./build${BUILD_PREFIX}
RUN npm run build:fix -- ./build${BUILD_PREFIX} --root-index-html
RUN npm run build:api -- ./build${BUILD_PREFIX}

FROM nginx:stable-alpine3.19 AS runtime-stage

RUN rm -rf /etc/nginx/conf.d && \
  rm -rf /docker-entrypoint.d && \
  rm -rf /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/docker-entrypoint.sh /docker-entrypoint.sh
COPY --from=build-stage /opt/app/build /usr/share/nginx/html

ENTRYPOINT [ "/docker-entrypoint.sh" ]