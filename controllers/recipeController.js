const Recipe = require('../models/recipeModel')

// Create a new recipe
const { body, validationResult } = require('express-validator')

// add review to the recipe
const addReview = async (req, res) => {
  const { rating, comment } = req.body
  const { recipeId } = req.params

  try {
    const recipe = await Recipe.findById(recipeId)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    const review = {
      user: req.user.id,
      rating,
      comment
    }

    recipe.reviews.push(review)
    await recipe.save()

    res.status(201).json(recipe)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// create a recipe
const createRecipe = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const {
      title,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      tags,
      image
    } = req.body
    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      createdBy: req.user.id,
      tags,
      image
    })
    await recipe.save()
    res.status(201).json(recipe)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get a single recipe by ID
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }
    res.json(recipe)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// update recipe
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    if (recipe.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete this recipe' })
    }

    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
  const { id } = req.params // Destructure id from req.params

  try {
    // Optional: Check if the user is authorized to delete this recipe
    const recipe = await Recipe.findById(id)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    if (recipe.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete this recipe' })
    }

    // Use findByIdAndDelete to remove the recipe
    await Recipe.findByIdAndDelete(id)
    res.status(204).json({ message: 'Recipe deleted' }) // Return 204 No Content
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// export modules
module.exports = {
  addReview,
  createRecipe,
  getRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe
}
