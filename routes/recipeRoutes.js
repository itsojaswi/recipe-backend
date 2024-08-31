const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addReview,
  getRecipesByUserId,
} = require("../controllers/recipeController");
const authMiddleware = require("../middleware/auth");

// add to recipe
router.post("/", authMiddleware, createRecipe);

// get all recipes
router.get("/", getAllRecipes);

// get all recipes created by the authenticated user
router.get("/me", authMiddleware, getRecipesByUserId);

// get one recipe
router.get("/:id", getRecipe);

// update the existing recipe
router.patch("/:id", authMiddleware, updateRecipe);

// delete from existing recipe
router.delete("/:id", authMiddleware, deleteRecipe);

// add review to a recipe
router.post("/:recipeId/reviews", authMiddleware, addReview);

// get all recipes created by a specific user

module.exports = router;
