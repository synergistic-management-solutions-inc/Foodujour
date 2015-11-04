app.controller('MainController', ['$scope','MealForm', function($scope, MealForm) {

  $scope.createMeal = function(){
    MealForm.mode.newMeal = true;
  }
}]);
