const mongoose = require('mongoose')

// Define the schema for a favorite recipe
const favoriteRecipe = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe', // Reference to the Recipe model
      required: true
    }
  },
  { timestamps: true }
)

// Create the FavoriteRecipe model
module.exports = mongoose.model('FavoriteRecipe', favoriteRecipe)
