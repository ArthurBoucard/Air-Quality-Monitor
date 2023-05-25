const express = require('express');
const os = require('os');
const measurementsRoutes = require('./routes/measurementsRoutes');

const app = express();

// Middleware to parse request body
app.use(express.json());

// Define your routes
app.use('/measurements', measurementsRoutes);

// Determine the IP address dynamically
const interfaces = os.networkInterfaces();
const addresses = [];
for (const key in interfaces) {
    for (const interface of interfaces[key]) {
        if (interface.family === 'IPv4' && !interface.internal) {
            addresses.push(interface.address);
        }
    }
}

// Start the server
const port = 3000; // Set your desired port number
app.listen(port, () => {
    addresses.forEach((address) => {
        console.log(`Server is running on http://${address}:${port}`);
    });
});
