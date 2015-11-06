var moment = require('moment');
var Promise = require("bluebird");

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

  var mealMaker = function(name, type, notes, date) {
    var meal = Object.create(Object.prototype);
    meal.name = name || '';
    meal.type = type;
    meal.notes = notes || '';
    meal.date = date || '';
    return meal;
  }

  $scope.addToPlannerModal = function() {
    var date = moment().format('X');
    var meal = mealMaker($scope.mealName, $scope.mealType, $scope.mealNotes, date);
    // $scope.days[$scope.mealDay].push(meal);
    // var addMeal = Promise.promisify(Planner.addMealtoPlanner)
    Planner.addMealtoPlanner(meal)
    .then(function(data) {
      console.log(data)
    })
  }

}]);