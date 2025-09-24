import app from './app.js';
import config from './config.js';
import { getConnection, closeConnection } from './db.js';

const port = config.port;

async function start() {
  try {
    await getConnection();
    app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    process.exit(1);
  }
}

async function shutdown() {
  console.log('Encerrando aplicação...');
  await closeConnection();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
