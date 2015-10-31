var bPromise = require('bluebird');
// Read configuration file
var config = require('../../knexfile.js');

// Configure knex with the correct environment configuration
var env = process.env.NODE_ENV || 'development';
var db = require('knex')(config[env]);

db.schema.hasTable('users').then(function(exists) {
  if (!exists && process.env.TRAVIS === 'true') {
    console.log('hi travis is true');
    knex.migrate.currentVersion()
      .then(function(version) {
        if (version === 'none') {
          console.log('no migrations lets do the latest');
          db.migrate.latest();
        }
      });
  }
});

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
