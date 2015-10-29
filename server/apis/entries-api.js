var express = require('express');
var Entry = require('../models/entry');
var User = require('../models/user');
var EntriesAPI = express.Router();

EntriesAPI.get('/all', function(req, res) {
  Entry.all()
    .then(function(entries) {
      res.send(entries);
    });
});

EntriesAPI.get('/', function(req, res) {
  // finds user by username logged in to session.passport
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      // finds entries by user, using users id
      Entry.findByUser(user.id)
        .then(function(entries) {
          // sends back array of all entries matching userid
          res.send(entries);
        });
    });
});

EntriesAPI.post('/', function(req, res) {
  Entry.create(req.body)
    .then(function(newEntry) {
      res.status(201).send(newEntry);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = EntriesAPI;
