var express = require('express');
var User = require('../models/user');
var passport = require('passport');

var UsersAPI = express.Router();

// LOCAL PASSPORT REQUESTS
UsersAPI.post('/auth/signup',
  function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (!user) {
        res.send({ signedUp: false, info });
        return;
      }
      if (err) {
        res.status(404).send({ signedUp: false, err: err, info: info });
        return;
      }
      res.send({ signedUp: true });
    })(req, res, next);
  }
);

UsersAPI.post('/auth/login',
  function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
          // Some error
          res.send({ loggedIn: false, error: true, info: info });
          return;
        }
        if (!user) {
          // Some no user error
          res.send({ loggedIn: false, noUser: true, info: info });
          return;
        }
        req.logIn(user, function(err) {
          if (err) { return res.send({ loggedIn: false, err: true, info: info }); }
        });
        res.cookie('isLoggedIn', true);
        return res.send({ loggedIn: true });
      })(req, res, next);
    }
);

UsersAPI.post('/auth/logout', function(req, res, next) {
  req.logout();
  req.session.destroy(function(err) {
    if (err) { return next(err); }
    res.header('isAuthenticated', 'false');
    res.clearCookie('isLoggedIn');
    res.send({ loggedIn: false });
  });
});

// temporary for testing
UsersAPI.get('/', function(req, res) {
  User.all()
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      console.log('Users GET users/ Error-', err);
      res.status(400).send();
    });
});

// GOOGLE PASSPORT REQUESTS
UsersAPI.get('/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
  })
);

UsersAPI.get('/auth/google/callback',
  function(req, res, next) {
    passport.authenticate('google', function(err, user, info) {
      if (err) {
        // Some error
        res.send({ loggedIn: false, error:true, info: info });
        return;
      }
      if (!user) {
        // Some no user error
        res.send({ loggedIn: false, noUser:true, info: info });
        return;
      }
      req.logIn(user, function(err) {
        if (err) { res.redirect(302, '/'); }
      });
      res.cookie('isLoggedIn', true);
      res.redirect(302, '/');
    })(req, res, next);
  }
);

// FACEBOOK PASSPORT REQUESTS
UsersAPI.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: [ 'email' ]
  })
);

UsersAPI.get('/auth/facebook/callback',
  function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      console.log('line 112', err, user);
      if (err) {
        // Some error
        res.send({ loggedIn: false, error:true, info: info });
        return;
      }
      if (!user) {
        // Some no user error
        res.send({ loggedIn: false, noUser:true, info: info });
        return;
      }
      req.logIn(user, function(err) {
        console.log('logIn 124', err);
        if (err) { res.redirect(302, '/'); }
      });
      res.cookie('isLoggedIn', true);
      res.redirect(302, '/');
    })(req, res, next);
  }
);

module.exports = UsersAPI;
