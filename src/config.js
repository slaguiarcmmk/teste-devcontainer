import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  sql: {
    server: process.env.DB_HOST || 'sqlserver',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'YourStrong@Passw0rd',
    database: process.env.DB_NAME || 'ClientesDb',
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
    pool: {
      max: parseInt(process.env.DB_POOL_MAX ?? '10', 10),
      min: parseInt(process.env.DB_POOL_MIN ?? '0', 10),
      idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE ?? '30000', 10)
    }
  }
};

export default config;
