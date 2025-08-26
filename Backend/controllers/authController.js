const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔑 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

// 🟢 Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const profileImageUrl = req.file ? req.file.path : null; // Cloudinary URL

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    await user.save();

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

// 🟡 Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

// 🔵 Get Logged-In User Info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user info",
      error: error.message,
    });
  }
};

// 🟣 Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;

    // Update profile photo
    if (req.file) {
      user.profileImageUrl = req.file.path; // Cloudinary URL from multer-storage-cloudinary
    }

    // Update password if old + new provided
    if (oldPassword && newPassword) {
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
      if (newPassword.length < 8) {
        return res
          .status(400)
          .json({ message: "New password must be at least 8 characters long" });
      }
      user.password = newPassword; // Will be hashed by User model pre-save hook
    }

    const updatedUser = await user.save();

    // Return updated details with a fresh token
    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profileImageUrl: updatedUser.profileImageUrl,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
