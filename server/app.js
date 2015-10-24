require('dotenv').load();
var config = require('./config');
var browserify = require('browserify-middleware');
var ngAnnotate = require('browserify-ngannotate');
var express = require('express');
var Path = require('path');

var routes = express.Router();
var mealRouter = require('./apis/meals-api');
var entryRouter = require('./apis/entries-api');
var UsersRouter = require('./apis/users-api');

//Requires for passport

var passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;




var env = process.env.NODE_ENV || 'dev';

//route to your index.html
var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

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

// Serve our app. Use ngAnnotate to transform code so that
// ng injections dont get broken when minified
routes.get('/js/app-bundle.js', browserify('./client/app.js', {
  transform: ngAnnotate
}));
routes.get('/js/angular.js', browserify(sharedAngular));
routes.get('/js/jquery.js', browserify('./node_modules/jquery/dist/jquery.js'));

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



  //*****************PASSPORT USES START

  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

 

  passport.use(new GoogleStrategy({
      clientID:     config.GoogleAuth.clientId,
      clientSecret: config.GoogleAuth.clientSecret,
      //NOTE :
      //Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
      //The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/ 
      //then edit your /etc/hosts local file to point on your private IP. 
      //Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
      //if you use it.
      callbackURL: config.GoogleAuth.callbackUrl,
      passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
      console.log('passport.use Google');
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        console.log('Saving the user in the daatabase');
        return done(null, profile);
      });
    }
  ));
  //*****************PASSPORT USES END

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
