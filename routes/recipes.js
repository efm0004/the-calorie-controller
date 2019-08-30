var express = require('express');
var router = express.Router();
// var request = require('request');
var passport = require('passport');
var recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/new', recipesCtrl.new);
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit);
router.get('/:id', recipesCtrl.show);
router.put('/:id', isLoggedIn, recipesCtrl.update);
router.post('/', isLoggedIn, recipesCtrl.create);
router.delete('/:id', isLoggedIn, recipesCtrl.delete);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;