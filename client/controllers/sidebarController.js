// placeholder controller
app.controller('SidebarController', ['$scope', 'Auth', function($scope, Auth) {

  $scope.signOut = function() {
    $('#sidenav-overlay').trigger('click');
    Auth.signOut();
  };

}]);
