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


//Table schema for Meals that will contain entries
db.knex.schema.hasTable('meals').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('meals', function (meal) {
      meal.increments('id').primary();
      meal.string('user', 255);
      meal.string('name', 255);
      meal.string('location', 255);
      meal.integer('date')
      meal.integer('rating');
      meal.string('notes');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// Table schema for entries 'sub-table of Meals'
db.knex.schema.hasTable('entries').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('entries', function (ent) {
      ent.increments('id').primary();
      ent.string('name');
      ent.string('notes');
      ent.string('image');
      ent.integer('meal_id');
      ent.integer('rating');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

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