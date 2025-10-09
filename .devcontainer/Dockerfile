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

WORKDIR /api

COPY api/package*.json ./
RUN npm install --production

COPY api ./

EXPOSE 3000
CMD ["node", "src/index.js"]
