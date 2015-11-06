exports.up = function(knex, Promise) {
  return knex.schema.createTable('planner', function (meal) {
    meal.increments('id').primary();
    meal.integer('user_id').notNullable();
    meal.integer('date').notNullable();
    meal.string('name', 255).notNullable();
 		meal.string('type', 225);
    meal.string('notes', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('planner');
};
