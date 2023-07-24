FROM node:18.14.1

WORKDIR ./app

COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]