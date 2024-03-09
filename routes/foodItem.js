const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a foodItem
router.post('/', async (req, res) => {
  const { name, category, expiry } = req.body;
  try {
    if (!name || !category || !expiry) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newfoodItem = await prisma.foodItem.create({
      data: { name, category, expiry },
    });
    res.json(newfoodItem);
  } catch (error) {
    console.error("Error creating foodItem:", error);
    res.status(400).json({ error: "Failed to create foodItem", details: error.message });
  }
});

// Read all foodItems
router.get('/', async (req, res) => {
  try {
    const foodItems = await prisma.foodItem.findMany();
    res.json(foodItems);
  } catch (error) {
    res.status(400).json({ error: "Failed to get foodItems" });
  }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
  
    try {
      const foodItem = await prisma.foodItem.findUnique({
        where: {
          id: Number(id), // Ensure the ID is a number if it's stored as a numeric value in the database
        },
      });
  
      if (foodItem) {
        res.json(foodItem);
      } else {
        res.status(404).json({ error: "foodItem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get foodItem" });
    }
  });

// Update a foodItem
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, expiry } = req.body;
  try {
    const updatedfoodItem = await prisma.foodItem.update({
      where: { id: Number(id) },
      data: {
        name,
        category,
        expiry,
      },
    });
    res.json(updatedfoodItem);
  } catch (error) {
    res.status(400).json({ error: "Failed to update foodItem" });
  }
});

// Delete a foodItem
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.foodItem.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(400).json({ error: "Failed to delete foodItem" });
  }
});



module.exports = router;
