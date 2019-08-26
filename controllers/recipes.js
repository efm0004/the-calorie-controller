const Recipe = require('../models/recipe');

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
    // edit, 
    // update
}

// function update(req, res, next) {
//     req.body.done = req.body.done === 'on';
//     Recipe.update(req.params.id, req.body);
//     res.redirect('/recipes');
// }

// function edit(req, res, next) {
//     res.render('recipes/edit', {recipe};
//     // {
//     //     recipe: Recipe.getOne(req.params.id),
//     //     idx: req.params.id
//     // }
//     );
// }

function show(req, res, next){
    Recipe.findById(req.params.id, function(err, recipe){
        res.render('recipes/show', {recipe});
    })
}

function create(req, res, next){
    for (let key in req.body){
        if (req.body[key] === '') delete req.body[key];
    }
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