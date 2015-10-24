exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals', function (meal) {
    meal.increments('id').primary();
    meal.string('user_id', 255).notNullable();
    meal.integer('date').notNullable();
    meal.string('name', 255).notNullable();
    meal.string('location', 255).notNullable();
    meal.integer('rating').notNullable();
    meal.string('notes', 255);
    meal.string('image', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals');
};

