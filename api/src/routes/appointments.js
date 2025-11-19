const express = require('express');
const router = express.Router();
const { getAppointmentsCollection } = require('../db/mongoClient');
const { authMiddleware } = require('../auth');

// Listar agendamentos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const collection = await getAppointmentsCollection();
    const appointments = await collection.find({}).sort({ date: 1 }).toArray();
    res.json(appointments);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ message: 'Erro interno ao listar agendamentos' });
  }
});

// Criar agendamento
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Título e data são obrigatórios' });
    }

    const collection = await getAppointmentsCollection();
    const newAppointment = {
      title,
      date: new Date(date),
      description,
      createdBy: req.user.username,
      createdAt: new Date()
    };

    const result = await collection.insertOne(newAppointment);
    
    // Simulação de notificação
    console.log(`[NOTIFICAÇÃO] Novo agendamento criado: ${title} em ${date}`);

    res.status(201).json({ ...newAppointment, _id: result.insertedId });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ message: 'Erro interno ao criar agendamento' });
  }
});

module.exports = router;
