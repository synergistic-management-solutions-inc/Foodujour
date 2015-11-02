app.factory('MealForm', ['$http', '$state', function($http, $state) {

  console.log('MealForm factory');

  var addMeal = function(meal) {
    console.log('Adding meal:', meal);
    $http({
      method: 'POST',
      url: '/api/meals',
      data: meal
    })
    .then(function(res) {
      console.log('Response:', res);
      $state.reload();
    });
  };

  return {
    addMeal: addMeal
  };
}]);
