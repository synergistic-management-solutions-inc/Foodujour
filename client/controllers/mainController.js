app.controller('MainController', ['$scope','MealForm', function($scope, MealForm) {
  $scope.newMeal = MealForm.newMeal;
  $scope.setNewMeal = MealForm.setNewMeal; 
}]);
