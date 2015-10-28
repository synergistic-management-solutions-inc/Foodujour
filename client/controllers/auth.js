// currently un-used. To be used for sign-in/sign-up
app.controller('AuthCtrl', ['$scope','$http', function($scope,$http) {
  $scope.user = {
    mail: '',
    password: ''
  };

  $scope.logIn = function(userObj){

    var userData = {
      username:$scope.user.mail,
      password:$scope.user.password
    };

    $http.post("/users/auth/login",userData)
    .then(function(response){
      console.log('logged in?', response);

    })
    
  };


  $scope.signUp = function(){

    var userData = {
      username:$scope.user.mail,
      password:$scope.user.password
    };

    console.log('this is the data rob, ',userData)

    $http.post("/users/auth/signup",userData)
    .then(function(response){
      if(response.data.signedUp === true) {
        $scope.logIn();
      }
      else{
        console.log('wow we got an error! fu', response);
      }
    })

  };

  $scope.google = function(){

    console.log('submitting')

  };

    $scope.facebook = function(){

    console.log('submitting')

  };




}]);
