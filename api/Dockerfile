FROM node:22-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        bash \
        curl \
        git \
        iputils-ping \
        nano \
        netcat-openbsd \
        procps \
        vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]
