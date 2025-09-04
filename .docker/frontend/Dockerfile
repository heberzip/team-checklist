FROM node:20-alpine

# Evita problemas con inotify
ENV CHOKIDAR_USEPOLLING=true

WORKDIR /app

# Instala dependencias (cachea por package.json)
COPY frontend/package*.json ./
RUN npm ci

# El código se montará por volumen en runtime
EXPOSE 4200
