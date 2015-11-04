app.factory('MealForm', ['$http', '$state', function($http, $state) {

  //keeps track of if the MealForm is in
  //new meal mode (as opposed to edit meal mode)
  var meal = {};

  var setMeal = function(m){
    m = m || {};

    meal.entries = m.entries || [];
    meal.name = m.name || 'Pizza';
    meal.date = m.date || '10/16/2015';
    meal.location = m.location || 'Tenochtitlan';
    // TODO : Add rating input field
    meal.rating = m.rating || 0;
    meal.notes = m.notes || 'Meal was out of this world';
    // TODO : Add image upload input field functionality
    meal.image = m.image || 'http://i.imgur.com/n104JLy.jpg';
  }

  var mode = {
    newMeal: true
  }

  var addMeal = function(meal) {
    console.log('factory adding meal:', meal);
    $http({
      method: 'POST',
      url: '/api/meals',
      data: meal
    })
    .then(function(res) {
      // console.log('Response:', res);
      $state.reload();
    });
  };

  var updateMeal = function(meal) {
    console.log('Updating meal:', meal);
    $http({
      method: 'PUT',
      url: '/api/meals/'+meal.id,
      data: meal
    })
    .then(function(res) {
      console.log('Response:', res);
      $state.reload();
    });
  };

  return {
    meal: meal,
    setMeal: setMeal,
    mode: mode,
    addMeal: addMeal,
    updateMeal: updateMeal
  };
}]);
