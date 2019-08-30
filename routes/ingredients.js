var express = require('express');
var router = express.Router();
var ingredientsCtrl = require('../controllers/ingredients');

router.get('/', ingredientsCtrl.index);
router.post('/', isLoggedIn, ingredientsCtrl.create);
router.post('/:id/ingredients', isLoggedIn, ingredientsCtrl.addToRecipe);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;