FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

# Install Docker engine and compose so the workspace can run Docker-in-Docker
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        docker.io \
        docker-compose-plugin \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
