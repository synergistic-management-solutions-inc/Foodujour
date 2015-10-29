exports.seed = function(knex, Promise) {
  return knex('meals').truncate()
    .then(function() {
      return knex('meals').insert([
        {
          user_id: 2, date: 12345678, name: 'ameal', location: 'Lololcity, TX',
          rating: 1, notes: 'This is a note here', image: 'http://www.image.com'
        },
        {
          user_id: 4, date: 32347678, name: 'anotherMeal', location: 'Nann, TX',
          rating: 2, notes: 'This is a note here but no image'
        },
        {
          user_id: 1, date: 82347698, name: 'thisIsa meal', location: 'Fancymanor, OG',
          rating: 0, image: 'http://not.anote.here'
        },
        {
          user_id: 3, date: 12345678, name: 'soFood', location: 'Litchfield, CT',
          rating: 1, notes: 'This is a note here', image: 'http://www.image.com'
        },
        {
          user_id: 4, date: 32347678, name: 'muchNoms', location: 'NewHartfs, AT',
          rating: 2, notes: 'This is a note here but no image'
        },
        {
          user_id: 838, date: 82347698, name: 'burgEtte', location: 'Burftowne, TX',
          rating: 0, image: 'http://not.anote.here'
        },
        {
          user_id: 2, date: 12345678, name: 'ameal83', location: 'Lololville, TX',
          rating: 1, notes: 'This is a note here', image: 'http://www.image.com'
        },
        {
          user_id: 2, date: 32347678, name: 'blackbunburger', location: 'Nannertown, TX',
          rating: 2, notes: 'This is a note here but no image'
        },
        {
          user_id: 3, date: 82347698, name: 'burgerkingdinner', location: 'Rofls, TX',
          rating: 0, image: 'http://not.anote.here'
        }
      ]);
    });
};

// meal.increments('id').primary();
// meal.string('user_id', 255).notNullable();
// meal.integer('date').notNullable();
// meal.string('name', 255).notNullable();
// meal.string('location', 255).notNullable();
// meal.integer('rating').notNullable();
// meal.string('notes', 255);
// meal.string('image', 255);

