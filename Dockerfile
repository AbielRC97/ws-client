# Usa una imagen de Node para el build
FROM node:18 AS builder

WORKDIR /app

# Copia los archivos package.json y package-lock.json primero para aprovechar la caché de Docker
COPY package.json package-lock.json ./

# Elimina node_modules y package-lock.json para garantizar una instalación limpia
RUN rm -rf node_modules package-lock.json

# Instala las dependencias, usando --legacy-peer-deps para evitar problemas con dependencias opcionales
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos del proyecto
COPY . ./

# Ejecuta la construcción de la aplicación
RUN npm run build

# Usa una imagen ligera para producción
FROM node:18-slim AS production

WORKDIR /app

# Copia los archivos construidos desde el builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/package-lock.json ./

# Instala solo las dependencias de producción
RUN npm install --production --legacy-peer-deps

# Expone el puerto y ejecuta la aplicación de producción
EXPOSE 5000
CMD ["npm", "run", "start"]
