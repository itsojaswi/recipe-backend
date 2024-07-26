const mongoose = require('mongoose')

const mealPlanner = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
      }
    ],
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner'], // Enum for meal types
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('MealPlanner', mealPlanner)
