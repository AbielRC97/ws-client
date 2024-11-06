# Usa una imagen de Node para el build
FROM node:18 AS builder

WORKDIR /app

# Copia los archivos necesarios
COPY . ./

# Elimina node_modules y package-lock.json antes de instalar las dependencias
RUN rm -rf node_modules package-lock.json

# Instala las dependencias (sin dependencias opcionales)
RUN npm install --force

# Compila la aplicación
RUN npm run build

# Usa una imagen ligera para producción
FROM node:18-slim AS production

WORKDIR /app

# Copia solo los archivos necesarios para la producción
COPY --from=builder /app ./

# Instala solo las dependencias de producción (sin dependencias opcionales)
RUN npm install --force

# Expone el puerto y ejecuta la aplicación
EXPOSE 3000
CMD ["npm", "run", "dev"]
