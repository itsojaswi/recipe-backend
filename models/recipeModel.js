const mongoose = require('mongoose')
const reviewSchema = require('./reviewModel') // Adjust the path as necessary

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
