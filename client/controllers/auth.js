// currently un-used. To be used for sign-in/sign-up
app.controller('AuthCtrl', ['$scope','$http', '$location', '$state', 'Auth', function($scope, $http, $location, $state, Auth) {

  // if (isLoggedIn === true) {
  //   console.log('AuthCtrl already logged in')
  //   // $location.path('/');
  //   $state.go('home');
  // }

  console.log('AuthController');
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

    console.log('submitting');

  };

    $scope.facebook = function(){

    console.log('submitting');

  };




}]);
