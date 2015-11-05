// mealAccordion directive component for re-use
app.directive('mealaccordion', function() {
  return  {
    // use as attribute or element
    restrict: 'E',
    // use sidebar view as template
    templateUrl: '../views/mealAccordion.html',
    controller: 'MealView'
  };
});
