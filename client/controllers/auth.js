app.controller('AuthCtrl', ['$scope','$http', '$location', '$state', 'Auth', function($scope, $http, $location, $state, Auth) {

  $scope.showSignForm = function(){

    $('.slider').fadeOut('fast',function(){
      $('.sign-form').fadeIn('slow');
    });
  }

  // console.log('AuthController');
  $scope.user = {
    mail: '',
    password: '',
    message: '',
  };

  $scope.logIn = function(userObj){
    Auth.logIn($scope.user)
    .then(function(res){
      if(!res){
         $scope.user.message = 'Wrong username/password';
      }else{
        $scope.user.message = '';
      }
    });
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
