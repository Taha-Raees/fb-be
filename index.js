const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
const cors = require('cors');
app.use(cors());
// Create a Product
app.post('/products', async (req, res) => {
    console.log(req.body); // Log the request body

    const { name, category, description ,maintenance} = req.body;
    try {
        if (name === undefined || category === undefined || description === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
          }
      const newProduct = await prisma.product.create({
        data: {
          name,
          category,
          description,
          maintenance,
        },
      });
      res.json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(400).json({ error: "Failed to create product", details: error.message });
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
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: "Failed to get products" });
  }
});
app.get('/products/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
  
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: Number(id), // Ensure the ID is a number if it's stored as a numeric value in the database
        },
      });
  
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get product" });
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
