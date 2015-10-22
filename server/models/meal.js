var db = require('../lib/db');

var Meal = {};

Meal.create = function (attrs) {
  return db('meals').insert(attrs).returning('id')
    .then(function(rows) {
      var newMeal = {
        name: attrs.name,
        location: attrs.location,
        id: rows[0]
      };
      return newMeal;
    });
};

Meal.all = function () {
  return db('meals').select('*');
};
