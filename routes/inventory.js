const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a inventory
router.post('/', async (req, res) => {
  const { name, description,quantity  } = req.body;
  try {
    if (!name || !description || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newinventory = await prisma.inventory.create({
      data: { name, description, quantity },
    });
    res.json(newinventory);
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(400).json({ error: "Failed to create inventory", details: error.message });
  }
});

// Read all inventorys
router.get('/', async (req, res) => {
  try {
    const inventorys = await prisma.inventory.findMany();
    res.json(inventorys);
  } catch (error) {
    res.status(400).json({ error: "Failed to get inventorys" });
  }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
  
    try {
      const inventory = await prisma.inventory.findUnique({
        where: {
          id: Number(id), // Ensure the ID is a number if it's stored as a numeric value in the database
        },
      });
  
      if (inventory) {
        res.json(inventory);
      } else {
        res.status(404).json({ error: "inventory not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get inventory" });
    }
  });

// Update a inventory
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;
  try {
    const updatedinventory = await prisma.inventory.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        quantity,
      },
    });
    res.json(updatedinventory);
  } catch (error) {
    res.status(400).json({ error: "Failed to update inventory" });
  }
});

// Delete a inventory
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.inventory.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(400).json({ error: "Failed to delete inventory" });
  }
});



module.exports = router;
