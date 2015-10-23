var express = require('express');
var Meal = require('../models/meal');
var MealsAPI = express.Router();

// ******************* //
// all meals
// ******************* //
MealsAPI.get('/', function(req, res) {
  Meal.all()
    .then(function(meals) {
      res.send(meals);
    });
});

MealsAPI.post('/', function(req, res) {
  Meal.create(req.body)
    .then(function(newMeal) {
      res.status(201).send(newMeal);
    });
});

// ******************* //
// singular meals
// ******************* //
MealsAPI.get('/:id', function(req, res) {
  var mealId = req.params.id;

  Meal.findOne(mealId)
  .then(function(meal) {
    res.send(meal);
  });
});

module.exports = MealsAPI;
