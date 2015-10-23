var bPromise = require('bluebird');

// Read configuration file
var config = require('../../knexfile.js');

// Configure knex with the correct environment configuration
var env = process.env.NODE_ENV || 'development';
var db = require('knex')(config[env]);

db.migrate.latest(config[env]);
// Export the db object, which will be able to make database connections
// module.exports = db;

// Function for your testing suite
db.deleteEverything = function () {
  if (env !== 'test') { return bPromise.reject(); }

  return db('meals').delete();
    // .then(function() {
    //   return db('entries').delete();
    // });
    // .then(function() {
    //   return db('users').delete();
    // });
};

//Depends on Passport behavior 

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function(user) {
//       user.increments('id').primary();
//       user.string('username', 255);
//       user.string('password', 255);
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = db;
