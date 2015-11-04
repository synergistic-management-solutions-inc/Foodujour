app.controller('MainController', ['$scope','MealForm', function($scope, MealForm) {

  $scope.createMeal = function(){
    //adds default meal values; 
    MealForm.meal.entries = [];
    MealForm.meal.name ='Pizza';
    MealForm.meal.date = '10/16/2015';
    MealForm.meal.location = 'Tenochtitlan';
    MealForm.meal.rating = 0;
    MealForm.meal.notes = 'Meal was out of this world';
    MealForm.meal.image = 'http://i.imgur.com/n104JLy.jpg';
    
    MealForm.mode.newMeal = true;
  }
}]);
