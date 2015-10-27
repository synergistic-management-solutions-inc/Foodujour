// entry image directive
app.directive('entryimage', function() {
  return  {
    restrict: 'E',
    // use entryForm template view
    templateUrl: '../views/entryImage.html'
  };
});
