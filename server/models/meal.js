var db = require('../lib/db');

var Meal = {};

Meal.all = function () {
  return db('meals').select('*');
};

// ******************* //
// singular meals
// ******************* //
Meal.create = function (attrs) {
  return db('meals').insert(attrs).returning('id')
    .then(function(rows) {
      var newMeal = {
        name: attrs.name,
        location: attrs.location,
        rating: attrs.rating,
        notes: attrs.notes,
        id: rows[0]
      };
      return newMeal;
    });
};

Meal.findOne = function(id) {
  return db('meals').select('*').where({id: id}).limit(1)
    .then(function(rows) {
      if (!rows.length) { /* reject */ }
      return rows[0];
    });
};

Meal.updateOne = function(attrs) {
  if (!attrs.id) { /* reject */ }

  return db('meals').update(attrs).where({ id: attrs.id })
    .then(function(updatedCount) {
      if (!updatedCount) { /* reject */ }
      return attrs;
    });
};

Meal.destroyOne = function(id) {
  return db('meals').where({ id: id }).delete();
};

module.exports = Meal;
