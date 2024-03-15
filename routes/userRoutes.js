const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a user
router.post('/', async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { email, password, firstName, lastName, role },
    });
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: "Failed to create user", details: error.message });
  }
});

// Read all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: "Failed to get users" });
  }
});

// Read a specific user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password, firstName, lastName, role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { email, password, firstName, lastName, role },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete user" });
  }
});

module.exports = router;