const express = require('express')
const router = express.Router()
const {
  addRecipeToMealPlanner,
  getUserMealPlanner,
  removeRecipeFromMealPlanner
} = require('../controllers/mealPlannerController')
const authMiddleware = require('../middleware/auth')

// post to favorite
router.post('/', authMiddleware, addRecipeToMealPlanner)

// get from favorite
router.get('/', authMiddleware, getUserMealPlanner)

// delete from favorite
router.delete('/:id', authMiddleware, removeRecipeFromMealPlanner)

module.exports = router
