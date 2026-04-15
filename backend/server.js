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

const allowedOrigins = new Set([
  "https://www.bluewaveconsultation.com",
  "https://bluewaveconsultation.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// ✅ IMPORTANT (fix preflight requests for Express 5)
app.options(/.*/, cors(corsOptions));

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
