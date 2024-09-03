const express = require("express");
const {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
} = require("../controllers/userControllers");

const authentication = require("../middleware/auth");
const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get all users
router.get("/", authentication, getAllUsers);

// get user
router.get("/me", authentication, getUser);

// delete user
router.delete("/:id", authentication, deleteUser);

module.exports = router;
