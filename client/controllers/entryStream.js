app.controller('entryStream', ['$scope', '$http', '$state', 'EntryEdit', 'ConvertDate', 
  function($scope, $http, $state, EntryEdit, ConvertDate) {
  
  $http.get("/api/meals")
  .then(function(data){
    $scope.meals = data.data

    $http.get("/api/entries")
    .then(function(data) {
      var entries = data.data
      for (var i = 0; i < entries.length; i++){
        entries[i].date = $scope.getDate(entries[i]);
      }

      $scope.entries = entries;
    })    
  })

  EntryEdit.mode.editable = true;

  //finds the meal associated with that entry
  $scope.getMeal = function(entry){
    if (!$scope.meals) return;

    for (var i = 0; i < $scope.meals.length; i++){
      if ($scope.meals[i].id === entry.meal_id){
        return $scope.meals[i];
      }
    }
  }

  $scope.getDate = function(entry){
    if (!$scope.meals) return;
  
    var meal = $scope.getMeal(entry);
    var date = meal.date;
    return ConvertDate.convert(date);
  }

  $scope.sortBy = function(field){
    if ($scope.sortField === field){
      $scope.sortDirection = !$scope.sortDirection;
    }
    else {
      $scope.sortField = field;
      $scope.sortDirection = true;  
    }
  };

  $scope.showModal = function(m) {
    EntryEdit.mode.editable = false;
    $scope.meal = m;
  };

  // Filter to reverse order of ng-repeat on main view
  $scope.reverse = function() {
    return function(items) {
      return items.slice().reverse();
    }
  }

}]);