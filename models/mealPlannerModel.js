const mongoose = require("mongoose");

// Define the meal planner schema
const mealPlannerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipes: [
      {
        recipe: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Recipe",
          required: true,
        },
        mealType: {
          type: String,
          enum: ["breakfast", "lunch", "dinner"],
          required: true,
        },
      },
    ],
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the meal planner model
const MealPlanner = mongoose.model("MealPlanner", mealPlannerSchema);

module.exports = MealPlanner;
