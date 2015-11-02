// Meals API
var express = require('express');
var MealsAPI = express.Router();

// Models
var Meal = require('../models/meal');
var Entry = require('../models/entry');
var User = require('../models/user');

// GET /meals/all Returns all meals for every user for testing
MealsAPI.get('/all', function(req, res) {
  console.log('req user?', req.session.passport);
  Meal.all()
    .then(function(meals) {
      res.send(meals);
    })
    .catch(function(err) {
      console.log('Meals GET /meals/all Error-' + err);
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
  var hasEntries = Array.isArray(entries) && entries.length > 0;
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
      meal = newMeal;
      if (hasEntries) {
        // if entries isn't empty return meal for further promises
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
      if (hasEntries) {
        Promise.all(entries.map(function(entry) {
          // map the entries array, to return an array of Entry.create promises
          entry.meal_id = meal.id;
          entry.user_id = meal.user_id;
          return Entry.create(entry);
        }))
        .then(function(results) {
          // results are the array of entries, add them as meal.entries
          meal.entries = results;
          // respond with the meal with added entries
          res.status(201).send(meal);
        });
      }
    })
    .catch(function(err) {
      console.log('Meals POST /meals Error-' + err);
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
          } else if (meal && user.id !== meal.user_id) {
            res.status(403).send({error: 'User doesn\'t own this meal.'});
          } else {
            res.status(404).send({error: 'No Meal With This ID'});
          }
        });
    })
    .catch(function(err) {
      console.log('Meals GET /meals/:id Error-' + err);
      return res.status(400).send();
    });
});

// PUT /meals/:id attempts to update meal of id if belonging to logged in user
// requires all attributes a meal expects
MealsAPI.put('/:id', function(req, res) {
  // stores entries in separate array to Promise.all later
  var entries = req.body.entries;
  // deletes req.body entries for no conflicts on updating meal
  delete req.body.entries;

  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      // finds user by current logged in user, and checks to make sure it
      // matches user_id on the request
      req.body.user_id = req.body.user_id || user.id;
      if (req.body.user_id !== user.id) {
        // user_id doesn't match logged in user, send back 403
        res.status(403).send({ error: 'User definitely is doing some fishy things' });
        return;
      }
      Meal.updateOne(req.body)
        .then(function(meal) {
          // call updateOne that updates at id and where user id matches logged in
          // user
          if (meal && user.id === meal.user_id) {
            // if there are entries in the entries array iterate over and make
            // sure to update each entry
            if (Array.isArray(entries) && entries.length > 0) {
              Promise.all(entries.map(function(entry) {
                // map the entries array, to return an array of Entry.create promises
                return Entry.updateOne(entry);
              }))
              .then(function(updatedEntries) {
                // get entries from database and append to meal so response back
                // has up to date entries list with updated meal
                Entry.findMealEntries(meal.id)
                  .then(function(entries) {
                    meal.entries = entries;
                    res.send(meal);
                  });
              });
            } else {
              // there are no entries to worry about to update so just get
              // meals entries to append on response
              Entry.findMealEntries(meal.id)
                .then(function(entries) {
                  meal.entries = entries;
                  res.send(meal);
                });
            }
          } else if (user.id !== meal.user_id) {
            // send error user doesn't match owner of meal
            res.status(403).send({ error: 'User doesn\'t own this meal.' });
          } else {
            // some other error
            res.status(400).send();
          }
        });
    });
});

// GET /delete/:id deletes meal of id if owned by logged in user
// TODO needs to be changed to a delete method, temporary for testing
MealsAPI.get('/delete/:id', function(req, res) {
  var mealid = req.params.id;
  // gets currently logged in user
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      Meal.findOne(mealid)
      .then(function(meal) {
        // if user.id doesn't match user id on attached meal send error
        if (meal.user_id !== user.id) {
          res.status(403).send({ error: 'User definitely is doing some fishy things' });
          return;
        }
        // call destroy on the mealId
        Meal.destroyOne(meal.id)
        .then(function() {
          // deletes entries associated with mealId deleted
          return Entry.deleteByMeal(meal.id);
        })
        .then(function() {
          // sends success message if it reaches here
          res.send({ message: 'successfully deleted meals and entries' });
        });
      });
    });
});

module.exports = MealsAPI;
