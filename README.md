# API de Clientes com Node.js 22 e SQL Server 2022

Este projeto recria do zero uma aplicação com:

- **SQL Server 2022 Developer** executando em Linux;
- **Node.js 22** com Express para expor uma API REST;
- **Swagger UI** disponível para documentação e testes da API.

A API permite consultar os clientes cadastrados no banco SQL Server através do endpoint `GET /clients`.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Como executar

1. Clone este repositório e, no diretório raiz, execute:

   ```bash
   docker compose up --build
   ```

   O comando cria três serviços:

   - `sqlserver`: SQL Server 2022 Developer Edition em Linux;
   - `db-init`: container auxiliar que aplica o script `sql/init.sql` para criar a base `ClientesDb`, a tabela `Clientes` e dados de exemplo;
   - `api`: aplicação Node.js 22 que expõe a API.

2. Aguarde até que os logs indiquem que a API está ouvindo na porta 3000 (`Servidor iniciado na porta 3000`).

3. Acesse os recursos disponíveis:

   - **API**: `http://localhost:3000/clients`
   - **Documentação Swagger**: `http://localhost:3000/docs`
   - **Health check**: `http://localhost:3000/health`

4. Para encerrar, pressione `Ctrl+C` e execute `docker compose down` para remover os containers.

## Configuração

As variáveis de ambiente relevantes já estão definidas no `docker-compose.yml`. Caso precise alterar a senha ou o nome do banco, ajuste os campos `DB_PASSWORD` e `DB_NAME` nos serviços `api` e `db-init`, além de `MSSQL_SA_PASSWORD` no serviço `sqlserver`.

A aplicação lê as variáveis abaixo:

| Variável         | Descrição                                            | Valor padrão              |
|------------------|------------------------------------------------------|---------------------------|
| `PORT`           | Porta HTTP da API                                    | `3000`                    |
| `DB_HOST`        | Hostname do SQL Server                               | `sqlserver`               |
| `DB_USER`        | Usuário do SQL Server                                | `sa`                      |
| `DB_PASSWORD`    | Senha do SQL Server                                  | `YourStrong@Passw0rd`     |
| `DB_NAME`        | Banco de dados utilizado pela aplicação              | `ClientesDb`              |

## Estrutura do projeto

```
.
├── Dockerfile               # Imagem Node.js 22 da API
├── docker-compose.yml       # Orquestração da API, SQL Server e carga inicial
├── README.md
├── sql
│   ├── init.sql             # Cria banco/tabela e insere dados iniciais
│   └── init-db.sh           # Script executado pelo container db-init
├── src
│   ├── app.js               # Configuração do Express e rotas principais
│   ├── config.js            # Carrega variáveis de ambiente
│   ├── db.js                # Conexão e consultas ao SQL Server
│   ├── routes
│   │   └── clients.js       # Endpoint GET /clients
│   └── server.js            # Bootstrap da aplicação
└── swagger
    └── swagger.yaml         # Definição OpenAPI da API
```

## Consultando clientes

Após iniciar os serviços, faça uma requisição HTTP para obter todos os clientes:

```bash
curl http://localhost:3000/clients
```

Resposta de exemplo:

```json
[
  {
    "ClientId": 1,
    "Name": "Maria Silva",
    "Email": "maria.silva@example.com",
    "Phone": "+55 11 98888-1111",
    "CreatedAt": "2024-01-01T12:00:00.000Z"
  }
]
```

A documentação completa com a especificação OpenAPI está acessível em `/docs`.
