// entry notes directive
app.directive('entrynotes', function() {
  return  {
    restrict: 'E',
    // use entryForm template views
    templateUrl: '../views/entryNotes.html'
  };
});
