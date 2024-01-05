# Stage 1: Build Ionic Angular App
FROM node:14 AS build
WORKDIR /usr/src/app
COPY ./CeleSmart/package*.json ./
RUN npm install
COPY ./CeleSmart ./
RUN npm run build

# Stage 2: Serve Ionic Angular App using Nginx
FROM nginx:alpine
COPY --from=build /usr/src/app/CeleSmart/www /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
