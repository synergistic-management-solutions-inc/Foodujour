var express = require('express');
var Meal = require('../models/meal');
var Entry = require('../models/entry');
var MealsAPI = express.Router();

// ******************* //
// all meals
// ******************* //
MealsAPI.get('/', function(req, res) {
  Meal.all()
    .then(function(meals) {
      res.send(meals);
    })
    .catch(function(err) {
      console.log('Meals GET meals/ Error-', err);
      res.status(400).send();
    });
});

MealsAPI.post('/', function(req, res) {
  // Need to validate user before allowing post
  Meal.create(req.body)
    .then(function(newMeal) {
      res.status(201).send(newMeal);
    })
    .catch(function(err) {
      console.log('Meals POST meals/ Error-', err);
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
    console.log('Meals GET meals/:id Error-', err);
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

module.exports = MealsAPI;
