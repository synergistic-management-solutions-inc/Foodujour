var db = require('../lib/db');

var Planner = {};

// Selects all meals
Planner.all = function() {
  return db('planner').select('*');
};

// Finds all meals associated with user, by user_id
Planner.findByUser = function(userId) {
  return db('planne').select('*').where({user_id: userId});
};

// singular meals
// Creates a meal, expecting: user_id, date, name, location, rating, notes,
// image
Planner.create = function(attrs) {
  return db('planner').insert(attrs).returning('id')
    .then(function(rows) {
      var newMeal = {
        id: rows[0],
        user_id: attrs.user_id,
        date: attrs.date,
        name: attrs.name,
        type: attrs.type,
        notes: attrs.notes,
      };
      return newMeal;
    });
};

// find a meal by certain id
Planner.findOne = function(id) {
  return db('planner').select('*').where({id: id}).limit(1)
    .then(function(rows) {
      if (!rows.length) { /* reject */ }
      return rows[0];
    });
};

// updates meal, requires: id, user_id, and all additional properties
Planner.updateOne = function(attrs) {
  if (!attrs.id) { /* reject */return; }

  return db('planner').update(attrs).where({ id: attrs.id, user_id: attrs.user_id })
    .then(function(updatedCount) {
      if (!updatedCount) { /* reject */ }
      return attrs;
    });
};

// deletes a meal by id
Planner.destroyOne = function(id) {
  return db('planner').where({ id: id }).delete();
};

module.exports = Planner;
