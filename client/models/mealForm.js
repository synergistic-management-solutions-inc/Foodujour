app.factory('MealForm', ['$http', '$state', function($http, $state) {

  //keeps track of if the MealForm is in
  //new meal mode (as opposed to edit meal mode)
  var meal = {};

  var mode = {
    newMeal: true
  }

  var addMeal = function(meal) {
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
    mode: mode,
    addMeal: addMeal,
    updateMeal: updateMeal
  };
}]);
