const crypto = require('crypto');
const config = require('../config');
const { getCredentialsCollection } = require('../db/mongoClient');

const KEY_LENGTH = 64;

function hashSecret(secret, salt = crypto.randomBytes(16).toString('hex')) {
  const derivedKey = crypto.scryptSync(secret, salt, KEY_LENGTH).toString('hex');
  return `${salt}:${derivedKey}`;
}

function verifySecret(secret, storedHash) {
  if (!storedHash) {
    return false;
  }

  const [salt, key] = storedHash.split(':');
  if (!salt || !key) {
    return false;
  }

  const derivedKey = crypto.scryptSync(secret, salt, KEY_LENGTH);
  const storedKey = Buffer.from(key, 'hex');

  if (storedKey.length !== derivedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedKey, derivedKey);
}

async function ensureDefaultCredential() {
  const collection = await getCredentialsCollection();
  const username = config.mongo.defaultUsername;

  if (!username) {
    return;
  }

  const existing = await collection.findOne({ username });
  const now = new Date();

  if (!existing) {
    const secretHash = hashSecret(config.mongo.defaultPassword);
    await collection.insertOne({
      username,
      secretHash,
      createdAt: now,
      updatedAt: now
    });
    return;
  }

  if (
    config.mongo.defaultPassword &&
    !verifySecret(config.mongo.defaultPassword, existing.secretHash)
  ) {
    const secretHash = hashSecret(config.mongo.defaultPassword);
    await collection.updateOne(
      { _id: existing._id },
      {
        $set: {
          secretHash,
          updatedAt: now
        }
      }
    );
  }
}

async function validateCredential(username, password) {
  const collection = await getCredentialsCollection();
  const credential = await collection.findOne({ username });

  if (!credential) {
    return false;
  }

  return verifySecret(password, credential.secretHash);
}

module.exports = {
  ensureDefaultCredential,
  validateCredential
};
