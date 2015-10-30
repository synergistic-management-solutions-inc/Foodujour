app.controller('EntryForm', ['$scope', '$http', function($scope, $http) {

  console.log('entryForm Controller');

  // The id this entry is located in the meal form
  // -1 = not attached to a meal
  $scope.entryId = -1;


  // console.log('entryForm Controller');

  $scope.entry = {};
  $scope.entry.name = 'Pickles';
  $scope.entry.rating = 10;
  $scope.entry.notes = 'Tasted like cucumbers';
  $scope.entry.image = '';


  $scope.meal = null;

  $scope.saveEntry = function(meal) {
    $scope.meal = meal;

  // $scope.saveEntry = function() {
    // console.log('Save Entry');
    // console.log('Meal name:', $scope.meal.name);
    // console.log('Meal date:', $scope.meal.date);
    // console.log('Meal location:', $scope.meal.location);
    // console.log('Meal rating:', $scope.meal.rating);
    // console.log('Meal notes:', $scope.meal.notes);
    // console.log('Meal image:', $scope.meal.image);
    // console.log('Meal entries:', $scope.meal.entries);


    // Entry has not been attached to meal yet
    if ($scope.entryId < 0) {
      $scope.entryId = meal.saveEntry($scope.entry);
    // Entry is associated with a meal
    } else {
      meal.updateEntry($scope.entryId, $scope.entry);
    }
  };

  // $scope.saveEntry = function() {
  //   console.log('Save Entry');
  //   // console.log('Meal name:', $scope.meal.name);
  //   // console.log('Meal date:', $scope.meal.date);
  //   // console.log('Meal location:', $scope.meal.location);
  //   // console.log('Meal rating:', $scope.meal.rating);
  //   // console.log('Meal notes:', $scope.meal.notes);
  //   // console.log('Meal image:', $scope.meal.image);
  //   // console.log('Meal entries:', $scope.meal.entries);

  //   // MealForm.addMeal($scope.meal);
  // };
}]);
