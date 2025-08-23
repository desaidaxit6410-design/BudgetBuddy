const express = require('express');
const router = express.Router();

const { getAllExpense, addExpense, downloadExpenseExcel, deleteExpense } = require('../controllers/expenseController');
const {protect} = require('../middleware/authMiddleware');

// Define routes for income management
// Ensure that all routes are protected by the auth middleware
router.get('/get',protect, getAllExpense);
router.post('/add', protect, addExpense);
router.get('/downloadexcel',protect, downloadExpenseExcel);
router.delete('/:id',protect, deleteExpense);

module.exports = router;