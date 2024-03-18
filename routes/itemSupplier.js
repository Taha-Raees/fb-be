const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Link a foodItem with a Supplier

router.post('/', async (req, res) => {
  const { itemId, supplierId, price, quantity, addedAt = new Date() } = req.body;
  try {
    const newItemSupplier = await prisma.itemSupplier.create({
      data: { itemId, supplierId, price },
    });
    // Assuming newItemSupplier includes the unique ID or use the itemId and supplierId to create order history
    await prisma.orderHistory.create({
      data: { 
        itemSupplierId: newItemSupplier.id, // or use { itemId, supplierId } if your logic supports it
        quantity, 
        addedAt 
      },
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

// Update your get itemSuppliers route to include order histories
router.get('/byItem/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try {
    const itemSuppliers = await prisma.itemSupplier.findMany({
      where: { itemId: parseInt(itemId) },
      include: {
        Supplier: true,
        orderHistories: true, // Include order histories
      },
    });
    res.json(itemSuppliers);
  } catch (error) {
    console.error("Error fetching item suppliers with order history:", error);
    res.status(400).json({ error: "Failed to fetch item suppliers with order history", details: error.message });
  }
});

router.post('/', async (req, res) => {
  const { itemId, supplierId, price, quantity, addedAt = new Date() } = req.body;
  try {
    const newItemSupplier = await prisma.itemSupplier.create({
      data: { itemId, supplierId, price },
    });
    // Assuming newItemSupplier includes the unique ID or use the itemId and supplierId to create order history
    await prisma.orderHistory.create({
      data: { 
        itemSupplierId: newItemSupplier.id, // or use { itemId, supplierId } if your logic supports it
        quantity, 
        addedAt 
      },
    });
    res.json(newItemSupplier);
  } catch (error) {
    console.error("Error creating itemSupplier relationship:", error);
    res.status(400).json({ error: "Failed to create itemSupplier relationship", details: error.message });
  }
});

// Endpoint to add to an order history for an itemSupplier
router.post('/orderHistory', async (req, res) => {
  const { itemSupplierId, quantity, addedAt = new Date() } = req.body;
  try {
    const newOrderHistory = await prisma.orderHistory.create({
      data: { 
        itemSupplierId,
        quantity, 
        addedAt 
      },
    });
    res.json(newOrderHistory);
  } catch (error) {
    console.error("Error adding to order history:", error);
    res.status(400).json({ error: "Failed to add to order history", details: error.message });
  }
});


module.exports = router;
