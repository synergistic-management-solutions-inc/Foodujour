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
      console.log(user);
      Entry.findByUser(user.id)
        .then(function(entries) {
          // sends back array of all entries matching userid
          res.send(entries);
        });
    });
});

EntriesAPI.post('/', function(req, res) {
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      req.body.user_id = user.id;
      Entry.create(req.body)
      .then(function(newEntry) {
        res.status(201).send(newEntry);
      })
      .catch(function(err) {
        console.log(err);
      });
    });
});

EntriesAPI.put('/:id', function(req, res) {
  var entryid = req.params.id;
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      Entry.findOne(entryid)
        .then(function(entry) {
          if (entry.user_id !== user.id) {
            res.status(403).send({ error: 'User definitely is doing some fishy things' });
            return;
          }
          req.body.user_id = user.id;
          req.body.id = entryid;
          Entry.updateOne(req.body)
            .then(function(entry) {
              res.send(entry);
            });
        });
    });
});

EntriesAPI.get('/delete/:id', function(req, res) {
  var entryid = req.params.id;

  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      Entry.findOne(entryid)
        .then(function(entry) {
          if (entry.user_id !== user.id) {
            res.status(403).send({ error: 'User definitely is doing some fishy things' });
            return;
          }
          // call destroy on the entryId
          Entry.destroyOne(entry.id)
            .then(function() {
              // sends success message if it reaches here
              res.send({ message: 'successfully deleted entry' });
            });
        });
    });
});

module.exports = EntriesAPI;
