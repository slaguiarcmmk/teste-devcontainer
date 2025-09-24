db = db.getSiblingDB('coder');

if (!db.getCollectionNames().includes('users')) {
  db.createCollection('users');
}

db.users.updateOne(
  { username: 'apiuser' },
  {
    $setOnInsert: {
      username: 'apiuser',
      password: 'apipassword123',
      roles: ['api'],
      createdAt: new Date()
    }
  },
  { upsert: true }
);
