const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware function for authentication
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if authorization header exists and starts with "Bearer "
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authentication token is required" });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(" ")[1];

  // console.log(authHeader);

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find the user based on the decoded user ID and exclude the password field
    req.user = await User.findById(decoded._id).select("-password");
    // console.log(req.user);

    // If user is not found, return 401 Unauthorized
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    // If token is invalid, return 401 Unauthorized
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
