
const mongoose = require('mongoose')
const reviewSchema = require('./reviewModel') // Adjust the path as necessary

/**
 * Represents a recipe.
 * @typedef {Object} Recipe
 * @property {string} title - The title of the recipe.
 * @property {Array<Ingredient>} ingredients - The list of ingredients required for the recipe.
 * @property {Array<string>} instructions - The step-by-step instructions to prepare the recipe.
 * @property {number} prepTime - The preparation time of the recipe in minutes.
 * @property {number} cookTime - The cooking time of the recipe in minutes.
 * @property {number} servings - The number of servings the recipe yields.
 * @property {mongoose.Schema.Types.ObjectId} createdBy - The ID of the user who created the recipe.
 * @property {Array<string>} tags - The tags associated with the recipe.
 * @property {Array<Review>} reviews - The reviews of the recipe.
 * @property {string} image - The URL of the image representing the recipe.
 * @property {Date} createdAt - The timestamp when the recipe was created.
 * @property {Date} updatedAt - The timestamp when the recipe was last updated.
 */

/**
 * Represents an ingredient.
 * @typedef {Object} Ingredient
 * @property {string} name - The name of the ingredient.
 * @property {string} quantity - The quantity of the ingredient required.
 */

/**
 * Represents a review.
 * @typedef {Object} Review
 * @property {string} comment - The comment of the review.
 * @property {number} rating - The rating given in the review.
 */

/**
 * Recipe schema for MongoDB.
 * @type {mongoose.Schema}
 */
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: String,
          required: true
        }
      }
    ],
    instructions: [
      {
        type: String,
        required: true
      }
    ],
    prepTime: {
      type: Number, // time in minutes
      required: true
    },
    cookTime: {
      type: Number, // time in minutes
      required: true
    },
    servings: {
      type: Number,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tags: [String],
    reviews: [reviewSchema],
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema)
