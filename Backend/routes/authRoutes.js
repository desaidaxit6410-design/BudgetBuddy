// backend/routes/authRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerUser, loginUser, getUserInfo } from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// =======================
// Auth routes
// =======================
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// =======================
// Image upload
// =======================
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  // You can save imageUrl to DB here if needed
  res.status(200).json({ message: "File uploaded successfully", imageUrl });
});

// Export as default for ES Module
export default router;
