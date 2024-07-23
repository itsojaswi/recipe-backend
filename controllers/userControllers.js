const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await User.signup(username, email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// get a user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'user' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// delete user
const deleteUser = async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findByIdAndDelete(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'user deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { loginUser, signupUser, getAllUsers, deleteUser, getUser }
