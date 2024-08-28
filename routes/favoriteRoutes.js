const express = require("express");
const router = express.Router();
const {
  getUserFavorites,
  toggleFavorite,
  checkFavorites,
} = require("../controllers/favoriteControllers");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);

// post to favorite
router.post("/toggle", toggleFavorite);

// get from favorite
router.get("/", getUserFavorites);

// check favorite
router.get("/check/:recipeId", checkFavorites);

module.exports = router;
