const express = require('express');
const cors = require('cors');
const foodTruckRoutes = require('./routes/foodTruck');
const foodItemRoutes = require('./routes/foodItem');
const inventoryRoutes = require('./routes/inventory');
const clockRouter  = require('./routes/clock');
const userRoutes = require('./routes/userRoutes');
const itemSupplierRoutes = require('./routes/itemSupplier');
const supplierRoutes = require('./routes/supplier');
const eventRoutes = require('./routes/events');
const eventPosOrdersRouter = require('./routes/eventPosOrders'); 

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
app.use('/supplier', supplierRoutes);
app.use('/itemSupplier', itemSupplierRoutes);
app.use('/events', eventRoutes);
app.use('/eventPosOrders', eventPosOrdersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); 
});

