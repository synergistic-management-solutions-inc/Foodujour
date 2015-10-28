// currently un-used. To be used for sign-in/sign-up
app.controller('MealForm', ['$scope', '$http', 'MealForm', function($scope, $http, MealForm) {
  console.log('mealFormController');

  $scope.unsavedEntries = [];

  $scope.meal = {};
  $scope.meal.entries = [];
  $scope.meal.name = 'Pizza';
  $scope.meal.date = '10/16/2015';
  $scope.meal.location = 'Tenochtitlan';
  // TODO : Add rating input field
  $scope.meal.rating = 0;
  $scope.meal.notes = 'Meal was out of this world';
  // TODO : Add image upload input field functionality
  $scope.meal.image = 'http://i.imgur.com/n104JLy.jpg';

  $scope.addEntry = function() {
    console.log('Adding entry');
    $scope.unsavedEntries.push(1);
  };

  $scope.saveEntry = function(entry) {
    console.log('Saving entry:', entry);
    $scope.meal.entries.push(entry);
  };

  $scope.addMeal = function() {
    var date = +new Date($scope.meal.date);
    var meal = Object.assign({}, $scope.meal);
    meal.date = Math.floor(date / 1000);

    console.log('Meal name:', meal.name);
    console.log('Meal date:', meal.date);
    console.log('Meal location:', meal.location);
    console.log('Meal rating:', meal.rating);
    console.log('Meal notes:', meal.notes);
    console.log('Meal image:', meal.image);
    console.log('Meal entries:', meal.entries);

    MealForm.addMeal(meal);
  };
}]);
