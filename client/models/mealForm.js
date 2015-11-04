app.factory('MealForm', ['$http', '$state', function($http, $state) {

  //keeps track of if the MealForm is in
  //new meal mode (as opposed to edit meal mode)
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
    newMeal: newMeal,
    setNewMeal: setNewMeal,
    addMeal: addMeal
  };
}]);
