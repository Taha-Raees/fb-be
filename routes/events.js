// routes/events.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events", details: error.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  const { title, location, startDate, endDate } = req.body;
  try {
    const event = await prisma.event.create({
      data: { title, location, startDate, endDate },
    });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: "Failed to create event", details: error.message });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, location, startDate, endDate } = req.body;
  try {
    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: { title, location, startDate, endDate },
    });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: "Failed to update event", details: error.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete event", details: error.message });
  }
});

module.exports = router;
