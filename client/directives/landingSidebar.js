// sidebar directive component for re-use
// used on landing page
app.directive('landingsidebar', function() {
  return  {
    // use as attribute or element
    restrict: 'E',
    // use sidebar view as template
    templateUrl: '../views/landingSidebar.html',
    // controller: 'SidebarController'
  };
});
