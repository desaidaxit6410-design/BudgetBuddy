require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes"); 
const expenseRoutes = require("./routes/expenseRoutes");
const  dashboardRoutes = require("./routes/dashboardRoutes");


const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware to handle cors
app.use(cors({
  origin:"https://myspend-expense-tracker-front.onrender.com",
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  allowedHeaders:["Content-Type", "Authorization"] ,

}));

// Middleware to parse JSON requests
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", require("./routes/dashboardRoutes"));

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// This handles all other routes and serves index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



