const mongoose = require('mongoose');

// Define the Recipe schema
const recipeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  method: { 
    type: String, 
    required: true 
},
  ingredients: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' 
}] 
});

// Create the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
