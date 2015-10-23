exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meals', function (meal) {
      meal.increments('id').primary();
      meal.string('user_id', 255);
      meal.integer('date');
      meal.string('name', 255);
      meal.string('location', 255);
      meal.integer('rating');
      meal.string('notes', 255);
      meal.string('image', 255);
    }),

    knex.schema.createTable('entries', function (ent) {
      ent.increments('id').primary();
      ent.integer('meal_id');
      ent.string('name', 255);
      ent.integer('rating');
      ent.string('notes', 255);
      ent.string('image', 255);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('meals'),
      knex.schema.dropTable('entries')
  ]);
};
