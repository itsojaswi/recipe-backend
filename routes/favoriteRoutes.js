const express = require('express')
const router = express.Router()
const {
  getUserFavorites,
  removeFromFavorites,
  addToFavorites
} = require('../controllers/favoriteControllers')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

// post to favorite
router.post('/', addToFavorites)

// get from favorite
router.get('/', getUserFavorites)

// delete from favorite
router.delete('/:id', removeFromFavorites)

module.exports = router
