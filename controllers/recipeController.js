const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");

// Create a new recipe
const { body, validationResult } = require("express-validator");

const addReview = async (req, res) => {
  const { rating, reviewText } = req.body; // Make sure this is correct
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const review = {
      user: req.user.id,
      rating,
      reviewText, // This should correctly map to the field
    };

    recipe.reviews.push(review);
    await recipe.save();

    const updatedRecipe = await Recipe.findById(recipeId)
      .populate({
        path: "reviews.user",
        select: "username profile",
      })
      .exec();

    res.status(201).json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create a recipe
const createRecipe = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      tags,
      image,
    } = req.body;
    if (!title || !ingredients || !instructions) {
      return res
        .status(400)
        .json({ message: "Title, ingredients, and instructions are required" });
    }

    // Create new recipe
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      createdBy: req.user.id,
      tags,
      image,
    });

    // Save recipe to the database
    await recipe.save();

    // Respond with the created recipe
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single recipe by ID
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate({
        path: "createdBy",
        select: "username profile",
      })
      .populate({
        path: "reviews.user",
        select: "username profile",
      });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipeWithAuthor = async (recipeId) => {
  try {
    const recipe = await Recipe.findById(recipeId).populate("createdBy");
    return recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
};

// update recipe
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this recipe" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this recipe" });
    }

    await Recipe.findByIdAndDelete(id);
    res.status(204).json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipesByUserId = async (req, res) => {
  const userId = req.user._id;

  console.log("Authenticated userId:", userId);

  try {
    const recipes = await Recipe.find({ createdBy: userId }).populate(
      "createdBy"
    );

    if (!recipes.length) {
      return res
        .status(404)
        .json({ message: "No recipes found for this user" });
    }

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const search = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ message: "Query parameter is required and must be a string" });
    }

    const regex = new RegExp(query, "i");

    // Search recipes based on the query
    const recipes = await Recipe.find({
      $or: [
        {
          title: { $regex: regex },
        },
      ],
    });

    // Search users based on the query
    const users = await User.find({
      $or: [{ username: { $regex: regex } }],
    });

    res.json({ recipes, users });
  } catch (error) {
    console.error("Error during search:", error); // Detailed error logging
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// export modules
module.exports = {
  addReview,
  createRecipe,
  getRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  getRecipeWithAuthor,
  getRecipesByUserId,
  search,
};
