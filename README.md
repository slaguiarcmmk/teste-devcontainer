# Workspace Docker in Docker para Coder

Este template entrega um ambiente básico para workspaces Coder utilizando a estratégia Docker in Docker. O objetivo é fornecer um devcontainer pronto para uso com Docker, Node.js 22 e os serviços de banco de dados solicitados sem cargas de dados ou aplicações pré-configuradas.

## Componentes

- **Devcontainer** baseado em Ubuntu 22.04 com Docker Engine, plugin compose e Node.js 22 instalados.
- **SQL Server 2019 Developer** executando em container, sem dados pré-carregados.
- **MongoDB 6.0** executando em container, também sem dados iniciais.

## Pré-requisitos

- Um workspace Coder configurado para utilizar o template Docker in Docker.
- Docker com suporte a containers privilegiados para que o daemon interno seja executado corretamente.

## Utilização

1. Abra o repositório no Coder e permita que o Visual Studio Code (ou code-server) construa o devcontainer definido em `.devcontainer/`.
2. Dentro do terminal do devcontainer inicialize os bancos de dados conforme necessário:

   ```bash
   docker compose up -d
   ```

   Este comando provisiona o SQL Server e o MongoDB vazios, prontos para receber dados.

3. Ajuste as credenciais conforme necessário editando `docker-compose.yml` antes de subir os serviços.
4. Para encerrar o ambiente:

   ```bash
   docker compose down
   ```

   Os volumes nomeados `sqlserver-data` e `mongodb-data` preservam os dados gerados durante o uso.

## Portas expostas

| Serviço   | Porta |
|-----------|-------|
| SQL Server | 1433 |
| MongoDB    | 27017 |

## Próximos passos sugeridos

- Criar aplicações Node.js dentro do próprio devcontainer utilizando o runtime pré-instalado.
- Configurar scripts de seed ou migrações conforme os requisitos da sua aplicação.
- Adicionar outras ferramentas de desenvolvimento necessárias ao seu fluxo de trabalho.
