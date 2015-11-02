app.controller('AuthCtrl', ['$scope','$http', '$location', '$state', 'Auth', function($scope, $http, $location, $state, Auth) {

  
  $scope.showSignForm = function(){

    $('.slider').fadeOut('fast',function(){
      $('.sign-form').fadeIn('slow');
    });
  }

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
    window.location.replace('/api/users/auth/google');
  };

    $scope.facebook = function(){
    window.location.replace('/api/users/auth/facebook');
  };

}]);
