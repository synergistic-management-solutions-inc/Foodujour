app.controller('mealView', ['$scope', '$http', '$state', function($scope, $http, $state) {

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
  }

  $scope.showModal = function(m) {
    $scope.meal = m;
    console.log("this is m: ", m)
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

