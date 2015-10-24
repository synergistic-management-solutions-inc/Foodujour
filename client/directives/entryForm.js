// entry input form component for re-use
// components will be appended to end of meal entry form
app.directive('entryForm', function() {
  return  {
    restrict: 'AE',
    // use entryForm template view
    templateUrl: '../views/entryForm.html'
  }
});
