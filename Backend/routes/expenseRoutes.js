// backend/routes/expenseRoutes.js
import express from "express";
import { getAllExpense, addExpense, downloadExpenseExcel, deleteExpense } from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// =======================
// Expense routes
// =======================
router.get("/get", protect, getAllExpense);
router.post("/add", protect, addExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

// Export as default for ES Module
export default router;
