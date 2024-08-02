/**
 * Represents a favorite recipe.
 * @typedef {Object} FavoriteRecipe
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user who favorited the recipe.
 * @property {mongoose.Schema.Types.ObjectId} recipeId - The ID of the favorited recipe.
 * @property {Date} createdAt - The date and time when the favorite recipe was created.
 * @property {Date} updatedAt - The date and time when the favorite recipe was last updated.
 */
const mongoose = require("mongoose");

// Define the schema for a favorite recipe
const favoriteRecipe = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe", // Reference to the Recipe model
      required: true,
    },
  },
  { timestamps: true }
);

// Create the FavoriteRecipe model
module.exports = mongoose.model("FavoriteRecipe", favoriteRecipe);
