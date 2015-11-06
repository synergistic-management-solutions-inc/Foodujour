var express = require('express');
var Entry = require('../models/entry');
var User = require('../models/user');
var EntriesAPI = express.Router();

// Entries API

// GET /api/entries/all return all entries
EntriesAPI.get('/all', function(req, res) {
  Entry.all()
    .then(function(entries) {
      res.send(entries);
    });
});

// GET /api/entries/ gets all entries of currently logged in user
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

// POST /api/entries/ attempts to add an entry to database assigning user_id to
// current logged in user
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

// PUT /api/entries/:id attempts to update entry of :id with new info, requires
// all attributes passed in
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

// DELETE /api/entries/:id deletes the current entry if logged in user owns it
EntriesAPI.delete('/:id', function(req, res) {
  var entryid = req.params.id;

  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      Entry.findOne(entryid)
        .then(function(entry) {
          if (!entry){
            res.status(404).send()
          }
          else if (entry.user_id !== user.id) {
            res.status(403).send({ error: 'User definitely is doing some fishy things' });
          }
          // call destroy on the entryId
          else {
            Entry.destroyOne(entry.id)
              .then(function() {
                // sends success message if it reaches here
                res.status(200).send({ message: 'successfully deleted entry' });
              });
          }
        });
    });
});

module.exports = EntriesAPI;
