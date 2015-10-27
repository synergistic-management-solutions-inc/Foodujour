// entry notes directive
app.directive('entrynotes', function() {
  return  {
    restrict: 'E',
    // use entryForm template view
    templateUrl: '../views/entryNotes.html'
  };
});
