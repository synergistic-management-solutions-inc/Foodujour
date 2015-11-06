exports.seed = function(knex, Promise) {
  return knex('planner').truncate()
    .then(function() {
      return knex('planner').insert([
        {
          user_id: 2, date: 12345678, name: 'ameal', notes: 'This is a note here'
        },
        {
          user_id: 4, date: 32347678, name: 'anotherMeal', type: 'lunchdinnermeal', 
          notes: 'This is a note here but no image'
        },
        {
          user_id: 1, date: 82347698, name: 'thisIsa meal', type: 'breakfast'
        },
        {
          user_id: 3, date: 12345678, name: 'soFood'
        },
        {
          user_id: 4, date: 32347678, name: 'muchNoms', notes: 'This is a note here but no image'
        }
      ]);
    });
};