const express = require('express')
const {
  signupUser,
  loginUser,
  getAllUsers
} = require('../controllers/userControllers')
const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// get all users
router.get('/users', getAllUsers)

module.exports = router
