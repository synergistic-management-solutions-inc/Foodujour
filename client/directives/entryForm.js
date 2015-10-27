// entry input form component for re-use
// components will be appended to end of meal entry form
app.directive('entryform', function() {
  return  {
    restrict: 'E',
    // use entryForm template view
    templateUrl: '../views/entryForm.html',
    controller: 'EntryForm',
    controllerAs: 'entry'
  };
});
