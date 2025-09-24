const { MongoClient } = require('mongodb');
const config = require('../config');

let clientPromise;

async function getClient() {
  if (!clientPromise) {
    clientPromise = MongoClient.connect(config.mongo.uri, {
      appName: 'sqlserver-mongo-api-template'
    }).catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }

  return clientPromise;
}

async function getCredentialsCollection() {
  const client = await getClient();
  return client.db(config.mongo.database).collection(config.mongo.collection);
}

async function closeClient() {
  if (clientPromise) {
    const client = await clientPromise;
    await client.close();
    clientPromise = undefined;
  }
}

module.exports = {
  getCredentialsCollection,
  closeClient
};
