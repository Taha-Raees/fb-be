// Assuming you have a separate file or a section within the same file
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new card in a stage
router.post('/', async (req, res) => {
  const { content, stageId } = req.body;
  try {
    const card = await prisma.card.create({
      data: {
        content,
        stageId,
      },
    });
    res.json(card);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a card's content
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content, stageId } = req.body; // Include stageId in the destructuring
  
    try {
      // Update the card with both new content and new stageId
      const updatedCard = await prisma.card.update({
        where: { id: parseInt(id) },
        data: {
          content,
          stageId: stageId ? parseInt(stageId) : undefined, // Ensure stageId is included only if provided
        },
      });
      res.json(updatedCard);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

// Move a card to another stage
router.put('/move/:id', async (req, res) => {
  const { id } = req.params;
  const { stageId } = req.body; // New stage ID
  try {
    const movedCard = await prisma.card.update({
      where: { id: parseInt(id) },
      data: { stageId },
    });
    res.json(movedCard);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a card
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.card.delete({ where: { id: parseInt(id) } });
    res.send('Card deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;