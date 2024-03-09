const express = require('express');
const cors = require('cors');
const foodTruckRoutes = require('./routes/foodTruck');
const foodItemRoutes = require('./routes/foodItem');
const inventoryRoutes = require('./routes/inventory');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Use food truck routes with a base path
app.use('/foodtrucks', foodTruckRoutes);
app.use('/foodItems', foodItemRoutes);
app.use('/inventorys', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
