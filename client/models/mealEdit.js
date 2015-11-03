app.factory('MealEdit', ['$http', '$state', function($http, $state) {

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
    updateMeal: updateMeal
  };
}]);
