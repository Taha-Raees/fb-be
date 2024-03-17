const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a Supplier
router.post('/', async (req, res) => {
  const { name, contact } = req.body;
  try {
    const newSupplier = await prisma.supplier.create({
      data: { name, contact },
    });
    res.json(newSupplier);
  } catch (error) {
    console.error("Error creating supplier:", error);
    res.status(400).json({ error: "Failed to create supplier", details: error.message });
  }
});

// Read all Suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.json(suppliers);
  } catch (error) {
    res.status(400).json({ error: "Failed to get suppliers" });
  }
});

// Update a Supplier
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, contact } = req.body;
  try {
    const updatedSupplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data: { name, contact },
    });
    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ error: "Failed to update supplier" });
  }
});

// Delete a Supplier
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.supplier.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete supplier" });
  }
});

module.exports = router;
