const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaced body-parser with express.json()

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Example routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

// 404 handling
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Error handling for uncaught exceptions and rejected promises
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); // Exit the process to ensure the app doesn't continue in an invalid state
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});