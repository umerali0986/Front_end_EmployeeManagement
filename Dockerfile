FROM node:20.14.0 AS web-build
WORKDIR /usr/src/app
COPY ./ ./front-end-employee-management
RUN cd front-end-employee-management && npm install && npm run build --prod

FROM nginx:latest

COPY --from=web-build /usr/src/app/front-end-employee-management/dist/front-end-employee-management/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
