const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
const cors = require('cors');
app.use(cors());
// Create a foodtruck
app.post('/foodtrucks', async (req, res) => {
    console.log(req.body); // Log the request body
    const { name, category, description } = req.body;
    try {
        if (name === undefined || category === undefined || description === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
          }
      const newfoodtruck = await prisma.foodtruck.create({
        data: {
          name,
          category,
          description,
        },
      });
      res.json(newfoodtruck);
    } catch (error) {
      console.error("Error creating foodtruck:", error);
      res.status(400).json({ error: "Failed to create foodtruck", details: error.message });
    }
});

// Read foodtrucks
app.get('/foodtrucks', async (req, res) => {
  try {
    const foodtrucks = await prisma.foodtruck.findMany();
    res.json(foodtrucks);
  } catch (error) {
    res.status(400).json({ error: "Failed to get foodtrucks" });
  }
});
app.get('/foodtrucks/:id', async (req, res) => {
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
app.put('/foodtrucks/:id', async (req, res) => {
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
app.delete('/foodtrucks/:id', async (req, res) => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
