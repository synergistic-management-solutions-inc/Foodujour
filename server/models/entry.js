var db = require('../lib/db');

var Entry = {};

Entry.create = function (attrs) {
  return db('entries').insert(attrs).returning('id')
    .then(function(rows) {
      var newEntry = {
        name: attrs.name,
        rating: attrs.rating,
        notes: attr.notes,
        image: attr.image,
        meal_id: attr.mealId,
        id: rows[0]
      };
      return newEntry;
    });
};

Entry.all = function () {
  return db('entries').select('*');
};

module.exports = Entry;
