var db = require('../lib/db');

var Entry = {};

Entry.all = function () {
  return db('entries').select('*');
};

Entry.findMealEntries = function(mealId) {
  return db('entries').select('*').where({ meal_id: mealId })
    .then(function(rows) {
      return rows;
    });
};

// ******************* //
// singular entries
// ******************* //
Entry.create = function (attrs) {
  return db('entries').insert(attrs).returning('id')
    .then(function(rows) {
      var newEntry = {
        id: rows[0],
        meal_id: attrs.meal_id,
        name: attrs.name,
        rating: attrs.rating,
        notes: attrs.notes,
        image: attrs.image
      };
      return newEntry;
    });
};

Entry.findOne = function(id) {
  return db('entries').select('*').where({id: id}).limit(1)
  .then(function(rows) {
    if (!rows.length) { /* reject */ }
    return rows[0];
  });
};

Entry.updateOne = function(attrs) {
  if (!attrs.id) { /* reject */ }

  return db('entries').update(attrs).where({ id: attrs.id })
  .then(function(updatedCount) {
    if (!updatedCount) { /* reject */ }
    return attrs;
  });
};

Entry.destroyOne = function(id) {
  return db('entries').where({ id: id }).delete();
};


module.exports = Entry;




