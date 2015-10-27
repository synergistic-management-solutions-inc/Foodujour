// meal notes directive
app.directive('mealnotes', function() {
  return  {
    restrict: 'E',
    // use entryForm template view
    templateUrl: '../views/mealnotes.html'
  };
});
