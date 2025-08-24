// backend/routes/dashboardRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const router = express.Router();

// =======================
// Dashboard routes
// =======================
router.get("/", protect, getDashboardData);

// Export as default for ES Module
export default router;
