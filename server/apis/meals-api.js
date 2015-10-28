// Meals API
var express = require('express');
var MealsAPI = express.Router();
// Models
var Meal = require('../models/meal');
var Entry = require('../models/entry');
var User = require('../models/user');

// GET /meals/all Returns all meals for every user
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

// GET /meals Returns meals for currently logged in user (no entries)
MealsAPI.get('/', function(req, res) {
  // finds user by username logged in to session.passport
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      // finds meals by user, using users id
      Meal.findByUser(user.id)
        .then(function(meals) {
          // sends back array of all meals matching userid
          res.send(meals);
        });
    });
});

// POST /meals accepts meal with entries to create new meal
MealsAPI.post('/', function(req, res) {
  // pulls entries array from request
  var entries = req.body.entries;
  delete req.body.entries;
  var meal = req.body;

  // gets currently logged in user from session.passport
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      // sets new meals user_id to logged in users id
      meal.user_id = user.id;
      return meal;
    })
    .then(function(meal) {
      // create meal with meal input without entries and added user id
      return Meal.create(meal);
    })
    .then(function(newMeal) {
      if (Array.isArray(entries) && entries.length > 0) {
        // if entries isn't empty return meal for further promises
        meal = newMeal;
        return meal;
      } else {
        // entries is either non existent or an empty array, add it to meal
        meal.entries = [];
        // send back a 201 with created meal (don't have to add entries first)
        res.status(201).send(meal);
      }
    })
    .then(function(meal) {
      // create entries with appropriate meal_id
      // Promise.all takes an array of promises, once all are fulfilled it
      // returns an array of values of the resolved promises
      Promise.all(entries.map(function(entry) {
        // map the entries array, to return an array of Entry.create promises
        entry.meal_id = meal.id;
        return Entry.create(entry);
      }))
      .then(function(results) {
        // results are the array of entries, add them as meal.entries
        meal.entries = results;
        // respond with the meal with added entries
        res.status(201).send(meal);
      });
    })
    .catch(function(err) {
      console.log('Meals POST /meals Error-', err);
      res.status(400).send();
    });
});

// GET /meals/:id returns a meal with matching id
MealsAPI.get('/:id', function(req, res) {
  var mealId = req.params.id;

  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      Meal.findOne(mealId)
        .then(function(meal) {
          if (meal && user.id === meal.user_id) {
            Entry.findMealEntries(meal.id)
            .then(function(entries) {
              meal.entries = entries;
              res.send(meal);
            });
          } else if (user.id !== meal.user_id) {
            res.status(403).send({error: 'User doesn\'t own this meal.'});
          } else {
            res.status(404).send({error: 'No Meal With This ID'});
          }
        });
    })
    .catch(function(err) {
      console.log('Meals GET /meals/:id Error-', err);
      res.status(400).send();
    });
});

MealsAPI.put('/:id', function(req, res) {
  var entries = req.body.entries;
  delete req.body.entries;

  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      Meal.updateOne(req.body)
        .then(function(meal) {
          if (Array.isArray(entries) && entries.length > 0) {
            Promise.all(entries.map(function(entry) {
                    // map the entries array, to return an array of Entry.create promises
                    return Entry.updateOne(entry);
                  }));
          }
          if (meal && user.id === meal.user_id) {
            Entry.findMealEntries(meal.id)
            .then(function(entries) {
              meal.entries = entries;
              res.send(meal);
            });
          } else if (user.id !== meal.user_id) {
            res.status(403).send({error: 'User doesn\'t own this meal.'});
          } else {
            res.status(400).send();
          }
        });
    });
});

// MealsAPI.delete('/:id', function(req, res) {
//   Meal.destroyOne(req.body)
//     .then()
//   Entry.deleteByMeal();
// });

module.exports = MealsAPI;
