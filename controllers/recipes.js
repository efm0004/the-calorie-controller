const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
// var { NutritionAnalysisClient } = require('edamam-api');

// const client = new NutritionAnalysisClient({
//     appId: '124ca29b',
//     appKey: '2ed02cd62b67ddbbb3d36fc8b83cdc0f'
// });

// const results = client.search({query: 'Egg'});

// const rootURL = 'https://api.edamam.com/api/nutrition-details/?app_id=124ca29b&app_key=2ed02cd62b67ddbbb3d36fc8b83cdc0f'

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
    edit, 
    update,
    delete: deleteRecipe
}

function deleteRecipe(req, res, next) {
    Recipe.findByIdAndRemove(req.params.id, function(err){
        Recipe.remove();
    });
    res.redirect('/recipes');
}

function update(req, res, next) {
    let { recipeTitle } = req.body 
    Recipe.findByIdAndUpdate(req.params.id, {   
        recipeTitle
    }, function(err, recipe ){
        if(err) console.error(err);
        res.redirect(`/recipes/${recipe._id}`);
    });
}

function edit(req, res, next) {
    Recipe.findById(req.params.id, function(err, recipe){
        console.log(req.params.id)
        res.render('recipes/edit', {recipe});
    })
};

async function show(req, res, next){
    let recipe = await Recipe.findById(req.params.id).populate('ingredientsRecipe')
    let ingredients = await Ingredient.find({});
    res.render('recipes/show', {
        recipe, 
        ingredients
    })
}

function create(req, res, next){
    for (let key in req.body){
        if (req.body[key] === '') delete req.body[key];
    }
    console.log(req.body)
    var recipe = new Recipe(req.body);
    recipe.save(function(err){
        if (err) return res.render('recipes/new');
        res.redirect('recipes');
    })
}

function newRecipe(req, res, next) {
    res.render('recipes/new');
}

function index(req, res, next) {
    //Recipe - find all and render list of recipes
    Recipe.find({}, function(err, recipes){
        res.render('recipes/index', {recipes});
    })
}

