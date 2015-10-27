exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (user) {
    user.increments('id').primary();
    user.string('oauthID');
    user.string('passHash');
    user.string('name', 255).notNullable();
    user.string('email', 255);
    user.string('profile_pic', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
