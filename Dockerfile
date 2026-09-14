# Stage 1: build the Angular app ("AS build" names the stage so stage 2 can copy from it)
FROM node:20-alpine AS build
WORKDIR /app

# install dependencies 
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# Stage 2: serve the built files with nginx (webserver)
FROM nginx:alpine

# copy only the build output from stage 1
COPY --from=build /app/dist/to-do-app/browser /usr/share/nginx/html
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Cloud Run expects the container to listen on 8080
ENV PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]