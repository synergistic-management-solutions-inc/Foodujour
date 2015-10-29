app.controller('AuthCtrl', ['$scope','$http', '$location', '$state', 'Auth', function($scope, $http, $location, $state, Auth) {

  // console.log('AuthController');
  $scope.user = {
    mail: '',
    password: ''
  };

  $scope.logIn = function(userObj){
    Auth.logIn($scope.user);
  };


  $scope.signUp = function(){
    Auth.signUp($scope.user);
  };

  $scope.google = function(){
    window.location.replace('user/auth/google');
  };

    $scope.facebook = function(){
    window.location.replace('user/auth/facebook');
  };

}]);
