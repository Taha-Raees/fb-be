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

// Create a new event with automatic POS system creation
router.post('/', async (req, res) => {
  const { title, location, startDate, endDate, numOfPos } = req.body;
  try {
    const event = await prisma.event.create({
      data: {
        title, 
        location, 
        startDate, 
        endDate,
        numOfPos: parseInt(numOfPos) || null  // Change noOfPos to numOfPos
      },
      include: { posSystems: true },
    });

    if (numOfPos > 0) {  // This should be numOfPos, and you already handle the parse above
      for (let i = 0; i < numOfPos; i++) {
        await prisma.posSystem.create({
          data: { eventId: event.id }
        });
      }
    }

    const createdEvent = await prisma.event.findUnique({
      where: { id: event.id },
      include: { posSystems: true }
    });

    res.json(createdEvent);
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
// Fetch all events with related data
router.get('/', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        posSystems: true, // Assuming Event-PosSystem relation is defined in Prisma schema
        numOfPos: true, // Assuming Event-PosSystem relation is defined in Prisma schema
        // Include other relations here if necessary
      }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events", details: error.message });
  }
});

// Fetch a single event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        posSystems: true, // Includes POS systems related to the event
      },
    });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event", details: error.message });
  }
});
// routes/posSystems.js (new or extend existing file)

// Example of a route to fetch POS systems for a specific event
router.get('/event/:eventId/posSystems', async (req, res) => {
  const { eventId } = req.params;
  try {
    const posSystems = await prisma.posSystem.findMany({
      where: { eventId: parseInt(eventId) }
    });
    res.json(posSystems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch POS systems", details: error.message });
  }
});
router.get('/event/:eventId/posSystem/:posSystemId/orders', async (req, res) => {
  const { eventId, posSystemId } = req.params;
  try {
      const orders = await prisma.order.findMany({
          where: {
              posSystemId: parseInt(posSystemId),
              posSystem: {
                  eventId: parseInt(eventId)
              }
          },
          include: {
              posSystem: true // Optionally include details about the POS system
          }
      });
      res.json(orders);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders", details: error.message });
  }
});

// POST - Create a new order for a specific POS system within a specific event
router.post('/event/:eventId/posSystem/:posSystemId/orders', async (req, res) => {
    const { eventId, posSystemId } = req.params;
    const {id, items, totalPrice, received, change, timestamp } = req.body;

    try {
        // First, validate the existence of the POS system within the specified event
        const posSystem = await prisma.posSystem.findFirst({
            where: {
                id: parseInt(posSystemId),
                eventId: parseInt(eventId)
            }
        });

        if (!posSystem) {
            return res.status(404).json({ error: "Specified POS system not found within the event" });
        }

        // Create a new order linked to the POS system
        const newOrder = await prisma.order.create({
            data: {
                id,
                posSystemId: parseInt(posSystemId),
                items: items,
                totalPrice: parseFloat(totalPrice),
                received: parseFloat(received),
                change: parseFloat(change),
                timestamp: new Date(timestamp)
            }
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order", details: error.message });
    }
});



module.exports = router;