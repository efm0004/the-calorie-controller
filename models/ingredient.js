var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = new Schema({
    ingredientName: {
        type: String,
        unique: true,
        required: true
    },
    ingredientCalories: {
        type: Number,
        required: true,
        min: 0
    }
})

module.exports = mongoose.model('Ingredient', ingredientSchema);