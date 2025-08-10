require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const verifyOtpRoutes = require('./routes/verifyOtp');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API routes
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/verify-otp', verifyOtpRoutes);

// Static file serving for uploads
app.use('/uploads', express.static(require('path').join(__dirname, '../uploads')));

// Error handler
app.use(errorHandler);

module.exports = app;