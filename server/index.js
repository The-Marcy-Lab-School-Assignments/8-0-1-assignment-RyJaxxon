const express = require('express');
const path = require('path');
const app = express();

// Middleware to log requests
const logRoutes = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next(); // Passes the request to the next middleware/controller
};

app.use(logRoutes);

// Serve static files from the 'front-end/dist' folder
app.use(express.static(path.join(__dirname, '../front-end/dist')));

// Fallback route to serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/dist', 'index.html')); // Corrected to match the path
});

// Set the port number
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
