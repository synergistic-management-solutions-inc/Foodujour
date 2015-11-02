var db = require('../lib/db');

var Entry = {};

// Finds all entries
Entry.all = function () {
  return db('entries').select('*');
};

// Finds all entries associated with a user by user id
Entry.findByUser = function(userId) {
  return db('entries').select('*').where({user_id: userId});
};

// Finds all entries associated with one meal, by mealid
Entry.findMealEntries = function(mealId) {
  return db('entries').select('*').where({ meal_id: mealId })
    .then(function(rows) {
      return rows;
    });
};

// singular entries

// Expecting: user_id, meal_id, name, rating, notes, image
// Creates a single entry
Entry.create = function (attrs) {
  return db('entries').insert(attrs).returning('id')
    .then(function(rows) {
      var newEntry = {
        id: rows[0],
        user_id: attrs.user_id,
        meal_id: attrs.meal_id,
        name: attrs.name,
        rating: attrs.rating,
        notes: attrs.notes,
        image: attrs.image
      };
      return newEntry;
    });
};

// Finds one entry based on it's id
Entry.findOne = function(id) {
  return db('entries').select('*').where({id: id}).limit(1)
  .then(function(rows) {
    if (!rows.length) { /* reject */ }
    return rows[0];
  });
};

// Updates an entry with id expects full field entries to update
Entry.updateOne = function(attrs) {
  if (!attrs.id) { /* reject */ }

  return db('entries').update(attrs).where({ id: attrs.id })
  .then(function(updatedCount) {
    if (!updatedCount) { /* reject */ }
    return attrs;
  });
};

// Destroys and entry by id
Entry.destroyOne = function(id) {
  return db('entries').where({ id: id }).del();
};

// Deletes all entries associated with a meal
Entry.deleteByMeal = function(mealId) {
  return db('entries').where({ meal_id: mealId }).del();
};

module.exports = Entry;
