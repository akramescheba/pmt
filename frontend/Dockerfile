
FROM node:18-alpine AS build


WORKDIR /app


COPY *.json ./


COPY . .

RUN npm install -g @angular/cli

RUN npm install


RUN npm run build --prod 


FROM nginx:stable


COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/pmt/ /usr/share/nginx/html/


EXPOSE 80

ENTRYPOINT  ["nginx", "-g", "daemon off;"]
