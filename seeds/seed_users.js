var User = require('../server/models/user');

exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function() {
      return Promise.all([
        User.generateHash('asdf'),
        User.generateHash('nanner12'),
        User.generateHash('james'),
        User.generateHash('kevin')
      ]);
    })
    .then(function(passwords) {
      return knex('users').insert([
        {
          name: 'asdf', passHash: passwords[0]
        },
        {
          name: 'nanner12', passHash: passwords[1]
        },
        {
          name: 'james', passHash: passwords[2]
        },
        {
          name: 'kevin', passHash: passwords[3]
        }
      ]);
    });
};

// user.increments('id').primary();
// user.string('oauthID');
// user.string('passHash');
// user.string('name', 255).notNullable();
// user.string('email', 255);
// user.string('profile_pic', 255);
