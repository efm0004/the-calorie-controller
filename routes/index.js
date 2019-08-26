var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'the calorie controller', user: req.user });
});

router.get('/auth/google', passport.authenticate(
  'google', {scope: ['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
  'google', 
  {
    successRedirect: '/recipes',
    failureRedirect: '/'
    //will need to change successRedirect when file structure is complete
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})

module.exports = router;
