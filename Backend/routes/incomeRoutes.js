const express = require('express');
const router = express.Router();

const { getAllIncome, addIncome, downloadIncomeExcel, deleteIncome } = require('../controllers/incomeController');
const {protect} = require('../middleware/authMiddleware');

// Define routes for income management
// Ensure that all routes are protected by the auth middleware
router.get('/get',protect, getAllIncome);
router.post('/add', protect, addIncome);
router.get('/downloadexcel',protect, downloadIncomeExcel);
router.delete('/:id',protect, deleteIncome);

module.exports = router;