# Ambiente Docker in Docker para Coder

Este projeto provê um template completo de workspace Docker in Docker para uso no [Coder](https://coder.com/) com suporte a devcontainers. O ambiente entrega uma API Node.js 22 capaz de consumir simultaneamente SQL Server 2019 (Developer) e MongoDB 6, além de expor documentação via Swagger.

## Componentes

- **Devcontainer** configurado com Docker-in-Docker e Node.js 22 para uso no Visual Studio Code ou `code-server`.
- **SQL Server 2019 Developer** com base `CoderClients`, tabela `Clients` e dados de exemplo.
- **MongoDB 6** com base `coder` e usuário `apiuser` para autenticação da API.
- **API Node.js 22** com autenticação básica e documentação Swagger disponível em `/docs`.

## Requisitos de recursos

Os limites de recursos são aplicados via `docker-compose.yml`:

| Serviço    | Memória | CPU |
|------------|---------|-----|
| SQL Server | 2 GB    | 1   |
| MongoDB    | 1 GB    | 0,5 |
| API        | 1 GB    | 1   |

> Observação: os limites são respeitados quando suportados pelo runtime Docker local.

## Como usar

1. Abra o repositório no Coder selecionando o template Docker-in-Docker e garantindo o suporte a devcontainer.
2. Ao inicializar o workspace, o VS Code irá montar o devcontainer definido em `.devcontainer/devcontainer.json`.
3. Dentro do container de desenvolvimento execute:

   ```bash
   docker compose up --build
   ```

   Este comando iniciará o SQL Server, MongoDB e a API.

4. Aguarde os logs indicarem que a API está pronta e acesse:

   - `http://localhost:3000/docs` para visualizar a documentação Swagger.
   - `http://localhost:3000/api/clients` usando autenticação básica `apiuser` / `apipassword123`.

## Estrutura de pastas

```
.devcontainer/      # Configuração do ambiente de desenvolvimento Docker-in-Docker
api/                # Código fonte da API Node.js 22
mongo/init/         # Scripts de inicialização do MongoDB
sql/init/           # Scripts de inicialização do SQL Server
```

## Variáveis de ambiente

As principais variáveis estão definidas em `docker-compose.yml`. Ajuste conforme necessário:

- `SQL_PASSWORD` / `MSSQL_SA_PASSWORD`: senha do usuário `sa`.
- `MONGO_URI`: string de conexão utilizada pela API.
- `AUTH_COLLECTION`: coleção MongoDB com usuários de autenticação.

## Encerramento

Para encerrar os serviços:

```bash
docker compose down
```

Isso removerá os containers criados, preservando scripts e código fonte.
