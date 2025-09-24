import sql from 'mssql';
import config from './config.js';

let pool;

export async function getConnection() {
  if (!pool) {
    pool = await sql.connect({
      user: config.sql.user,
      password: config.sql.password,
      server: config.sql.server,
      database: config.sql.database,
      options: config.sql.options,
      pool: config.sql.pool
    });
  }
  return pool;
}

export async function query(commandText, inputParameters = {}) {
  const connection = await getConnection();
  const request = connection.request();

  Object.entries(inputParameters).forEach(([name, value]) => {
    request.input(name, value);
  });

  const result = await request.query(commandText);
  return result.recordset;
}

export async function closeConnection() {
  if (pool) {
    await pool.close();
    pool = undefined;
  }
}
