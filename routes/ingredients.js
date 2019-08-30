var express = require('express');
var router = express.Router();
var ingredientsCtrl = require('../controllers/ingredients');

router.get('/', ingredientsCtrl.index);
router.post('/', ingredientsCtrl.create);
router.post('/:id/ingredients', ingredientsCtrl.addToRecipe);

module.exports = router;