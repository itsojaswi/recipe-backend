const express = require('express')
const router = express.Router()
const {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addReview
} = require('../controllers/recipeController')
const authMiddleware = require('../middleware/auth')

router.post('/', authMiddleware, createRecipe)
router.get('/', getAllRecipes)
router.get('/:id', getRecipe)
router.patch('/:id', authMiddleware, updateRecipe)
router.delete('/:id', authMiddleware, deleteRecipe)
router.post('/:recipeId/reviews', authMiddleware, addReview)

module.exports = router
