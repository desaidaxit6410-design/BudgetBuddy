const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    let token= req.headers.authorization?.split(" ")[1];
    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    // Check if token is valid
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};