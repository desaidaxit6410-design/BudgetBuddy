import 'dotenv/config';  // dotenv auto config
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';


const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware to handle cors
app.use(cors({
  origin:process.env.CLIENT_URL || "*",
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  allowedHeaders:["Content-Type", "Authorization"] ,

}));

// Middleware to parse JSON requests
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'dist')));

// This handles all other routes and serves index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));






