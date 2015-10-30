// placeholder controller
app.controller('SidebarController', ['$scope', function($scope) {

  $scope.signOut = function() {
    $('#sidenav-overlay').trigger('click');
    Auth.signOut();
  };

}]);
