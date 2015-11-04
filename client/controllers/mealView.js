app.controller('MealView', ['$scope', '$http', '$state', 'MealForm', function($scope, $http, $state, MealForm) {

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

  $scope.openForm = function(m){
    m = m || {};

    MealForm.meal.entries = m.entries || [];
    MealForm.meal.name = m.name || "Pizza"
    //fix this, also auto set current date
    MealForm.meal.date = '10/16/2015';
    MealForm.meal.location = m.location || 'Tenochtitlan';
    MealForm.meal.rating = m.rating || 5;
    MealForm.meal.notes = m.notes || 'Meal was out of this world';
    MealForm.meal.image = m.image || 'http://i.imgur.com/n104JLy.jpg';
    MealForm.meal.id = m.id;

    //if no meal was provided, newMeal should be set to true
    MealForm.mode.newMeal = !m;
  }


 $scope.deleteMeal = function (m) {
    $scope.meal = m;
    // console.log('mea',$scope.meal.id)
    $http.get('api/meals/delete/' + $scope.meal.id)
    .then(function() {
      $state.reload();
    })
  };

}]);

