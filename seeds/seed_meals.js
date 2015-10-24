exports.seed = function(knex, Promise) {
  return knex('meals').insert([
    {
      user_id: '11', date: 12345678, name: 'francis', location: 'Lololville, TX',
      rating: 1, notes: 'This is a note here', image: 'http://www.image.com'
    },
    {
      user_id: '18', date: 32347678, name: 'sicnarf', location: 'Nannertown, TX',
      rating: 2, notes: 'This is a note here but no image'
    },
    {
      user_id: '38', date: 82347698, name: 'Sir asdf', location: 'Rofls, TX',
      rating: 0, image: 'http://not.anote.here'
    }
  ]);
};

// meal.increments('id').primary();
// meal.string('user_id', 255).notNullable();
// meal.integer('date').notNullable();
// meal.string('name', 255).notNullable();
// meal.string('location', 255).notNullable();
// meal.integer('rating').notNullable();
// meal.string('notes', 255);
// meal.string('image', 255);

