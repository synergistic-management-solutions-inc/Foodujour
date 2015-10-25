require('dotenv').load();
var config = require('./config');
var browserify = require('browserify-middleware');
var ngAnnotate = require('browserify-ngannotate');
var express = require('express');
var Path = require('path');

//Routes
var routes = express.Router();
var mealRouter = require('./apis/meals-api');
var entryRouter = require('./apis/entries-api');
var userRouter = require('./apis/users-api');
//route to your index.html
var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

//Requires for passport
var session = require('express-session');
var passport = require('passport');
var user = require('./models/user');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV || 'dev';

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

// Example endpoint (also tested in test/server/index_test.js)
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

  // We're in development or production mode;
  // create and run a real server.
  var app = express();

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() );

  //Passport Uses
  app.use(passport.initialize());
  app.use(passport.session());

  // Mount routers
  app.use('/meals', mealRouter);
  app.use('/entries', entryRouter);
  app.use('/users', userRouter);
  app.use('/', routes);

  // ************* PASSPORT CODE STARTS *****************
  // passport.serializeUser(function(user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(function(user, done) {
  //   done(null, user);
  // });

//Google Strategy
  passport.use(new GoogleStrategy({
      clientID:     config.GoogleAuth.clientId,
      clientSecret: config.GoogleAuth.clientSecret,
      callbackURL: config.GoogleAuth.callbackURL,
      passReqToCallback   : true
       //NOTE :
      //Carefull ! and avoid usage of Private IP, otherwise you will get the
      //device_id device_name issue for Private IP during authentication
      //The workaround is to set up thru the google cloud console a fully qualified
      //domain name such as http://mydomain:3000/
      //then edit your /etc/hosts local file to point on your private IP.
      //Also both sign-in button + callbackURL has to be share the same url,
      //otherwise two cookies will be created and lead to lost your session
      //if you use it.
    },
    function(request, accessToken, refreshToken, profile, done) {

      process.nextTick(function () {
        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        console.log('google profile: ', profile);

        return done(null, profile);
      });
    }
  ));

//Facebook Strategy

  passport.use(new FacebookStrategy({
      clientID:     config.FacebookAuth.clientId,
      clientSecret: config.FacebookAuth.clientSecret,
      callbackURL:  config.FacebookAuth.callbackURL,
      enableProof: false
    },
  function(accessToken, refreshToken, profile, done) {

      process.nextTick(function () {
        console.log('facebook profile: ', profile);
        return done(null, profile);
      });
    }
  ));

// Local Strategy
passport.use(new LocalStrategy(
  function(username, password, cb) {
    user.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    console.log('i am serializing')
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    console.log('i am deserializing')
    user.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  // ************* PASSPORT CODE ENDS *****************

  // Server Starts
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
