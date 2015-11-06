var moment = require('moment');

app.controller('MealPlanner', ['$scope', 'Planner', function($scope, Planner){

  $scope.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  $scope.mealDay = 'Sunday';

  $scope.days = {
    "Sunday" : [],
    "Monday" : [],
    "Tuesday" : [],
    "Wednesday" : [],
    "Thursday" : [],
    "Friday" : [],
    "Saturday" : []
  }

  $scope.mealName = '';

  $scope.types = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  $scope.notes = '';


  var mealMaker = function(name, type, notes) {
    var meal = Object.create(Object.prototype);
    meal.name = name || '';
    meal.type = type;
    meal.notes = notes || '';
    return meal;
  }

  $scope.addToPlannerModal = function() {
    var meal = mealMaker($scope.mealName, $scope.mealType, $scope.mealNotes);
    $scope.days[$scope.mealDay].push(meal);
    Planner.addMealtoPlanner();
  }

}]);