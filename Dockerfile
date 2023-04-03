# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./

EXPOSE 80

ENTRYPOINT ["node", "fallen"]
