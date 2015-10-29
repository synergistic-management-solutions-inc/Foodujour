exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('oauthID');
    table.dropColumn('profile_pic');
    table.dropColumn('google_token');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('oauthID');
    table.string('profile_pic');
    table.string('google_token');
  });
};
