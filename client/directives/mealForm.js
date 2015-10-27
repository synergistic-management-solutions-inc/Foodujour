// meal user input form component for re-use
// component will be accessed from collapisble on user home page
// will have button to append entry forms
app.directive('mealform', function() {
  return  {
    restrict: 'E',
    // use meal form template for directive
    templateUrl: '../views/mealForm.html',
    controller: 'MealForm',
    controllerAs: 'meal'
  };
});
