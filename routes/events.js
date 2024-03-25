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

// Add a food truck to an event
router.post('/events/:eventId/foodTrucks/:foodTruckId', async (req, res) => {
    const { eventId, foodTruckId } = req.params;
    try {
      const event = await prisma.event.update({
        where: { id: parseInt(eventId) },
        data: {
          foodTrucks: {
            connect: { id: parseInt(foodTruckId) },
          },
        },
      });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Failed to add food truck to event", details: error.message });
    }
  });
  
  // Remove a food truck from an event
router.delete('/events/:eventId/foodTrucks/:foodTruckId', async (req, res) => {
    const { eventId, foodTruckId } = req.params;
    try {
      const event = await prisma.event.update({
        where: { id: parseInt(eventId) },
        data: {
          foodTrucks: {
            disconnect: { id: parseInt(foodTruckId) },
          },
        },
      });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Failed to remove food truck from event", details: error.message });
    }
  });

  // Add a food item to an event
router.post('/events/:eventId/foodItems/:foodItemId', async (req, res) => {
    const { eventId, foodItemId } = req.params;
    try {
      const event = await prisma.event.update({
        where: { id: parseInt(eventId) },
        data: {
          foodItems: {
            connect: { id: parseInt(foodItemId) },
          },
        },
      });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Failed to add food item to event", details: error.message });
    }
  });

  // Remove a food item from an event
router.delete('/events/:eventId/foodItems/:foodItemId', async (req, res) => {
    const { eventId, foodItemId } = req.params;
    try {
      const event = await prisma.event.update({
        where: { id: parseInt(eventId) },
        data: {
          foodItems: {
            disconnect: { id: parseInt(foodItemId) },
          },
        },
      });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Failed to remove food item from event", details: error.message });
    }
  });
  
  // Add equipment to an event
router.post('/events/:eventId/equipment/:inventoryId', async (req, res) => {
    const { eventId, inventoryId } = req.params;
    try {
      const event = await prisma.event.update({
        where: { id: parseInt(eventId) },
        data: {
          equipments: {
            connect: { id: parseInt(inventoryId) },
          },
        },
      });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Failed to add equipment to event", details: error.message });
    }
  });
  
  // Remove equipment from an event
router.delete('/events/:eventId/equipment/:inventoryId', async (req, res) => {
    const { eventId, inventoryId } = req.params;
    try {
      const event = await prisma.event.update({
        where: { id: parseInt(eventId) },
        data: {
          equipments: {
            disconnect: { id: parseInt(inventoryId) },
          },
        },
      });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Failed to remove equipment from event", details: error.message });
    }
  });
  
module.exports = router;
