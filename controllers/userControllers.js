const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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

    res
      .status(200)
      .json({ email, username: user.username, token, role: user.role });
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
    const adminUser = await User.findById(req.user._id);
    if (!adminUser.isAuthorized("admin")) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a specific user
const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

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

module.exports = { loginUser, signupUser, getAllUsers, deleteUser, getUser };
