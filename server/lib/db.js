var bPromise = require('bluebird');
var Fixture = require('./fixtures');
// Read configuration file
var config = require('../../knexfile.js');

// Configure knex with the correct environment configuration
var env = process.env.NODE_ENV || 'development';
var db = require('knex')(config[env]);

//db.migrate.latest(config[env]);
// Export the db object, which will be able to make database connections
// module.exports = db;

// Function for your testing suite
db.deleteEverything = function () {
  if (env !== 'test') { return bPromise.reject(); }
  return db('meals').delete()
    .then(function() {
      return db('entries').delete();
    });
    // .then(function() {
    //   return db('users').delete();
    // });
};

Fixture.populateDB();

module.exports = db;
