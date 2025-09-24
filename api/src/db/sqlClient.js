const sql = require('mssql');
const config = require('../config');

let pool;

async function getSqlPool() {
  if (pool) {
    return pool;
  }

  pool = await sql.connect({
    server: config.sql.server,
    user: config.sql.user,
    password: config.sql.password,
    database: config.sql.database,
    options: {
      encrypt: config.sql.encrypt,
      trustServerCertificate: config.sql.options.trustServerCertificate
    }
  });

  return pool;
}

async function getClients() {
  const connection = await getSqlPool();
  const result = await connection.request().query('SELECT Id, Name, Email, CreatedAt FROM dbo.Clients ORDER BY Id');
  return result.recordset;
}

module.exports = {
  getSqlPool,
  getClients
};
