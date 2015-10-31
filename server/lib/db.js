var bPromise = require('bluebird');
// Read configuration file
var config = require('../../knexfile.js');

// Configure knex with the correct environment configuration
var env = process.env.NODE_ENV || 'development';
var db = require('knex')(config[env]);

// Function for your testing suite
db.deleteEverything = function () {
  if (env !== 'test') { return bPromise.reject(); }
  return db('meals').delete()
    .then(function() {
      return db('entries').delete();
    })
    .then(function() {
      return db('users').delete();
    });
};

module.exports = db;
