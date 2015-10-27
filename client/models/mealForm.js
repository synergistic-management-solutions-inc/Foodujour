app.factory('MealForm', ['$http', function($http) {

  console.log('MealForm factory');

  var addMeal = function(meal) {
    console.log('Adding meal:', meal);
    $http({
      method: 'POST',
      url: '/meals',
      data: meal
    })
    .then(function(res) {
      console.log('Response:', res);
    });
  };

  return {
    addMeal: addMeal
  };
}]);
