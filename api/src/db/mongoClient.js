const { MongoClient } = require('mongodb');
const config = require('../config');

let cachedClient;

async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(config.mongo.uri, {
    monitorCommands: false
  });
  await client.connect();
  cachedClient = client;
  return cachedClient;
}

async function getAuthCollection() {
  const client = await getMongoClient();
  return client.db(config.mongo.db).collection(config.mongo.authCollection);
}

module.exports = {
  getMongoClient,
  getAuthCollection
};
