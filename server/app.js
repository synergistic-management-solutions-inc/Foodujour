require('dotenv').load();
var browserify = require('browserify-middleware');
var express = require('express');
var Path = require('path');

var routes = express.Router();
var mealRouter = require('./apis/meals-api');
var entryRouter = require('./apis/entries-api');
var UsersRouter = require('./apis/users-api');

//Requires for passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var env = process.env.NODE_ENV || 'dev';

//route to your index.html
var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

routes.get('/js/app-bundle.js', browserify('./client/app.js'));
routes.get('/js/angular.js', browserify([
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-mocks',
  'angular-resource',
  'angular-sanitize',
  'angular-touch',
  'angular-ui-router',
  './node_modules/angular-materialize/src/angular-materialize'
]));

//
// Example endpoint (also tested in test/server/index_test.js)
//
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'angular']);
});

if (process.env.NODE_ENV !== 'test') {

  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  routes.get('/*', function(req, res) {
    res.sendFile( assetFolder + '/index.html' );
  });

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express();

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() );

  // Mount our main router
  app.use('/meals', mealRouter);
  app.use('/entries', entryRouter);
  app.use('/users', UsersRouter);
  app.use('/', routes);


  //uses of passport

  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
      // Auth Check Logic
    });
  }));

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
