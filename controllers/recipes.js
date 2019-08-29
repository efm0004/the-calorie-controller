var request = require('request');
const Recipe = require('../models/recipe');
var { RecipeSearchClient } = require('edamam-api');

const client = new RecipeSearchClient({
    appId: '124ca29b',
    appKey: '2ed02cd62b67ddbbb3d36fc8b83cdc0f'
});

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

//update captures info and replaces/adds in the object
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

//edit renders on the page
function edit(req, res, next) {
    Recipe.findById(req.params.id, function(err, recipe){
        console.log(req.params.id)
        res.render('recipes/edit', {recipe});
    })
};


//npm i edamam first attempt - need Shazahd/Chris/Andrew help, does nothing
//may need to move this functionality to the create function instead
// function show(req, res, next){
//     Recipe.findById(req.params.id, function(err, recipe){
//         let results = client.search({query: 'egg'})
//         res.render('recipes/show', {recipe, results});
//     })
// }

// original basic show function - in case API doesn't work
function show(req, res, next){
    Recipe.findById(req.params.id, function(err, recipe){
        res.render('recipes/show', {recipe});
    })
}

//first attempt at API w/out npm install
// function show(req, res, next){
//     Recipe.findById(req.params.id, function(err, recipe){
//         let options = {
//             url: rootURL,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: {
//                 ingr: ['egg']
//             }
//         }
//         request.post(options, function(err, response){
//             console.log(response);
//             res.render('recipes/show', {recipe, data: response}); 
//         });
//     })
// }

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