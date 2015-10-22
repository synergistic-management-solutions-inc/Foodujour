var express = require('express');
var MealsAPI = express.Router();

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

module.exports = MealsAPI;
