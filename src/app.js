import express from 'express';
import clientsRouter from './routes/clients.js';
import { configureSwagger } from './swagger.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/clients', clientsRouter);

configureSwagger(app);

app.use((err, req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  res.status(status).json({ message });
});

export default app;
