app.controller('AuthCtrl', ['$scope','$http', '$location', '$state', 'Auth', function($scope, $http, $location, $state, Auth) {

 //Slide the signin form in landing page 

  $scope.showSignForm = function(){

    $('.slider').fadeOut('fast',function(){
      $('.sign-form').fadeIn('slow');
    });
  }

  $scope.user = {
    mail: '',
    password: '',
    message: '',
  };

//controls the submit login button and changes the message if it is not logged in
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

//controls the signUp button  see Auth service passport service

  $scope.signUp = function(){
    Auth.signUp($scope.user);
  };

//hardcoded the redirection to handle passport with google and facebook
  $scope.google = function(){
    window.location.replace('/api/users/auth/google');
  };

    $scope.facebook = function(){
    window.location.replace('/api/users/auth/facebook');
  };

}]);
