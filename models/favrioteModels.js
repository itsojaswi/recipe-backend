const mongoose = require("mongoose");

// Define the schema for favorite recipes
const favoriteRecipe = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

module.exports = mongoose.model("FavoriteRecipe", favoriteRecipe); // Export the model

// End of file
