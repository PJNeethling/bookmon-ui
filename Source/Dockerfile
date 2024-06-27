#stage 1
FROM node:latest as node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/bookmon-ui /usr/share/nginx/html
