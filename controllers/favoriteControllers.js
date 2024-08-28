const FavoriteRecipe = require("../models/favoriteModel");

// Function to toggle a recipe in favorites
const toggleFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.id;

    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID is required" });
    }

    // Check if the recipe is already in the user's favorites
    const existingFavorite = await FavoriteRecipe.findOne({ userId, recipeId });

    if (existingFavorite) {
      await FavoriteRecipe.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({ message: "Recipe removed from favorites" });
    } else {
      const newFavorite = new FavoriteRecipe({ userId, recipeId });
      await newFavorite.save();
      return res
        .status(201)
        .json({ message: "Recipe added to favorites", favorite: newFavorite });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get user's favorite recipes
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await FavoriteRecipe.find({ userId }).populate(
      "recipeId"
    );

    if (favorites.length === 0) {
      return res.status(404).json({ message: "No favorite recipes found" });
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to check if a recipe is in user's favorites
const checkFavorites = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID is required" });
    }

    // Check if the recipe is in the user's favorites
    const favorite = await FavoriteRecipe.findOne({
      userId,
      recipeId,
    });

    if (favorite) {
      return res.status(200).json({ isFavorite: true });
    } else {
      return res.status(200).json({ isFavorite: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  toggleFavorite,
  getUserFavorites,
  checkFavorites,
};
