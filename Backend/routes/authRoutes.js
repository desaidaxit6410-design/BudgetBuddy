const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

// ✅ Register with profile image (Cloudinary handled inside controller)
router.post("/register", upload.single("profile"), registerUser);

// ✅ Login route
router.post("/login", loginUser);

// ✅ Protected route (get logged-in user info)
router.get("/getUser", protect, getUserInfo);

// ❌ Removed local /upload-image (no need for Render)
module.exports = router;
// Removed local /upload-image (no need for Render)
