// sidebar directive component for re-use
app.directive('sidebar', function() {
  return  {
    // use as attribute or element
    restrict: 'AE',
    // use sidebar view as template
    templateUrl: '../views/sidebar.html'
  }
});
