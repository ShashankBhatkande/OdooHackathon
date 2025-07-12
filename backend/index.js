const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/testProtected'); // ✅ Protected route
const itemRoutes = require('./routes/itemRoutes');

// ✅ Logger for auth
app.use('/api/auth', (req, res, next) => {
  console.log("Received request to /api/auth");
  next();
}, authRoutes);

// ✅ Mount protected routes
app.use('/api', protectedRoutes);

app.use('/api', itemRoutes);

// Test route
app.get('/', (req, res) => res.send('ReWear Backend is running!'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("Available routes loaded");
