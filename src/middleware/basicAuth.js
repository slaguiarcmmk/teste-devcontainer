const { validateCredential } = require('../services/credentialService');

function unauthorized(res) {
  res.set('WWW-Authenticate', 'Basic realm="Client API"');
  return res.status(401).json({ message: 'Authentication required' });
}

function decodeCredentials(headerValue) {
  const base64Credentials = headerValue.split(' ')[1];
  if (!base64Credentials) {
    return null;
  }

  const decoded = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const separatorIndex = decoded.indexOf(':');

  if (separatorIndex === -1) {
    return null;
  }

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  return { username, password };
}

async function basicAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.toLowerCase().startsWith('basic ')) {
    return unauthorized(res);
  }

  const credentials = decodeCredentials(header);
  if (!credentials) {
    return unauthorized(res);
  }

  const isValid = await validateCredential(credentials.username, credentials.password);
  if (!isValid) {
    return unauthorized(res);
  }

  req.user = { username: credentials.username };
  return next();
}

module.exports = basicAuth;
