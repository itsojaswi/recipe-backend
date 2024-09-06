const express = require("express");
const {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  updateProfile,
  getUserProfile,
} = require("../controllers/userControllers");

const authentication = require("../middleware/auth");
const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get all users
router.get("/", authentication, getAllUsers);

// update user profile
router.patch("/:id/profile", authentication, updateProfile);

// get user
// router.get("/:id", authentication, getUser);

// delete user
router.delete("/:id", authentication, deleteUser);

// get user profile
router.get("/:id", authentication, getUserProfile);

module.exports = router;
