const FavoriteRecipe = require("../models/favrioteModels");

// Add a recipe to the user's favorites
const addToFavorites = async (req, res) => {
  try {
    // Destructure recipeId from the request body
    const { recipeId } = req.body;
    console.log(recipeId);

    // Ensure userId is available from the authenticated user
    const userId = req.user.id;

    // Validate input
    if (!recipeId) {
      return res.status(400).json({ message: "recipeId is required" });
    }

    // Check if the recipe is already in the user's favorites
    const existingFavorite = await FavoriteRecipe.findOne({ userId, recipeId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

    // Create a new favorite recipe entry
    const newFavorite = new FavoriteRecipe({ userId, recipeId });
    await newFavorite.save();

    // Respond with the created favorite recipe
    res.status(201).json(newFavorite);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error adding to favorites:", error);

    // Respond with a generic error message
    res.status(500).json({ message: "Internal server error" });
  }
};

// remove from favorite
const removeFromFavorites = async (req, res) => {
  try {
    // Destructure favorite from the request body
    console.log(req.params);
    const { favoriteId } = req.params;

    // Remove the favorite recipe from the database
    const favorite = await FavoriteRecipe.findOneAndDelete(favoriteId);

    // Check if the favorite was found and removed
    if (!favorite) {
      return res.status(404).json({ message: "Recipe not found in favorites" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (error) {
    // Log the error
    console.error("Error removing from favorites:", error);

    // Respond with a generic error message
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get the user's favorite recipes
const getUserFavorites = async (req, res) => {
  try {
    // Ensure userId is available from the authenticated user
    const userId = req.user.id;
    console.log(userId);

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the user's favorite recipes and populate the recipe details
    const favorites = await FavoriteRecipe.find({ userId }).populate(
      "recipeId"
    );

    // Check if the user has any favorites
    if (favorites.length === 0) {
      return res.status(404).json({ message: "No favorite recipes found" });
    }

    // Respond with the list of favorite recipes
    res.status(200).json(favorites);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching user favorites:", error);

    // Respond with a generic error message
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
};
