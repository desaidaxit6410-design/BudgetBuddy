const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configure storage with multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pictures", // folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}`, // unique filename
  },
});

// ✅ Multer upload middleware
const upload = multer({ storage });

module.exports = upload;
// File: Backend/controllers/authController.js
// --- a/file:///c%3A/Users/shiva/OneDrive/Desktop/My-
