var express = require('express');
var Meal = require('../models/meal');
var Entry = require('../models/entry');
var User = require('../models/user');
var MealsAPI = express.Router();

// ******************* //
// all meals
// ******************* //
MealsAPI.get('/all', function(req, res) {
  Meal.all()
    .then(function(meals) {
      res.send(meals);
    })
    .catch(function(err) {
      console.log('Meals GET /meals/all Error-', err);
      res.status(400).send();
    });
});

MealsAPI.get('/', function(req, res) {
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      console.log('user', user);
      Meal.findByUser(user.id)
        .then(function(meals) {
          res.send(meals);
        });
    });
});

MealsAPI.post('/', function(req, res) {
  var entries = req.body.entries;
  delete req.body.entries;
  var meal = req.body;

  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      meal.user_id = user.id;
      return meal;
    })
    .then(function(meal) {
      return Meal.create(meal);
    })
    .then(function(newMeal) {
      if (Array.isArray(entries) && entries.length > 0) {
        return newMeal;
      } else {
        res.status(201).send(newMeal);
      }
    })
    .then(function(meal) {
      console.log('Creating entries');
      entries.forEach(function(entry) {
        entry.meal_id = meal.id;
        Entry.create(entry);
      });
    })
    .catch(function(err) {
      console.log('Meals POST /meals Error-', err);
      res.status(400).send();
    });
});

// ******************* //
// singular meals
// ******************* //
MealsAPI.get('/:id', function(req, res) {
  var mealId = req.params.id;

  Meal.findOne(mealId)
  .then(function(meal) {
    if (meal) {
      Entry.findMealEntries(meal.id)
      .then(function(entries) {
        meal.entries = entries;
        res.send(meal);
      });
    } else {
      res.status(404).send({error: 'No Meal With This ID'});
    }
  })
  .catch(function(err) {
    console.log('Meals GET /meals/:id Error-', err);
    res.status(400).send();
  });
});

MealsAPI.put('/:id', function(req, res) {
  Meal.updateOne(req.body)
    .then(function(meal) {
      if (meal) {
        Entry.findMealEntries(meal.id)
        .then(function(entries) {
          meal.entries = entries;
          res.send(meal);
        });
      } else {
        res.status(400).send();
      }
    });
});

// MealsAPI.delete('/:id', function(req, res) {
//   Meal.destroyOne(req.body)
//     .then()
//   Entry.deleteByMeal();
// });

module.exports = MealsAPI;
