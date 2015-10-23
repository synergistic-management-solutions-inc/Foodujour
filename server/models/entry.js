var db = require('../lib/db');

var Entry = {};

Entry.create = function (attrs) {
  return db('entries').insert(attrs).returning('id')
    .then(function(rows) {
      var newEntry = {
        id: rows[0],
        meal_id: attrs.meal_id,
        name: attrs.name,
        rating: attrs.rating,
        notes: attr.notes,
        image: attr.image
      };
      return newEntry;
    });
};

Entry.all = function () {
  return db('entries').select('*');
};
