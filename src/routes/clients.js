import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const clients = await query(`
      SELECT ClientId, Name, Email, Phone, CreatedAt
      FROM dbo.Clientes
      ORDER BY Name;
    `);

    res.json(clients);
  } catch (error) {
    next(error);
  }
});

export default router;
