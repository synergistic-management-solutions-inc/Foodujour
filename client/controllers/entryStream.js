app.controller('entryStream', ['$scope', '$http', function($scope, $http) {
  $http.get("/api/entries")
    .then(function(data) {
      console.log("what is:", data.data)
      $scope.entries = data.data;
    })

  // filter to reverse order of ng-repeat on main view
  $scope.reverse = function() {
    return function(items) {
      return items.slice().reverse();
    }
  }

}]);
