// currently un-used. To be used for sign-in/sign-up
app.controller('EntryForm', ['$scope', '$http', function($scope, $http) {
  console.log('entryForm Controller');

  $scope.stuff = [2,3,4];

  $scope.entry = {};
  $scope.entry.name = 'Pickles';
  $scope.entry.rating = 10;
  $scope.entry.notes = 'Tasted like cucumbers';
  $scope.entry.image = '';

  $scope.saveEntry = function() {
    console.log('Save Entry');
    // console.log('Meal name:', $scope.meal.name);
    // console.log('Meal date:', $scope.meal.date);
    // console.log('Meal location:', $scope.meal.location);
    // console.log('Meal rating:', $scope.meal.rating);
    // console.log('Meal notes:', $scope.meal.notes);
    // console.log('Meal image:', $scope.meal.image);
    // console.log('Meal entries:', $scope.meal.entries);

    // MealForm.addMeal($scope.meal);
    MealForm.addMeal($scope.meal);

  };
}]);
