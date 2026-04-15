const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./db/db');
const consultRoute = require('./routes/consultRoute');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS (FINAL WORKING VERSION)
app.use(cors({
  origin: [
    "https://www.bluewaveconsultation.com",
    "https://bluewaveconsultation.com",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ IMPORTANT (fix preflight requests for Express 5)
app.options(/.*/, cors());

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api', consultRoute);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('✅ Consultancy API Running...');
});

// ✅ Error handling (optional but good)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: err.message });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
