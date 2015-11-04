app.factory('MealForm', ['$http', '$state', function($http, $state) {

  var newMeal = true;

  var setNewMeal = function(bool){
    newMeal = bool;
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

  return {
    newMeal: newMeal,
    setNewMeal: setNewMeal,
    addMeal: addMeal
  };
}]);
