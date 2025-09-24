const config = require('../config');

const serverUrl = process.env.SWAGGER_SERVER_URL || `http://localhost:${config.port}`;

const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Client Catalog API',
    version: '1.0.0',
    description:
      'API REST simples em Node.js que lista clientes armazenados em um banco SQL Server.',
    contact: {
      name: 'Development Team'
    }
  },
  servers: [
    {
      url: serverUrl,
      description: 'Ambiente atual'
    }
  ],
  tags: [
    {
      name: 'Health',
      description: 'Monitoramento da API'
    },
    {
      name: 'Clients',
      description: 'Consulta de clientes cadastrados'
    }
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Verifica se a API está operacional',
        responses: {
          200: {
            description: 'API saudável',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/clients': {
      get: {
        tags: ['Clients'],
        summary: 'Lista todos os clientes',
        description: 'Retorna todos os clientes disponíveis no SQL Server.',
        responses: {
          200: {
            description: 'Consulta executada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Client'
                      }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Erro inesperado'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Client: {
        type: 'object',
        properties: {
          Id: {
            type: 'integer',
            example: 1
          },
          Name: {
            type: 'string',
            example: 'Alice Johnson'
          },
          Email: {
            type: 'string',
            format: 'email',
            example: 'alice.johnson@example.com'
          },
          Document: {
            type: 'string',
            example: '12345678901'
          }
        }
      }
    }
  }
};

module.exports = swaggerDocument;
