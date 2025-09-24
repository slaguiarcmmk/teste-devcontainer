const { getAuthCollection } = require('./db/mongoClient');

async function verifyBasicAuth(header) {
  if (!header || !header.startsWith('Basic ')) {
    return null;
  }

  const base64Credentials = header.slice('Basic '.length).trim();
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  if (!username || !password) {
    return null;
  }

  const collection = await getAuthCollection();
  const user = await collection.findOne({ username });
  if (!user) {
    return null;
  }

  if (user.password === password) {
    return user;
  }

  return null;
}

async function authMiddleware(req, res, next) {
  try {
    const user = await verifyBasicAuth(req.headers.authorization);
    if (!user) {
      res.set('WWW-Authenticate', 'Basic realm="Clients API"');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error('Erro na autenticação', error);
    return res.status(500).json({ message: 'Erro interno de autenticação' });
  }
}

module.exports = {
  authMiddleware,
  verifyBasicAuth
};
