var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var recipeSchema = new Schema({
    recipeTitle: {
        type: String,
        required: true
    },
    ingredientsRecipe: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    }]
    }, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);