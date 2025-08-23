const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { getDashboardData } = require("../controllers/dashboardController");

// Define routes for income management
// Ensure that all routes are protected by the auth middleware
router.get('/',protect, getDashboardData);

module.exports = router;