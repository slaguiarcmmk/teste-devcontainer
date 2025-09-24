db = db.getSiblingDB('apiAuth');

db.createCollection('credentials');
db.credentials.createIndex({ username: 1 }, { unique: true });
