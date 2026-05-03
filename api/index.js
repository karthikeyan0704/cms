


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- THIS IS THE FIX ---
// Increase the limit for the JSON body parser. '50mb' is a generous limit.
app.use(express.json({ limit: '50mb' }));

// Enable CORS for all origins
app.use(cors());

// Define Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/complaints', require('../routes/complaintRoutes'));
app.use('/api/stats', require('../routes/statsRoutes'));

// Root route for health check
app.get('/', (req, res) => {
  res.json({ 
    message: "CMS Backend API is running successfully!",
    status: "Healthy",
    version: "1.0.0"
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
