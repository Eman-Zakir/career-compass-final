const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS fix - Frontend ko allow karo
app.use(cors({
    origin: "http://localhost:5173",   // Vite ka default port
    credentials: true
}));

// --- 1. CONNECT TO MONGODB ---
mongoose.connect("mongodb://127.0.0.1:27017/career_compass_db")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// --- 2. BASIC ROUTE (Test ke liye) ---
app.get("/", (req, res) => {
    res.send("✅ Career Compass Backend is running successfully on port 5000!");
});

// A. SIGNUP (Register)
app.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = await UserModel.create({ fullName, email, password });
        res.json({ status: "ok", message: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// B. LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            if (user.password === password) {
                res.json({ status: "ok", message: "Login successful", user: user });
            } else {
                res.status(400).json({ message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- 3. SERVER START (Port 5000) ---
app.listen(5000, () => {
    console.log("🚀 Server is running on port 5000");
});