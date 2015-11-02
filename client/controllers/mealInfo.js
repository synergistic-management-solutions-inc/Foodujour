app.controller('MealInfoController', ['$scope', '$http', '$location', '$stateParams', function($scope, $http, $location, $stateParams) {

  $scope.meal = {};

  var mealId = $stateParams.id;
  // console.log('State params:', mealId);

  $http.get('/api/meals/' + mealId)
  .then(function(data){
    // console.log('data:', data.data);
    $scope.meal = data.data;
    // console.log('scope.meal:', $scope.meal);
  });

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
}]);
