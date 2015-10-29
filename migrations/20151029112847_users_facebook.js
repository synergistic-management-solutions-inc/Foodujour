exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('fb_id');
    table.string('fb_name', 255);
    table.string('fb_email', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('fb_id');
    table.dropColumn('fb_name');
    table.dropColumn('fb_email');
  });
};
