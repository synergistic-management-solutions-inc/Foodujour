exports.seed = function(knex, Promise) {
  return knex('entries').insert([
    {
      meal_id: 21, name: 'RoflBurger',
      rating: 1, notes: 'This is a note here', image: 'http://www.image.com'
    },
    {
      meal_id: 88, name: 'BlingCheese',
      rating: 2, notes: 'This is a note here but no image'
    },
    {
      meal_id: 198, name: 'Fet UP',
      rating: 0, image: 'http://not.anote.here'
    },
    {
      meal_id: 88, name: 'Bagel',
      rating: 0, notes: 'This is a note here but no image'
    },
    {
      meal_id: 88, name: 'Popcorn',
      rating: 1, notes: 'This is a note here but no image'
    },
    {
      meal_id: 21, name: 'RoflCat',
      rating: 2, notes: 'This is a note here', image: 'http://www.image.com'
    }
  ]);
};

// ent.increments('id').primary();
// ent.integer('meal_id').notNullable();
// ent.string('name', 255).notNullable();
// ent.integer('rating');
// ent.string('notes', 255);
// ent.string('image', 255);
