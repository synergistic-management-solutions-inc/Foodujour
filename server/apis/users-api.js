var express = require('express');
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var UsersAPI = express.Router();


// UsersAPI.post('/signup', function(req, res) {

//   console.log('signing up......')
//   res.end();

// });

UsersAPI.post('/signup',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signupFail'
  })
);

UsersAPI.post('/login', function(req, res) {

  console.log('logging in......')
  res.end();
  
});


UsersAPI.get('/logout', function(req, res) {

  console.log('logging Out......')
  res.end();

});

module.exports = UsersAPI;
