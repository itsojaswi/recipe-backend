const express = require('express')
const router = express.Router()
const {
  getUserFavorites,
  removeFromFavorites,
  addToFavorites
} = require('../controllers/favoriteControllers')
const authMiddleware = require('../middleware/auth')

// post to favorite
router.post('/', authMiddleware, addToFavorites)

// get from favorite
router.get('/', authMiddleware, getUserFavorites)

// delete from favorite
router.delete('/:id', authMiddleware, removeFromFavorites)

module.exports = router
