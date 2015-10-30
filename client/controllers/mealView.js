// to be replaced with another controller
app.controller('mealView', ['$scope', '$http', function($scope, $http) {



  $http.get('/api/meals')
  .then(function(data){
    console.log('Data: ', data.data)
    $scope.meals = data.data;

    $http.get("/api/entries")
     .then(function(data){
      console.log("what is:", data.data)
        $scope.entries = data.data;
     })
   });

  $scope.reverse = function() {
    return function(items) {
      return items.slice().reverse();
    }
  }

  $scope.showModal = function(m) {
    $scope.meal = m;

    console.log("this is m: ", m)
  };
}]);

