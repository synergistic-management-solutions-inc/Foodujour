
app.factory('Auth', ['$cookies', '$http', '$state', function($cookies, $http, $state) {

  var isLoggedIn = function() {
    var cookie = $cookies.get('isLoggedIn');
    return cookie === 'true';
  };

  var logIn = function(userObj) {

    var userData = {
      username:userObj.mail,
      password:userObj.password
    };

    $http.post('/users/auth/login', userData)
    .then(function(response){
      console.log('logged in?', response);
      if (response.status === 200) {
        console.log('status code 200');
        $state.go('home');
      } else {
        // Error signing in
      }
    });
    
  };

  var signUp = function(userObj) {

    var userData = {
      username: userObj.mail,
      password: userObj.password
    };

    console.log('this is the data rob, ', userData);

    $http.post('/users/auth/signup', userData)
    .then(function(response){
      if(response.data.signedUp === true) {
        logIn(userData);
      }
      else{
        console.log('wow we got an error!', response);
      }
    });

  };

  var signOut = function() {
    $http({
      method: 'POST',
      url: '/users/auth/logout'
    }).then(function(res) {
      $state.go('auth');
    });
  };

  return {
    isLoggedIn: isLoggedIn,
    logIn: logIn,
    signOut: signOut
  };
}]);
