const FavoriteRecipe = require('../models/favrioteModels')

// Add a recipe to the user's favorites
const addToFavorites = async (req, res) => {
  try {
    const { recipeId } = req.body
    const userId = req.user.id

    // Check if the recipe is already in the user's favorites
    const existingFavorite = await FavoriteRecipe.findOne({ userId, recipeId })
    if (existingFavorite) {
      return res.status(400).json({ message: 'Recipe already in favorites' })
    }

    const newFavorite = new FavoriteRecipe({ userId, recipeId })
    await newFavorite.save()

    res.status(201).json(newFavorite)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Remove a recipe from the user's favorites
const removeFromFavorites = async (req, res) => {
  try {
    const { recipeId } = req.body
    const userId = req.user.id

    const favorite = await FavoriteRecipe.findOneAndDelete({ userId, recipeId })
    if (!favorite) {
      return res.status(404).json({ message: 'Recipe not found in favorites' })
    }

    res.status(200).json({ message: 'Recipe removed from favorites' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get the user's favorite recipes
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id
    const favorites = await FavoriteRecipe.find({ userId }).populate('recipeId')
    res.status(200).json(favorites)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
