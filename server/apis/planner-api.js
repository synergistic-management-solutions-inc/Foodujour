// Planner API
var express = require('express');
var PlannerAPI = express.Router();

// Models
var Planner = require('../models/planner');
var User = require('../models/user');

// GET /planner/all Returns all meals for every user for testing
PlannerAPI.get('/all', function(req, res) {
  console.log('req user?', req.session.passport);
  Planner.all()
    .then(function(meals) {
      res.send(meals);
    })
    .catch(function(err) {
      console.log('Planner GET /planner/all Error-' + err);
      res.status(400).send();
    });
});

// GET /planner Returns meals for currently logged in user
PlannerAPI.get('/', function(req, res) {
  // finds user by username logged in to session.passport
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      // finds meals by user, using users id
      Planner.findByUser(user.id)
        .then(function(meals) {
          // sends back array of all meals matching userid
          res.send(meals);
        });
    });
});

// POST /meals accepts meal with entries to create new meal
PlannerAPI.post('/', function(req, res) {
  var meal = req.body;
  console.log('request body:', meal)

  // gets currently logged in user from session.passport
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      // sets new meals user_id to logged in users id
      meal.user_id = user.id;
      return meal;
    })
    .then(function(meal) {
      // create meal with meal input added user id
      return Planner.create(meal);
    })
    .then(function(newMeal) {
      meal = newMeal;

      // send back a 201 with created meal 
      res.status(201).send(meal);
    })
    .catch(function(err) {
      console.log('Planner POST /meals Error-' + err);
      res.status(400).send();
    });
});

// GET /meals/:id returns a meal with matching id
PlannerAPI.get('/:id', function(req, res) {
  var mealId = req.params.id;

  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      Planner.findOne(mealId)
        .then(function(meal) {
          if (meal && user.id === meal.user_id) {
            res.send(meal);
          } else if (meal && user.id !== meal.user_id) {
            res.status(403).send({error: 'User doesn\'t own this meal.'});
          } else {
            res.status(404).send({error: 'No meal With This ID'});
          }
        });
    })
    .catch(function(err) {
      console.log('Planners GET /meals/:id Error-' + err);
      return res.status(400).send();
    });
});

// PUT /meals/:id attempts to update meal of id if belonging to logged in user
// requires all attributes a meal expects
PlannerAPI.put('/:id', function(req, res) {

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
      Planner.updateOne(req.body)
        .then(function(meal) {
          // call updateOne that updates at id and where user id matches logged in
          // user
          if (meal && user.id === meal.user_id) {
            res.send(meal);
          }
        })        
    });
});

// GET /delete/:id deletes meal of id if owned by logged in user
// TODO needs to be changed to a delete method, temporary for testing
PlannerAPI.get('/delete/:id', function(req, res) {
  var mealid = req.params.id;
  // gets currently logged in user
  User.findByUsername(req.session.passport.user)
    .then(function(user) {
      Plannner.findOne(mealid)
      .then(function(meal) {
        // if user.id doesn't match user id on attached meal send error
        if (meal.user_id !== user.id) {
          res.status(403).send({ error: 'User definitely is doing some fishy things' });
          return;
        }
        // call destroy on the mealId
        Planner.destroyOne(meal.id)
        .then(function() {
          // sends success message if it reaches here
          res.send({ message: 'successfully deleted meals and entries' });
        });
      });
    });
});

module.exports = PlannerAPI;
