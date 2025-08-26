const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUserInfo,updateUserProfile } = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

// ✅ Register with profile image
router.post("/register", upload.single("profile"), registerUser);

// ✅ Login route
router.post("/login", loginUser);

// ✅ Protected route (get logged-in user info)
router.get("/getUser", protect, getUserInfo);

// ✅ Update user profile (image + details + password)
router.put("/update-profile", protect, upload.single("profile"), updateUserProfile);

module.exports = router;
