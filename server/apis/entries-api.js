var express = require('express');
var Entry = require('../models/entry');
var EntriesAPI = express.Router();

EntriesAPI.get('/', function(req, res) {
  Entry.all()
    .then(function(entries) {
      res.send(entries);
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
