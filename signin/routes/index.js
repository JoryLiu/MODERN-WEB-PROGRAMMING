var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator.js');

var users = {}

/* GET detail page. */
router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'User Information', user: req.session.user });
});

/* GET sign up page. */
router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'Sign Up', user: {}  });
});

router.post('/signUp', function(req, res, next) {
  var user = req.body;
  try {
    checkUser(user);
    req.session.user = users[user.name] = user;
    res.redirect('/detail');
  } catch(err) {
    res.render('signUp', { title: 'Sign Up', user: user, error: err.message });
  }
});

router.all('*', function(req, res, next) {
  req.session.user ? next() : res.redirect('/signin');
});

module.exports = router;

function checkUser(user) {
  var errorMessages = [];
  for (var key in user) {
    if (user[key] != undefined) {
      if (!validator.isFieldValid(key, user[key])) errorMessages.push(validator.form[key].errorMessage);
      if (!validator.isAttrValueUnique(users, user, key)) {
        error = "key: " + key + ' is not unique with value: ' + user[key];
        errorMessages.push(error);
      }
    }
  }
  if (errorMessages.length > 0) throw new Error(errorMessages.join('<br />'));
}