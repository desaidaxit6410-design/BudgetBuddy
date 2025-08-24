// backend/routes/incomeRoutes.js
import express from "express";
import { getAllIncome, addIncome, downloadIncomeExcel, deleteIncome } from "../controllers/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// =======================
// Income routes
// =======================
router.get("/get", protect, getAllIncome);
router.post("/add", protect, addIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

// Export as default for ES Module
export default router;
