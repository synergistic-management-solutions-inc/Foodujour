// date picker component
app.directive('datepicker', function() {
  return  {
    restrict: 'E',
    // use entryForm template view
    templateUrl: '../views/datepicker.html',
    controller: 'dateController'
  };
});
