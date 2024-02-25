This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Correr en Dev

1. Clonar el repositorio
2. Instalar dependencias ``` npm install```
3. Crear una copia del archivo ```.env.template``` a ```.env``` y configurar las variables de entorno
4. Levantar la base de datos ``` docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar script seed ```npm run seed```
7. Correr el proyecto ``` npm run dev```
