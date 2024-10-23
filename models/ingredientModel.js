const mongoose = require('mongoose');

// Define the Ingredient schema
const ingredientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  quantity: { 
    type: String, 
    required: true 
},
});

// Create the Ingredient model
const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
