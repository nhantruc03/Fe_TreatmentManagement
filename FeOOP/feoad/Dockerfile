# FROM node:15.2.0-alpine

# WORKDIR /usr/src/app/feoad

# COPY package*.json ./

# run npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm","start"]

FROM node:15.2.0-alpine as build

ARG PORT

WORKDIR /app

COPY package*.json ./

run npm install

COPY . .

run npm run build

FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'