app.controller('MainController', ['$scope','MealForm', function($scope, MealForm) {

  $scope.createMeal = function(){
    MealForm.meal.entries = [];
    MealForm.meal.name ='Pizza';
    MealForm.meal.date = '10/16/2015';
    MealForm.meal.location = 'Tenochtitlan';
    // TODO : Add rating input field
    MealForm.meal.rating = 0;
    MealForm.meal.notes = 'Meal was out of this world';
    // TODO : Add image upload input field functionality
    MealForm.meal.image = 'http://i.imgur.com/n104JLy.jpg';
    
    MealForm.mode.newMeal = true;
  }
}]);
