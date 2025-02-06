# Etapa 1: Construcción de la aplicación Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:alpine
COPY --from=build /app/dist/cobrosaguafasay /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
