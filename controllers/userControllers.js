const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Controller function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({
      userId: user._id,
      email,
      username: user.username,
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to handle user signup
const signupUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.signup(username, email, password, role);
    const token = createToken(user._id);

    res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a specific user
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a user
const deleteUser = async (req, res) => {
  const adminUser = await User.findById(req.user._id);
  if (!adminUser.isAuthorized("admin")) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  const userId = req.params._id; // Obtained from auth middleware

  const { username, email, password, bio, avatar } = req.body;

  try {
    // Validate username
    if (
      username &&
      !validator.isAlphanumeric(username, "en-US", { ignore: " _" })
    ) {
      return res.status(400).json({
        error:
          "Invalid username. Username can only contain letters, numbers, and underscores.",
      });
    }
    if (username && (username.length < 3 || username.length > 30)) {
      return res
        .status(400)
        .json({ error: "Username must be between 3 and 30 characters long." });
    }

    // Validate email
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email." });
    }

    // Validate password
    if (password && !validator.isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password is not strong enough. It must contain uppercase, lowercase, numbers, and special characters.",
      });
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ error: "Email already in use." });
      }
      user.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (bio) user.profile.bio = bio;
    if (avatar) user.profile.avatar = avatar;

    // Save the updated user
    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateProfile };

const getUserProfile = async (req, res) => {
  const userId = req.params.id; // Obtained from auth middleware

  try {
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getAllUsers,
  deleteUser,
  getUser,
  updateProfile,
  getUserProfile,
};
