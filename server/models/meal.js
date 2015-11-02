var db = require('../lib/db');

var Meal = {};

// Selects all meals
Meal.all = function() {
  return db('meals').select('*');
};

// Finds all meals associated with user, by user_id
Meal.findByUser = function(userId) {
  return db('meals').select('*').where({user_id: userId});
};

// singular meals
// Creates a meal, expecting: user_id, date, name, location, rating, notes,
// image
Meal.create = function(attrs) {
  return db('meals').insert(attrs).returning('id')
    .then(function(rows) {
      var newMeal = {
        id: rows[0],
        user_id: attrs.user_id,
        date: attrs.date,
        name: attrs.name,
        location: attrs.location,
        rating: attrs.rating,
        notes: attrs.notes,
        image: attrs.image
      };
      return newMeal;
    });
};

// find a meal by certain id
Meal.findOne = function(id) {
  return db('meals').select('*').where({id: id}).limit(1)
    .then(function(rows) {
      if (!rows.length) { /* reject */ }
      return rows[0];
    });
};

// updates meal, requires: id, user_id, and all additional properties
Meal.updateOne = function(attrs) {
  if (!attrs.id) { /* reject */return; }

  return db('meals').update(attrs).where({ id: attrs.id, user_id: attrs.user_id })
    .then(function(updatedCount) {
      if (!updatedCount) { /* reject */ }
      return attrs;
    });
};

// deletes a meal by id
Meal.destroyOne = function(id) {
  return db('meals').where({ id: id }).delete();
};

module.exports = Meal;
