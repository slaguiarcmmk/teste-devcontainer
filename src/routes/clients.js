const express = require('express');
const { getClients } = require('../db/sqlClient');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const clients = await getClients();
    res.json({ data: clients });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
