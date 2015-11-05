app.controller('entryStream', ['$scope', '$http', 'EntryEdit', function($scope, $http, EntryEdit) {
  $http.get("/api/entries")
    .then(function(data) {
      // console.log("what is:", data.data)
      $scope.entries = data.data;
    })

  EntryEdit.mode.editable = true;

  // Filter to reverse order of ng-repeat on main view
  $scope.reverse = function() {
    return function(items) {
      return items.slice().reverse();
    }
  }

}]);