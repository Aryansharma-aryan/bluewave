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

const envOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([
  "https://bluewaveconsultation.com",
  "https://www.bluewaveconsultation.com",
  "https://caialsnew.vercel.app",
  "https://www.caials.in",
  "https://caials.in",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...envOrigins,
]);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin)) return callback(null, true);
    console.log("Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use('/api', consultRoute);

app.get('/', (req, res) => res.send('Consultancy API Running...'));

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
