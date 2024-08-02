const MealPlanner = require("../models/mealPlannerModel");
const Recipe = require("../models/recipeModel");

const createMealPlan = async (req, res) => {
  const { user, mealType, date } = req.body;

  try {
    const mealPlanner = new MealPlanner({
      user,
      recipes,
      mealType,
      date,
    });

    await mealPlanner.save();
    res.status(201).json(mealPlanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Validate mealType
const addRecipeToMealPlanner = async (req, res) => {
  const { mealType, recipeId } = req.body;
  const { id } = req.params;

  console.log(req.body);

  // Validate mealType
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

    // Update meal type and add the new recipe
    meal.mealType = mealType;
    meal.recipes.push(recipeId);

    // Save the updated meal plan
    await meal.save();

    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all meal planner entries for a user
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

// Remove a recipe from the meal planner
const removeRecipeFromMealPlanner = async (req, res) => {
  const { mealPlannerId, recipeId } = req.params;

  try {
    const mealPlannerEntry = await MealPlanner.findById(mealPlannerId);
    if (!mealPlannerEntry) {
      return res.status(404).json({ message: "Meal planner entry not found" });
    }

    // Check if the recipe exists in the meal planner entry
    if (!mealPlannerEntry.recipes.includes(recipeId)) {
      return res
        .status(400)
        .json({ message: "Recipe not found in this meal planner entry" });
    }

    // Remove the recipe
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
  addRecipeToMealPlanner,
  getUserMealPlanner,
  removeRecipeFromMealPlanner,
};
