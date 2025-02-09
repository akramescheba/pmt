

FROM node:18-alpine AS build


WORKDIR /app


COPY *.json ./

COPY ./angular.json ./package-lock.json ./package.json ./tsconfig.app.json ./tsconfig.spec.json ./tsconfig.json /app/

RUN npm install -g @angular/cli

RUN npm install

COPY . .


RUN npm run build --prod 


FROM nginx:stable


COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/pmt/ /usr/share/nginx/html/


EXPOSE 80

ENTRYPOINT  ["nginx", "-g", "daemon off;"]
