var User = require('../server/models/user');

exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function() {
      return knex('users').insert([
        {
          name: 'asdf', passHash: User.generateHash('asdf')
        },
        {
          name: 'nanner12', passHash: User.generateHash('nanner12')
        },
        {
          name: 'james', passHash: User.generateHash('james')
        },
        {
          name: 'kevin', passHash: User.generateHash('kevin')
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
