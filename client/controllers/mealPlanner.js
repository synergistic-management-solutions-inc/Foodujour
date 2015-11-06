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

  $scope.init = function() {
    Planner.getAllPlannedMeals()
    .then(function(data) {
      for (var i = 0; i < data.length; i++) {
        var day = moment.unix(data[i].date).format('dddd');
        var meal = mealMaker(data[i].name, data[i].type, data[i].notes, day);
        $scope.days[day].push(meal);
      }
    })
  }

  $scope.init();

  var mealMaker = function(name, type, notes, date) {
    var meal = Object.create(Object.prototype);
    meal.name = name || '';
    meal.type = type;
    meal.notes = notes || '';
    meal.date = date || '';
    return meal;
  }

  $scope.addToPlannerModal = function() {
    var date = moment().day($scope.mealDay).format('X')
    var meal = mealMaker($scope.mealName, $scope.mealType, $scope.mealNotes, date);
    Planner.addMealtoPlanner(meal)
    .then(function(data) {
      var day = moment.unix(data.date).format('dddd')
      var meal = mealMaker(data.name, data.type, data.notes, date);
      $scope.days[day].push(meal);
    })
  }

}]);