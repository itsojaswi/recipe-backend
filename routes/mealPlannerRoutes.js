const express = require('express')
const router = express.Router()
const {
  addRecipeToMealPlanner,
  getUserMealPlanner,
  removeRecipeFromMealPlanner
} = require('../controllers/mealPlannerController')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

// post to favorite
router.post('/', addRecipeToMealPlanner)

// get from favorite
router.get('/', getUserMealPlanner)

// delete from favorite
router.delete('/:id', removeRecipeFromMealPlanner)

module.exports = router
