

FROM node:18-alpine AS build


WORKDIR /app

COPY angular.json package-lock.json package.json tsconfig.app.json tsconfig.spec.json tsconfig.json ./

RUN npm install

RUN npm install @angular/cli

COPY . .

RUN npm run build --configuration=production 


FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist/pmt/ ./

COPY nginx.conf /etc/nginx/nginx.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
