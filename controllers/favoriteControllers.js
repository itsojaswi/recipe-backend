const FavoriteRecipe = require("../models/favrioteModels");

// Function to add a recipe to favorites
const addToFavorites = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.id;

    if (!recipeId) {
      return res.status(400).json({ message: "recipeId is required" });
    }

    const existingFavorite = await FavoriteRecipe.findOne({ userId, recipeId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

    const newFavorite = new FavoriteRecipe(userId, recipeId);
    await newFavorite.save();

    res.status(201).json(newFavorite);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to remove a recipe from favorites
const removeFromFavorites = async (req, res) => {
  try {
    console.log(req.params);
    const { favoriteId } = req.params;

    const favorite = await FavoriteRecipe.findOneAndDelete(favoriteId);

    if (!favorite) {
      return res.status(404).json({ message: "Recipe not found in favorites" });
    }

    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get user's favorite recipes
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

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

module.exports = {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
};
