
app.factory('Auth', ['$cookies', '$http', '$state','$location', function($cookies, $http, $state, $location) {

//if logged in server will store a cookie with the value isLoggedIn this functions just checks that the client has the cookie
  var isLoggedIn = function() {
    var cookie = $cookies.get('isLoggedIn');
    return cookie === 'true';
  };

//sends request to server for logging values are passed in by the controller
  var logIn = function(userObj) {

    var userData = {
      username:userObj.mail,
      password:userObj.password
    };

    return $http.post('/api/users/auth/login', userData)
    .then(function(response){
      // console.log('logged in?', response);
      if (response.status === 200 && isLoggedIn()) {
        $state.go('home');
        return true;
      } else {
        $state.go('auth');
        return false;
      }
    });
    
  };

//sends request to server for sign Up values are passed in by the controller

  var signUp = function(userObj) {

    var userData = {
      username: userObj.mail,
      password: userObj.password
    };

    $http.post('/api/users/auth/signup', userData)
    .then(function(response){
      if(response.data.signedUp === true) {
        return $http.post('/api/users/auth/login', userData)
        .then(function(response) {
          if (isLoggedIn()) {
            $state.go('home');
          }
        })
      }
      else{
        console.log('wow we got an error!', response);
      }
    });

  };

//sends request to server for sign Out values are passed in by the controller

  var signOut = function() {
    $http({
      method: 'POST',
      url: '/api/users/auth/logout'
    }).then(function(res) {
      $state.go('auth');
    });
  };

  return {
    isLoggedIn: isLoggedIn,
    logIn: logIn,
    signOut: signOut,
    signUp: signUp
  };
}]);

//check states in app.js for redirection references
