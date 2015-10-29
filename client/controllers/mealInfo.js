// to be replaced with another controller
app.controller('MealInfoController', ['$scope', '$http', '$location', '$stateParams', function($scope, $http, $location, $stateParams) {

  var mealId = $stateParams.id;
  console.log('State params:', mealId);

  $http.get('/api/meals/' + mealId)
  .then(function(data){
    console.log('data:', data.data);
    $scope.meal = data.data;
  });

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
}]);
