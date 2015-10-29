var express     = require('express');
var Path        = require('path');

// Routers
var routes      = express.Router();
var mealRouter  = require('./apis/meals-api');
var entryRouter = require('./apis/entries-api');
var userRouter  = require('./apis/users-api');
var assetFolder = Path.resolve(__dirname, '../client/');

// Angular
var browserify  = require('browserify-middleware');
var ngAnnotate  = require('browserify-ngannotate');
var sharedAngular = [
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-mocks',
  'angular-resource',
  'angular-sanitize',
  'angular-touch',
  'angular-ui-router',
  './node_modules/angular-materialize/src/angular-materialize'
];

// App and passport passed in from app.js
module.exports = function(app, passport) {
  // Serve our app. Use ngAnnotate to transform code so that
  // ng injections dont get broken when minified
  routes.get('/js/app-bundle.js', browserify('./client/app.js', {
    transform: ngAnnotate
  }));
  routes.get('/js/angular.js', browserify(sharedAngular));
  routes.get('/js/jquery.js', browserify('./node_modules/jquery/dist/jquery.js'));

  // Example endpoint (also tested in test/server/index_test.js)
  routes.get('/api/tags-example', function(req, res) {
    res.send(['node', 'express', 'angular']);
  });

  app.use('/api/meals', isLoggedIn, mealRouter);
  app.use('/api/entries', isLoggedIn, entryRouter);
  // do not put isLoggedIn check here
  app.use('/api/users', userRouter);
  app.use('/', routes);

  // Serve static files last, so only will do this if it gets to last route
  routes.use(express.static(assetFolder));
  // Catchall route
  routes.get('/*', function(req, res) {
    //route to your index.html
    res.sendFile(assetFolder + '/index.html');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      res.header('isAuthenticated', 'true');
      return next();
    }
    //change when angular login setup
    res.status(401).json({isAuthenticated: false, error: true});
  }
};
