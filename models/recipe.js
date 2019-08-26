var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
    recipeTitle: {
        type: String
    },
    ingredients: {
        type: String
    },
    calories: {
        type: Number
    } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);