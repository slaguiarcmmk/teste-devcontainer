const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config');
const { authMiddleware } = require('./auth');
const { getClients } = require('./db/sqlClient');
const { getMongoClient } = require('./db/mongoClient');

const app = express();
app.use(express.json());

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Clients API',
    version: '1.0.0',
    description: 'API para consulta de clientes integrando SQL Server e MongoDB com autenticação básica.'
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
      description: 'Ambiente local'
    }
  ],
  components: {
    securitySchemes: {
      basicAuth: {
        type: 'http',
        scheme: 'basic'
      }
    }
  },
  security: [
    {
      basicAuth: []
    }
  ]
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: []
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', async (_req, res) => {
  try {
    await Promise.all([
      getMongoClient().then(client => client.db(config.mongo.db).command({ ping: 1 })),
      getClients()
    ]);
    return res.json({ status: 'ok' });
  } catch (error) {
    console.error('Erro no healthcheck', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/api/clients', authMiddleware, async (_req, res) => {
  try {
    const clients = await getClients();
    return res.json(clients);
  } catch (error) {
    console.error('Erro ao consultar clientes', error);
    return res.status(500).json({ message: 'Erro ao consultar clientes' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.listen(config.port, () => {
  console.log(`Servidor executando na porta ${config.port}`);
});
