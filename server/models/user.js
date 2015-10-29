var db     = require('../lib/db');
var bPromise = require('bluebird');
var bcrypt = bPromise.promisifyAll(require('bcrypt-nodejs'));

var User = {};

User.all = function () {
  return db('users').select('*');
};

User.findByUsername = function(username, cb) {
  return db('users').select('*').where({name: username}).limit(1)
    .then(function(rows) {
      if (!rows.length) { /* reject */ }
      if (!cb) { return rows[0]; }
      return cb(null, rows[0]);
    })
    .catch(function(err) {
      throw err;
    });
};

User.findByGoogleID = function(googleID, cb) {
  return db('users').select('*').where({google_id: googleID}).limit(1)
    .then(function(rows) {
      if (!rows.length) { /* reject */ }
      if (!cb) { return rows[0]; }
      return cb(null, rows[0]);
    })
    .catch(function(err) {
      throw err;
    });
};

User.findByFacebookID = function(facebookID, cb) {
  return db('users').select('*').where({fb_id: facebookID}).limit(1)
    .then(function(rows) {
      if (!rows.length) { /* reject */ }
      if (!cb) { return rows[0]; }
      return cb(null, rows[0]);
    })
    .catch(function(err) {
      throw err;
    });
};

User.signUp = function (attrs) {
  return db('users').insert(attrs).returning('id')
    .then(function(rows) {
      var newUser = {
        id: rows[0],
        name: attrs.name,
        passHash: attrs.passHash
      };
      return newUser;
    });
};

User.generateHash = function(password) {
  // replace this with aSync
  return bcrypt.genSaltAsync(8)
    .then(function(salt) {
      return bcrypt.hashAsync(password, salt, null);
    });
  // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.validPassword = function(password) {
  return bcrypt.compareAsync(password, this.passHash);
  // return bcrypt.compareSync(password, this.passHash);
};

module.exports = User;
