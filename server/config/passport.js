var config = require('./config');
var User   = require('../models/user');
var LocalStrategy      = require('passport-local').Strategy;
var GoogleStrategy     = require('passport-google-oauth').OAuth2Strategy;
// var FacebookStrategy   = require('passport-facebook').Strategy;


module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.name);
  });

  passport.deserializeUser(function(user, done) {
    User.findByUsername(user, function(err, user) {
      done(err, user);
    });
  });

  // **************************
  // Local Strategy -- SIGN UP
  // **************************
  passport.use('local-signup', new LocalStrategy(
    function(username, password, done) {
      process.nextTick(function() {
        User.findByUsername(username, function(err, user) {
          if (err) {
            return done(err);
          }

          if (user) {
            return done(null, false);
          }
          User.signUp({
            name: username,
            passHash: User.generateHash(password)
          })
            .then(function(newUser) {
              return done(null, newUser);
            })
            .catch(function(err) {
              throw err;
            });
        });
      });
    })
  );

  // **************************
  // Local Strategy -- LOG IN
  // **************************
  passport.use('local-login', new LocalStrategy(
    function(username, password, done) {
      User.findByUsername(username, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }

        if (!User.validPassword.call(user, password)) {
          return done(null, false);
        }

        return done(null, user);
      });
    })
  );

  // ************* PASSPORT STRATEGY STARTS *****************
  // // Google Strategy
  // passport.use(new GoogleStrategy({
  //     clientID:     config.GoogleAuth.clientId,
  //     clientSecret: config.GoogleAuth.clientSecret,
  //     callbackURL: config.GoogleAuth.callbackURL,
  //     passReqToCallback   : true
  //      //NOTE :
  //     //Carefull ! and avoid usage of Private IP, otherwise you will get the
  //     //device_id device_name issue for Private IP during authentication
  //     //The workaround is to set up thru the google cloud console a fully qualified
  //     //domain name such as http://mydomain:3000/
  //     //then edit your /etc/hosts local file to point on your private IP.
  //     //Also both sign-in button + callbackURL has to be share the same url,
  //     //otherwise two cookies will be created and lead to lost your session
  //     //if you use it.
  //   },
  //   function(request, accessToken, refreshToken, profile, done) {
  //
  //     process.nextTick(function () {
  //       // To keep the example simple, the user's Google profile is returned to
  //       // represent the logged-in user.  In a typical application, you would want
  //       // to associate the Google account with a user record in your database,
  //       // and return that user instead.
  //       console.log('google profile: ', profile);
  //
  //       return done(null, profile);
  //     });
  //   }
  // ));
  //
  // // //Facebook Strategy
  // passport.use(new FacebookStrategy({
  //     clientID:     config.FacebookAuth.clientId,
  //     clientSecret: config.FacebookAuth.clientSecret,
  //     callbackURL:  config.FacebookAuth.callbackURL,
  //     enableProof: false
  //   },
  // function(accessToken, refreshToken, profile, done) {
  //
  //     process.nextTick(function () {
  //       console.log('facebook profile: ', profile);
  //       return done(null, profile);
  //     });
  //   }
  // ));

  // ************* PASSPORT STRATEGY ENDS *****************
};
