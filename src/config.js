const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.ENV_FILE || '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile), override: true });

const mongoDatabase = process.env.MONGO_DATABASE || 'apiAuth';
const mongoAuthSource = process.env.MONGO_AUTH_SOURCE || 'admin';
const mongoUser = process.env.MONGO_USER || 'root';
const mongoPassword = process.env.MONGO_PASSWORD || 'example';
const mongoHost = process.env.MONGO_HOST || 'mongodb';
const mongoPort = process.env.MONGO_PORT || 27017;

const config = {
  port: Number(process.env.PORT || 3000),
  sql: {
    user: process.env.SQL_USER || 'sa',
    password: process.env.SQL_PASSWORD || 'YourStrong!Passw0rd',
    server: process.env.SQL_SERVER || 'sqlserver',
    database: process.env.SQL_DATABASE || 'ClientCatalog',
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
    pool: {
      max: Number(process.env.SQL_MAX_POOL || 10),
      min: Number(process.env.SQL_MIN_POOL || 0),
      idleTimeoutMillis: Number(process.env.SQL_IDLE_TIMEOUT || 30000)
    }
  },
  mongo: {
    uri:
      process.env.MONGO_URI ||
      `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=${mongoAuthSource}`,
    database: mongoDatabase,
    collection: process.env.MONGO_COLLECTION || 'credentials',
    defaultUsername: process.env.MONGO_DEFAULT_USERNAME || 'demo',
    defaultPassword: process.env.MONGO_DEFAULT_PASSWORD || 'demo123'
  }
};

module.exports = config;
