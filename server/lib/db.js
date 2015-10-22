var bPromise = require('bluebird');

// Read configuration file
var config = require('../../knexfile.js');

// Configure knex with the correct environment configuration
var env = process.env.NODE_ENV || 'development';
console.log('db line 9:', env);
console.log('db line 8:', config[env]);
console.log('db line 10:', process.env.PG_TEST);
var db = require('knex')(config[env]);

// Export the db object, which will be able to make database connections
module.exports = db;

// Function for your testing suite
db.deleteEverything = function () {
  if (env !== 'test') { return bPromise.reject(); }

  // TODO: Delete data from all tables (useful for testing)
  return db('meals').delete();
};
