require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  sql: {
    server: process.env.SQL_SERVER || 'sqlserver',
    database: process.env.SQL_DATABASE || 'CoderClients',
    user: process.env.SQL_USER || 'sa',
    password: process.env.SQL_PASSWORD || 'StrongPassword!123',
    encrypt: process.env.SQL_ENCRYPT === 'true',
    options: {
      trustServerCertificate: process.env.SQL_TRUST_CERT === 'true'
    }
  },
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://root:rootpassword@mongo:27017',
    db: process.env.MONGO_DB || 'coder',
    authCollection: process.env.AUTH_COLLECTION || 'users'
  }
};

module.exports = config;
