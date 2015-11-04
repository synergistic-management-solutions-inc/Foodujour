app.controller('mealView', ['$scope', '$http', '$state', 'MealForm', 'MealEdit', function($scope, $http, $state, MealForm, MealEdit) {

  $http.get('/api/meals')
  .then(function(data){
    // console.log('Data: ', data.data)
    $scope.meals = data.data;


    $http.get("/api/entries")
     .then(function(data){
      // console.log("what is:", data.data)
        $scope.entries = data.data;
     })
   }); 

// Filter to reverse order of ng-repeat on main view
  $scope.reverse = function() {
    return function(items) {
      return items.slice().reverse();
    }
  };

  $scope.showModal = function(m) {
    $scope.meal = m;
  };

  $scope.editMeal = function(){
    MealForm.mode.newMeal = false;
  }

  $scope.updateMeal = function(m) {
    $scope.meal = m;

    var date = +new Date($scope.meal.date);
    var meal = Object.assign({}, $scope.meal);
    meal.date = Math.floor(date / 1000);

    MealEdit.updateMeal(meal);
  };


 $scope.deleteMeal = function (m) {
    $scope.meal = m;
    // console.log('mea',$scope.meal.id)
    $http.get('api/meals/delete/' + $scope.meal.id)
    .then(function() {
      $state.reload();
    })
  };

}]);

