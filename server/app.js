// Loads environment variables from .env file
require('dotenv').load();
// Sets Environment variable to 'dev' if none is provided
var env = process.env.NODE_ENV || 'dev';
var express = require('express');
var routes  = express.Router();

// Passport Requirements
var passport     = require('passport');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var knex = require('./lib/db.js');
var KnexSessionStore = require('connect-session-knex')(session);

if (process.env.NODE_ENV !== 'test') {
  // If not in 'test' environment - create and run a real server
  var app = express();
  var store = new KnexSessionStore({
    knex: knex,
    tablename: 'sessions'
  });

  // knex('sessions').select('*').then(function(rows) {
  //   console.log('sessions:', rows);
  // });

  // pass Passport into configuration that contains Strategies
  require('./config/passport')(passport);

  app.use(morgan('dev'));
  app.use(cookieParser());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());
  app.use(session({
    secret: 'thisisasecret',
    store: store,
    resave: false,
    saveUninitialized: false
  }));


  // these two lines need to be declared before the router
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function(req, res, next) {
    if (req.isAuthenticated()) {
      res.cookie('isLoggedIn', true);
    }
    next();
  });

  // Routes pass in app and passport for configuration in routes
  var routes = require('./routes.js')(app, passport);

  // Server Starts
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  routes.get('/api/tags-example', function(req, res) {
    res.send(['node', 'express', 'angular']);
  });

  module.exports = routes;
}
