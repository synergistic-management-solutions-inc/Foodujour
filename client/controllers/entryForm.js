// currently un-used. To be used for sign-in/sign-up
app.controller('EntryForm', ['$scope', '$http', function($scope, $http) {
  console.log('entryForm Controller');
  // $scope.meal = {};
  // $scope.meal.entries = [];
  // $scope.meal.name = 'Pizza';
  // $scope.meal.date = '10/16/2015';
  // $scope.meal.location = 'Tenochtitlan';
  // // TODO : Add rating input field
  // $scope.meal.rating = 0;
  // $scope.meal.notes = 'Meal was out of this world';
  // // TODO : Add image upload input field functionality
  // $scope.meal.image = 'http://i.imgur.com/n104JLy.jpg';

  $scope.saveEntry = function() {
    console.log('Save Entry');
    // console.log('Meal name:', $scope.meal.name);
    // console.log('Meal date:', $scope.meal.date);
    // console.log('Meal location:', $scope.meal.location);
    // console.log('Meal rating:', $scope.meal.rating);
    // console.log('Meal notes:', $scope.meal.notes);
    // console.log('Meal image:', $scope.meal.image);
    // console.log('Meal entries:', $scope.meal.entries);

    MealForm.addMeal($scope.meal);
  };
}]);
