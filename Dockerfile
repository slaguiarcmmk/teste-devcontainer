FROM mcr.microsoft.com/devcontainers/javascript-node:20
RUN apt-get update \
    && apt-get install -y --no-install-recommends bash \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY package*.json ./
RUN npm install

COPY src ./src
COPY .env.example ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
