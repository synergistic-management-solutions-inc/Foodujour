exports.seed = function(knex, Promise) {
  return knex('entries').truncate()
  .then(function() {
    return knex('entries').insert([
      {
        meal_id: 1, name: 'RoflBurger', user_id: 2,
        rating: 1, notes: 'This is a note here', image: 'http://www.image.com'
      },
      {
        meal_id: 3, name: 'BlingCheese', user_id: 1,
        rating: 2, notes: 'This is a note here but no image'
      },
      {
        meal_id: 4, name: 'Fet UP', user_id: 1,
        rating: 0, image: 'http://not.anote.here'
      },
      {
        meal_id: 3, name: 'Bagel', user_id: 1,
        rating: 0, notes: 'This is a note here but no image'
      },
      {
        meal_id: 3, name: 'Popcorn', user_id: 1,
        rating: 1, notes: 'This is a note here but no image'
      },
      {
        meal_id: 2, name: 'RoflCat', user_id: 4,
        rating: 2, notes: 'This is a note here', image: 'http://www.image.com'
      }
    ]);
  });
};

// ent.increments('id').primary();
// ent.integer('meal_id').notNullable();
// ent.string('name', 255).notNullable();
// ent.integer('rating');
// ent.string('notes', 255);
// ent.string('image', 255);
