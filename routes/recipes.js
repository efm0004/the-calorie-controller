var express = require('express');
var router = express.Router();
var request = require('request');
var passport = require('passport');
var recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/new', recipesCtrl.new);
router.get('/:id/edit', recipesCtrl.edit);
router.get('/:id', recipesCtrl.show);
router.put('/:id', recipesCtrl.update);
router.post('/', recipesCtrl.create);
router.delete('/:id', recipesCtrl.delete);

module.exports = router;