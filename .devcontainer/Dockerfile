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

WORKDIR /workspace

COPY api/package*.json ./api/
COPY web/package*.json ./web/

RUN cd api && npm install
RUN cd web && npm install

COPY . .

EXPOSE 3000 5173
CMD ["node", "api/src/index.js"]
