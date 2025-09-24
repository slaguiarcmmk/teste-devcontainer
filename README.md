# Node.js + SQL Server Dev Container Template

Este repositório entrega um template completo para desenvolvimento de uma API REST em Node.js
utilizando SQL Server como banco de dados. Todo o ambiente é orquestrado via Docker Compose e
preparado para uso em Dev Containers, incluindo documentação interativa da API com Swagger UI.

## Componentes

- **Node.js API** (`api`): aplicação Express com endpoint `GET /clients` que lê os registros da
tabela `Clients` no SQL Server. A rota `/docs` disponibiliza a documentação OpenAPI/Swagger.
- **SQL Server** (`sqlserver`): banco com licença Developer, provisionado com o banco `ClientCatalog`
e a tabela `Clients` preenchida com dados de exemplo.
- **Dev Container** (`.devcontainer/devcontainer.json`): conecta-se ao serviço `api` e provisiona as
  dependências automaticamente.

## Pré-requisitos

- Docker e Docker Compose
- (Opcional) Visual Studio Code com a extensão **Dev Containers** para trabalhar dentro do ambiente
  remoto

## Como começar
=======

1. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis caso necessário.

   ```bash
   cp .env.example .env
   ```

2. Suba o ambiente completo com Docker Compose:

   ```bash
   docker compose up --build
   ```

   A primeira execução fará o download das imagens e criará a tabela `Clients` no SQL Server.

3. Após os containers estarem em execução, explore a API:

   - Consulte a lista de clientes:

     ```bash
     curl http://localhost:3000/clients
     ```

   - Abra a documentação Swagger UI em `http://localhost:3000/docs` ou consulte o documento JSON em
     `http://localhost:3000/docs.json`.

4. Para encerrar os serviços:

   ```bash
   docker compose down
   ```

## Utilizando Dev Containers

1. Abra o projeto no VS Code.

2. Pressione `F1` e selecione **Dev Containers: Reopen in Container**.
3. O VS Code utilizará o `docker-compose.yml`, subindo automaticamente `sqlserver` e `api`.
4. Dentro do container, os scripts `npm run dev` (hot reload via nodemon) e `npm start` estão disponíveis.

## Scripts npm

- `npm run dev`: executa a API com `nodemon` para recarregamento automático.
- `npm start`: executa a API em modo padrão.


## Banco de dados SQL Server

O script `sql/init.sql` cria a base `ClientCatalog`, a tabela `Clients` e insere três registros de
exemplo. Ajuste o script conforme necessário para o seu domínio.


## Estrutura de pastas



