const express = require('express');
const cors = require('cors');
const foodTruckRoutes = require('./routes/foodTruck');
const foodItemRoutes = require('./routes/foodItem');
const inventoryRoutes = require('./routes/inventory');
const axios = require('axios'); // Import Axios

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Use food truck, food item, and inventory routes with a base path
app.use('/foodtrucks', foodTruckRoutes);
app.use('/foodItems', foodItemRoutes);
app.use('/inventorys', inventoryRoutes);

// Lightweight endpoint for self-ping
app.get('/ping', (req, res) => {
  res.status(200).send('Pong');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // Start the self-ping mechanism after the server is up
  startSelfPing();
});

// Self-ping function
function startSelfPing() {
  const selfPingUrl = `http://localhost:${PORT}/ping`; // Use your deployed URL in production

  const ping = () => {
    console.log(`Pinging ${selfPingUrl}`);
    axios.get(selfPingUrl)
      .then(response => console.log(`Ping successful: ${response.statusText}`))
      .catch(error => console.error(`Ping failed: ${error.message}`));
  };

  // Ping every 30 minutes. Adjust the interval as needed.
  setInterval(ping, 0.1 * 60 * 1000);
}
