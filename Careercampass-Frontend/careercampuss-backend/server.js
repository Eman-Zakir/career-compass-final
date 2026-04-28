require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { apiLimiter } = require('./middlewares/securityMiddleware');

const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/internshipRoutes');

// --- INITIALIZE APP HERE ---
const app = express(); 

// Security Middlewares
app.use(helmet());

// Apply global rate limiting
app.use(apiLimiter);

// CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Mount routes (Now that app exists, these work!)
app.use('/api/internships', internshipRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.DB_URI || "mongodb://127.0.0.1:27017/career_compass_db")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// Basic Route
app.get("/", (req, res) => {
    res.send("✅ Career Compass Backend is running!");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});