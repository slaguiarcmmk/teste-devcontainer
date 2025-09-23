# Node.js + SQL Server + MongoDB Dev Container Template

Este repositório entrega um template completo para desenvolvimento de uma API REST em Node.js
utilizando SQL Server como base relacional e MongoDB para armazenamento das credenciais de acesso.
Todo o ambiente é orquestrado via Docker Compose e pronto para uso em Dev Containers.

## Estrutura

- **Node.js API** (`api`): aplicação Express com endpoint `GET /clients` que retorna os clientes
  cadastrados no SQL Server. O acesso é protegido com autenticação básica cujas credenciais ficam no MongoDB.
- **SQL Server** (`sqlserver`): banco com licença Developer, provisionado com um banco `ClientCatalog`
  e uma tabela `Clients` populada com dados de exemplo.
- **MongoDB** (`mongodb`): armazena credenciais e possui índice único para os usuários de API.
- **Dev Container** (`.devcontainer/devcontainer.json`): conecta-se ao serviço `api` e provisiona as dependências.

## Pré-requisitos

- Docker e Docker Compose.
- (Opcional) Visual Studio Code com a extensão "Dev Containers" para trabalhar dentro do ambiente remoto.

## Como usar

1. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis caso necessário.

   ```bash
   cp .env.example .env
   ```

2. Suba o ambiente completo com Docker Compose:

   ```bash
   docker compose up --build
   ```

   A primeira execução fará o download das imagens, criará a tabela `Clients` e inserirá um usuário padrão (`demo` / `demo123`) no MongoDB.

3. Após os containers estarem em execução, consulte a API:

   ```bash
   curl -u demo:demo123 http://localhost:3000/clients
   ```

   O retorno será um JSON com os clientes cadastrados.

4. Para encerrar os serviços:

   ```bash
   docker compose down
   ```

## Utilizando Dev Containers

1. Abra o projeto no VS Code.
2. Pressione `F1` e escolha **Dev Containers: Reopen in Container**.
3. O VS Code utilizará o `docker-compose.yml`, subindo automaticamente `sqlserver`, `mongodb` e `api`.
4. Dentro do container, os scripts `npm run dev` (hot reload via nodemon) e `npm start` estão disponíveis.

## Scripts npm

- `npm run dev`: executa a API com `nodemon` para recarregamento automático.
- `npm start`: executa a API em modo padrão.

## Notas importantes

- O SQL Server utiliza a imagem oficial `mcr.microsoft.com/mssql/server:2022-latest` com licença Developer.
- A senha padrão do `sa` está definida em `.env.example` e deve cumprir os requisitos de complexidade do SQL Server.
- O MongoDB cria automaticamente um índice único para `username` em `mongo-init/init.js`.
- O serviço de API gera a credencial padrão no MongoDB na primeira execução, caso ela não exista.

## Estrutura de pastas

```
.
├── .devcontainer/
│   └── devcontainer.json
├── docker-compose.yml
├── Dockerfile
├── src/
│   ├── config.js
│   ├── server.js
│   ├── routes/
│   │   └── clients.js
│   ├── db/
│   │   ├── mongoClient.js
│   │   └── sqlClient.js
│   └── services/
│       └── credentialService.js
├── sql/
│   ├── entrypoint.sh
│   └── init.sql
├── mongo-init/
│   └── init.js
├── .env.example
├── .gitignore
└── README.md
```

Sinta-se à vontade para expandir o template adicionando testes, pipelines de CI/CD ou novas rotas na API.
