const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Link a foodItem with a Supplier
router.post('/', async (req, res) => {
  const { itemId, supplierId, price, orderHistory } = req.body;
  try {
    const newItemSupplier = await prisma.itemSupplier.create({
      data: { itemId, supplierId, price, orderHistory },
    });
    res.json(newItemSupplier);
  } catch (error) {
    console.error("Error creating itemSupplier relationship:", error);
    res.status(400).json({ error: "Failed to create itemSupplier relationship", details: error.message });
  }
});

// Get all ItemSuppliers
router.get('/', async (req, res) => {
  try {
    const itemSuppliers = await prisma.itemSupplier.findMany();
    res.json(itemSuppliers);
  } catch (error) {
    res.status(400).json({ error: "Failed to get itemSupplier relationships" });
  }
});

// Update an ItemSupplier relationship
router.put('/:itemId/:supplierId', async (req, res) => {
  const { itemId, supplierId } = req.params;
  const { price, orderHistory } = req.body;
  try {
    const updatedItemSupplier = await prisma.itemSupplier.update({
      where: {
        itemId_supplierId: { itemId: Number(itemId), supplierId: Number(supplierId) },
      },
      data: { price, orderHistory },
    });
    res.json(updatedItemSupplier);
  } catch (error) {
    res.status(400).json({ error: "Failed to update itemSupplier relationship" });
  }
});

// Delete an ItemSupplier relationship
router.delete('/:itemId/:supplierId', async (req, res) => {
  const { itemId, supplierId } = req.params;
  try {
    await prisma.itemSupplier.delete({
      where: {
        itemId_supplierId: { itemId: Number(itemId), supplierId: Number(supplierId) },
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete itemSupplier relationship" });
  }
});
router.get('/byItem/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try {
    const itemSuppliers = await prisma.itemSupplier.findMany({
      where: {
        itemId: parseInt(itemId),
      },
      include: {
        Supplier: true, // This tells Prisma to also fetch the related Supplier data
      },
    });
    res.json(itemSuppliers);
  } catch (error) {
    console.error("Error fetching item suppliers:", error);
    res.status(400).json({ error: "Failed to fetch item suppliers", details: error.message });
  }
});
module.exports = router;
