var request = require('request');
const Recipe = require('../models/recipe');

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

//update captures info and replaces/adds in the object
//this function does not work
function update(req, res, next) {
    let { recipeTitle, ingredients } = req.body // this is more secure 
    Recipe.findByIdAndUpdate(req.params.id, {   
        recipeTitle,
        ingredients
    }, function(err, recipe ){
        if(err) console.error(err);
        res.redirect(`/recipes/${recipe._id}`);
    });
}

// function update(req, res) {
//     Recipe.findByIdAndUpdate(req.params.id, req.body, (updatedRecipe) => {
//         console.log(req.params.id, req.body, 'this is the recipe i am updating, yes?')
//         res.redirect('/recipes/show')
//     } )
// }

//edit renders on the page
function edit(req, res, next) {
    Recipe.findById(req.params.id, function(err, recipe){
        console.log(req.params.id)
        res.render('recipes/edit', {recipe});
    })
};

function show(req, res, next){
    Recipe.findById(req.params.id, function(err, recipe){
        res.render('recipes/show', {recipe});
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