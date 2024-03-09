const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a food truck
router.post('/', async (req, res) => {
  const { name, category, description } = req.body;
  try {
    if (!name || !category || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newFoodTruck = await prisma.foodtruck.create({
      data: { name, category, description },
    });
    res.json(newFoodTruck);
  } catch (error) {
    console.error("Error creating food truck:", error);
    res.status(400).json({ error: "Failed to create food truck", details: error.message });
  }
});

// Read all food trucks
router.get('/', async (req, res) => {
  try {
    const foodTrucks = await prisma.foodtruck.findMany();
    res.json(foodTrucks);
  } catch (error) {
    res.status(400).json({ error: "Failed to get food trucks" });
  }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
  
    try {
      const foodtruck = await prisma.foodtruck.findUnique({
        where: {
          id: Number(id), // Ensure the ID is a number if it's stored as a numeric value in the database
        },
      });
  
      if (foodtruck) {
        res.json(foodtruck);
      } else {
        res.status(404).json({ error: "foodtruck not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get foodtruck" });
    }
  });

// Update a foodtruck
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;
  try {
    const updatedfoodtruck = await prisma.foodtruck.update({
      where: { id: Number(id) },
      data: {
        name,
        category,
        description,
      },
    });
    res.json(updatedfoodtruck);
  } catch (error) {
    res.status(400).json({ error: "Failed to update foodtruck" });
  }
});

// Delete a foodtruck
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.foodtruck.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(400).json({ error: "Failed to delete foodtruck" });
  }
});



module.exports = router;
