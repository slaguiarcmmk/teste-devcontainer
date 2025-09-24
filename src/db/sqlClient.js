const sql = require('mssql');
const config = require('../config');

let poolPromise;

async function getPool() {
  if (!poolPromise) {
    const connectionConfig = {
      user: config.sql.user,
      password: config.sql.password,
      server: config.sql.server,
      database: config.sql.database,
      options: config.sql.options,
      pool: config.sql.pool
    };

    poolPromise = sql.connect(connectionConfig).catch((error) => {
      poolPromise = undefined;
      throw error;
    });
  }

  return poolPromise;
}

async function getClients() {
  const pool = await getPool();
  const result = await pool
    .request()
    .query('SELECT Id, Name, Email, Document FROM dbo.Clients ORDER BY Name ASC');

  return result.recordset;
}

async function closePool() {
  if (poolPromise) {
    const pool = await poolPromise;
    await pool.close();
    poolPromise = undefined;
  }
}

module.exports = {
  getClients,
  closePool
};
