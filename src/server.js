const express = require('express');
const config = require('./config');
const clientsRouter = require('./routes/clients');
const basicAuth = require('./middleware/basicAuth');
const { ensureDefaultCredential } = require('./services/credentialService');
const { closePool } = require('./db/sqlClient');
const { closeClient } = require('./db/mongoClient');

async function createApp() {
  await ensureDefaultCredential();

  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/clients', basicAuth, clientsRouter);

  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Unexpected error', detail: err.message });
  });

  return app;
}

async function start() {
  const app = await createApp();
  const server = app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on port ${config.port}`);
  });

  const shutdown = async () => {
    // eslint-disable-next-line no-console
    console.log('Shutting down gracefully...');
    server.close(async () => {
      await closePool();
      await closeClient();
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
