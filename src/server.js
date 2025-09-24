const express = require('express');
const swaggerUi = require('swagger-ui-express');
const config = require('./config');
const clientsRouter = require('./routes/clients');
const { closePool } = require('./db/sqlClient');
const swaggerDocument = require('./docs/swagger');

function createApp() {
  const app = express();
  app.use(express.json());

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/docs.json', (req, res) => {
    res.json(swaggerDocument);
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/clients', clientsRouter);

  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Unexpected error', detail: err.message });
  });

  return app;
}

async function start() {
  const app = createApp();
  const server = app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on port ${config.port}`);
  });

  const shutdown = async () => {
    // eslint-disable-next-line no-console
    console.log('Shutting down gracefully...');
    server.close(async () => {
      await closePool();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

if (require.main === module) {
  start().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', error);
    process.exit(1);
  });
}

module.exports = { createApp };
