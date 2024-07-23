const express = require('express')
const {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser
} = require('../controllers/userControllers')
const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// get all users
router.get('/users', getAllUsers)

// get user
router.get('/user/:id', getUser)

// delete user
router.delete('user/:id', deleteUser)

module.exports = router
