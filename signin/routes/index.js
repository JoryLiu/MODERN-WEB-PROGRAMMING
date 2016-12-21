var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:index');

module.exports = function (db) {

  var userManager = require('../models/user')(db);

  var users = db.collection('users');
  debug("Users collection setup as: ", users);

  /* GET detail page. */
  router.get('/detail', function (req, res, next) {
    if (req.session.user)
      res.render('detail', { title: 'User Information', user: req.session.user });
    else
      res.redirect('/signIn');
  });

  /* GET sign up page. */
  router.get('/signUp', function (req, res, next) {
    res.render('signUp', { title: 'Sign Up', user: {} });
  });

  router.post('/signUp', function (req, res, next) {
    var user = req.body;
    userManager.checkUser(user)
      .then(userManager.createUser)
      .then(function () {
        req.session.user = user;
        res.redirect('/detail');
      })
      .catch(function (error) {
        res.render('signup', { title: 'Sign Up', user: user, error: error });
      });
  });

  /* GET sign in page. */
  router.get('/signIn', function (req, res, next) {
    res.render('signIn', { title: 'Sign In' });
  });

  router.post('/signIn', function (req, res, next) {
    userManager.findUser(req.body.name, req.body.password)
      .catch(function (err) {
        res.render('signIn', { title: 'Sign In', error: err });
      }).then(function (user) {
        if (user != undefined) {
          req.session.user = user;
          res.redirect('/detail');
        }
      });
  });

  /* GET sign out page. */
  router.get('/signOut', function (req, res, next) {
    delete req.session.user;
    res.redirect('/signIn');
  });

  router.all('*', function (req, res, next) {
    req.session.user ? next() : res.redirect('/signIn');
  });

  return router;
}

/*function checkUser(user) {
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
}*/