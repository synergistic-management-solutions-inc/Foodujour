exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('google_id');
    table.string('google_token');
    table.string('google_name', 255);
    table.string('google_email', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('google_id');
    table.dropColumn('google_token');
    table.dropColumn('google_name');
    table.dropColumn('google_email');
  });
};
