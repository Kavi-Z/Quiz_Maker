const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const serverless = require('serverless-http');

const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error', err));

// Middleware
app.use(cors({
  origin: 'https://quiz-maker-frontend-theta.vercel.app', // allow frontend
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

// Test route
app.get('/', (req, res) => res.send("Quiz backend running"));

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
