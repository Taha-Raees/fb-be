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
  const { title, location, startDate, endDate, noOfPos } = req.body;
  try {
    const event = await prisma.event.create({
      data: { title, location, startDate, endDate },
      include: { posSystems: true },
    });

    // If noOfPos is provided, create the specified number of POS systems
    if (noOfPos && noOfPos > 0) {
      for (let i = 0; i < noOfPos; i++) {
        await prisma.posSystem.create({
          data: { eventId: event.id }
        });
      }
    }

    // Fetch the newly created event with its POS systems to return in response
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

// Similar routes for creating, updating, and deleting POS systems

// Existing create, update, and delete routes remain unchanged

module.exports = router;