const express = require('express');
const cors = require('cors');
const foodTruckRoutes = require('./routes/foodTruck');
const foodItemRoutes = require('./routes/foodItem');
const inventoryRoutes = require('./routes/inventory');
const clockRouter  = require('./routes/clock');
const userRoutes = require('./routes/userRoutes');
const stageRoutes = require('./routes/stages');
const cardRoutes = require('./routes/cards');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Use food truck, food item, and inventory routes with a base path
app.use('/foodtrucks', foodTruckRoutes);
app.use('/foodItems', foodItemRoutes);
app.use('/inventorys', inventoryRoutes);
app.use('/clock', clockRouter);
app.use('/users', userRoutes);
app.use('/stages', stageRoutes);
app.use('/cards', cardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); 
});

