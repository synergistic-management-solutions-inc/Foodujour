var angular = require('angular');
var ui = require('angular-ui-router');

window.app = angular.module('myApp', [
  ui
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  });

  .state('signin', {
    url: '/signin',
    templateUrl: 'views/signin.html',
    controller: 'AuthCtrl',
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'views/signup.html',
    controller: 'AuthCtrl',
  })      
});

require('./controllers');
require('./directives');
