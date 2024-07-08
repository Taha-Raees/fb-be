const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST - Create a new order
router.post('/', async (req, res) => {
    const { id, posSystemId, items, totalPrice, received, change, timestamp } = req.body;
    try {
        const newOrder = await prisma.order.create({
            data: {
                id,
                posSystemId,
                items,
                totalPrice,
                received,
                change,
                timestamp: new Date(timestamp)
            }
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: "Failed to create order", details: error.message });
    }
});

// GET - Fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders", details: error.message });
    }
});

// GET - Fetch a single order by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await prisma.order.findUnique({
            where: { id }
        });
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order", details: error.message });
    }
});

// PUT - Update an existing order
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { items, totalPrice, received, change, timestamp } = req.body;
    try {
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                items,
                totalPrice,
                received,
                change,
                timestamp: new Date(timestamp)
            }
        });
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: "Failed to update order", details: error.message });
    }
});

// DELETE - Delete an order
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.order.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order", details: error.message });
    }
});

module.exports = router;