FROM jnexus.tsb.kz:8443/node:16-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm config set registry https://jnexus.tsb.kz/repository/npm-proxy/
RUN npm set strict-ssl false
RUN npm ci
COPY ./ /app/
RUN npm run build:staging

FROM jnexus.tsb.kz:8443/nginx:alpine
COPY nginx/nginx.conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
