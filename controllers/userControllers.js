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

    res.status(200).json({ email, token, role: user.role })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup user
const signupUser = async (req, res) => {
  const { username, email, password, role } = req.body

  try {
    const user = await User.signup(username, email, password, role)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token, role: user.role })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get all users (only accessible by admin)
const getAllUsers = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user._id) 
    if (!adminUser.isAuthorized('admin')) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// get a user (only accessible by admin)
const getUser = async (req, res) => {
  try {
    const adminUser = await User.findById(req.user._id) 
    if (!adminUser.isAuthorized('admin')) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// delete user (only accessible by admin)
const deleteUser = async (req, res) => {
  const adminUser = await User.findById(req.user._id)
  if (!adminUser.isAuthorized('admin')) {
    return res.status(403).json({ message: 'Not authorized' })
  }

  const userId = req.params.id

  try {
    const user = await User.findByIdAndDelete(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { loginUser, signupUser, getAllUsers, deleteUser, getUser }
