const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Create a Product
app.post('/products', async (req, res) => {
  const { name, category, description, Maintenance } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        description,
        Maintenance: new Date(Maintenance),
      },
    });
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Failed to create product" });
  }
});

// Read Products
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: "Failed to get products" });
  }
});

// Update a Product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, description, Maintenance } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        category,
        description,
        Maintenance: new Date(Maintenance),
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Failed to update product" });
  }
});

// Delete a Product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(400).json({ error: "Failed to delete product" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
