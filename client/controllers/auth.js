// currently un-used. To be used for sign-in/sign-up
app.controller('AuthCtrl', ['$scope','$http', function($scope,$http) {
  $scope.user = {
    mail: '',
    password: ''
  };

  $scope.logIn = function(){
    console.log('submitting')

    $http.post("/users/auth/login")
    .then(function(data){
    console.log('logged in ', data)
    })
    // .catch{
    //   console.log('rejected mf')
    // }
  };

  $scope.signUp = function(){

    console.log('submitting')

  };

  $scope.google = function(){

    console.log('submitting')

  };

    $scope.facebook = function(){

    console.log('submitting')

  };




}]);
