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

# set port variable to 8080, variable is used for nginx template (must match deploy.yaml)
ENV PORT=8080
EXPOSE 8080

# start nginx in the foreground (otherwise the container will exit)
CMD ["nginx", "-g", "daemon off;"]