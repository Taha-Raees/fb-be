// routes/clock.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * POST endpoint to update the clock timestamp.
 */
// In your clock update route (assuming Express)

router.post('/updateClock', async (req, res) => {
  const { clockId, timestamp } = req.body;

  try {
    const updatedClock = await prisma.clock.update({
      where: { id: clockId },
      data: { timestamp: new Date(timestamp) }, // Converts ISO string to Date
    });

    res.json(updatedClock);
  } catch (error) {
    console.error(`Failed to update clock: ${error.message}`);
    res.status(500).json({ error: "Failed to update clock", details: error.message });
  }
});
