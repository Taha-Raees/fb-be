const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const messageRouter = express.Router();

// Send a message
messageRouter.post('/', async (req, res) => {
  const { senderId, recipientId, content } = req.body;
  try {
    const message = await prisma.message.create({
      data: { senderId, recipientId, content },
    });
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: "Failed to send message", details: error.message });
  }
});

// Get messages between two users
messageRouter.get('/:userId1/:userId2', async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: Number(userId1), recipientId: Number(userId2) },
          { senderId: Number(userId2), recipientId: Number(userId1) },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: "Failed to get messages", details: error.message });
  }
});

// Delete a message
messageRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.message.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete message", details: error.message });
  }
});

module.exports = messageRouter;
