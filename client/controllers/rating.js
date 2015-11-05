app.controller('StarRating', ['$scope', function ($scope) {
  $scope.rating = 0;
  $scope.ratings = [{
      current: 1,
      max: 5
  }];

  $scope.getSelectedRating = function (rating) {
    $scope.$parent.meal.rating = rating;
  }
}]);