// routes/eventPosOrders.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Fetch eventPosOrders
router.get('/', async (req, res) => {
  try {
    const eventPosOrders = await prisma.eventPosOrders.findMany();
    res.json(eventPosOrders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch eventPosOrders", details: error.message });
  }
});

// Create or update eventPosOrders
router.post('/', async (req, res) => {
  const { ordersData } = req.body;

  try {
    const existingRecord = await prisma.eventPosOrders.findFirst();

    let eventPosOrder;
    if (existingRecord) {
      eventPosOrder = await prisma.eventPosOrders.update({
        where: { id: existingRecord.id },
        data: { ordersData }
      });
    } else {
      eventPosOrder = await prisma.eventPosOrders.create({
        data: { ordersData }
      });
    }

    res.json(eventPosOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to save eventPosOrders", details: error.message });
  }
});

module.exports = router;
