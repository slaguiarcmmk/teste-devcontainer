FROM node:20-alpine
RUN apk add --no-cache bash

WORKDIR /workspace

COPY package*.json ./
RUN npm install

COPY src ./src
COPY .env.example ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
