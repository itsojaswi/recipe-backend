const MealPlanner = require("../models/mealPlannerModel");
const Recipe = require("../models/recipeModel");

// Create a new meal plan
const createMealPlan = async (req, res) => {
  const { user, mealType, date } = req.body;

  try {
    const mealPlanner = new MealPlanner({
      user,
      mealType,
      date,
    });

    await mealPlanner.save();
    res.status(201).json(mealPlanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a recipe to a meal plan
const addRecipeToMealPlanner = async (req, res) => {
  const { mealType, recipeId } = req.body;
  const { id } = req.params;

  if (!["breakfast", "lunch", "dinner"].includes(mealType)) {
    return res.status(400).json({
      message: "Invalid meal type. Must be breakfast, lunch, or dinner.",
    });
  }

  try {
    const meal = await MealPlanner.findById(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal plan not found." });
    }

    meal.mealType = mealType;
    meal.recipes.push(recipeId);

    await meal.save();

    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get meal plans for a user
const getUserMealPlanner = async (req, res) => {
  try {
    const mealPlans = await MealPlanner.find({ user: req.user.id }).populate(
      "recipes"
    );
    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a recipe from a meal plan
const removeRecipeFromMealPlanner = async (req, res) => {
  const { mealPlannerId, recipeId } = req.params;

  try {
    const mealPlannerEntry = await MealPlanner.findById(mealPlannerId);
    if (!mealPlannerEntry) {
      return res.status(404).json({ message: "Meal planner entry not found" });
    }

    if (!mealPlannerEntry.recipes.includes(recipeId)) {
      return res
        .status(400)
        .json({ message: "Recipe not found in this meal planner entry" });
    }

    mealPlannerEntry.recipes = mealPlannerEntry.recipes.filter(
      (id) => id.toString() !== recipeId
    );
    await mealPlannerEntry.save();

    res.status(200).json(mealPlannerEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMealPlan, // Export the createMealPlan function
  addRecipeToMealPlanner, // Export the addRecipeToMealPlanner function
  getUserMealPlanner, // Export the getUserMealPlanner function
  removeRecipeFromMealPlanner, // Export the removeRecipeFromMealPlanner function
};
