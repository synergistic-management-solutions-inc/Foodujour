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

    var userData = {
      username:$scope.user.mail,
      password:$scope.user.password
    };

    $http.post('/users/auth/login', userData)
    .then(function(response){
      console.log('logged in?', response);
      if (response.status === 200) {
        // TODO
        // isLoggedIn = true;
        console.log('status code 200');
        $state.go('home');
      } else {
        // TODO
        // isLoggedIn = false;
      }
    });
    
  };


  $scope.signUp = function(){

    var userData = {
      username:$scope.user.mail,
      password:$scope.user.password
    };

    console.log('this is the data rob, ', userData);

    $http.post('/users/auth/signup',userData)
    .then(function(response){
      if(response.data.signedUp === true) {
        $scope.logIn();
      }
      else{
        console.log('wow we got an error!', response);
      }
    });

  };

  $scope.google = function(){

    $http.get('/users/auth/google')

  };

    $scope.facebook = function(){

    console.log('submitting');

  };




}]);
