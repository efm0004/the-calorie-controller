const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');

module.exports = {
    index, 
    create,
    addToRecipe
}

function addToRecipe(req, res, next){
    Recipe.findById(req.params.id, function(err, recipe){
        recipe.ingredientsRecipe.push(req.body.ingredientName)
        recipe.save(function(err){
            res.redirect(`/recipes/${recipe._id}`);
        })
    })
}

function index(req, res, next){
    Ingredient.find({}, function(err, ingredients){
        res.render('ingredients/index', {ingredients});
    })
}

function create(req, res, next){
    for (let key in req.body){
        if (req.body[key] === '') delete req.body[key];
    }
    console.log(req.body)
    var ingredient = new Ingredient(req.body);
    ingredient.save(function(err){
        if (err) return res.render('ingredients');
        res.redirect('ingredients');
    })
}