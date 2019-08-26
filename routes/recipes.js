var express = require('express');
var router = express.Router();
var passport = require('passport');
var recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/new', recipesCtrl.new);
router.get('/:id', recipesCtrl.show);
// router.get('/:id/edit', recipesCtrl.edit);
router.post('/', recipesCtrl.create);
// router.put('/:id', recipesCtrl.update);

module.exports = router;