const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new stage
router.post('/', async (req, res) => {
    const { title } = req.body;
    try {
      const stage = await prisma.stage.create({ data: { title } });
      res.json(stage);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Fetch all stages with cards
  router.get('/', async (req, res) => {
    try {
      const stages = await prisma.stage.findMany({ include: { cards: true } });
      res.json(stages);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Update a stage title
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
      const updatedStage = await prisma.stage.update({
        where: { id: parseInt(id) },
        data: { title },
      });
      res.json(updatedStage);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Delete a stage and its cards
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Optionally, delete cards associated with the stage first
      await prisma.card.deleteMany({ where: { stageId: parseInt(id) } });
      await prisma.stage.delete({ where: { id: parseInt(id) } });
      res.send('Stage deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  module.exports = router;