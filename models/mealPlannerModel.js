
const mongoose = require('mongoose')

/**
 * Represents a meal planner.
 * @typedef {Object} MealPlanner
 * @property {mongoose.Schema.Types.ObjectId} user - The user associated with the meal planner.
 * @property {Array<mongoose.Schema.Types.ObjectId>} recipes - The recipes included in the meal planner.
 * @property {string} mealType - The type of meal (breakfast, lunch, or dinner).
 * @property {Date} date - The date of the meal planner.
 * @property {Date} createdAt - The timestamp when the meal planner was created.
 * @property {Date} updatedAt - The timestamp when the meal planner was last updated.
 */

const mealPlannerSchema = new mongoose.Schema(
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

/**
 * Represents a meal planner model.
 * @type {mongoose.Model<MealPlanner>}
 */
const MealPlanner = mongoose.model('MealPlanner', mealPlannerSchema)

module.exports = MealPlanner
