const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeModel');
const Ingredient = require('../models/ingredientModel');

// Route to add a new recipe with ingredients
router.post('/add-recipe', async (req, res) => {
  const { name, method, ingredients } = req.body;

  try {
    // Save each ingredient and get their ObjectIds
    const ingredientIds = await Promise.all(ingredients.map(async (ing) => {
      const newIngredient = new Ingredient({ name: ing.name, quantity: ing.quantity });
      const savedIngredient = await newIngredient.save();
      return savedIngredient._id;
    }));

    // Create the recipe and link to the saved ingredient ObjectIds
    const newRecipe = new Recipe({
      name,
      method,
      ingredients: ingredientIds, // Store the ingredient ObjectIds in the recipe
    });

    const savedRecipe = await newRecipe.save();
    return res.status(201).json({ message: 'Recipe added successfully', recipe: savedRecipe });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding recipe', error: error.message });
  }
});


// Route to get recipe and its ingredients by recipe name
router.get('/recipe/:name', async (req, res) => {
  const recipeName = req.params.name;

  try {
    
    const recipe = await Recipe.findOne({ name: { $regex: new RegExp(recipeName, "i") } }).populate('ingredients');

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    return res.json(recipe); 
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving recipe', error: error.message });
  }
});

// Route to fetch all recipes and populate their ingredients
router.get('/', async (req, res) => {
  try {
    
    const recipes = await Recipe.find().populate('ingredients');
    res.json(recipes); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
});

module.exports = router;
