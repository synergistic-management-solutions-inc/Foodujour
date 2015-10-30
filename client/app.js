var angular = require('angular');
var ui = require('angular-ui-router');
var ngCookies = require('angular-cookies');
var materialize = require('../node_modules/angular-materialize/src/angular-materialize');

window.app = angular.module('myApp', [
  'ngCookies',
  'ui.router',
  'ui.materialize'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    authenticate: true,
    templateUrl: 'views/main.html',
    // controller: 'MainCtrl'
  })

  .state('auth', {
    url: '/auth',
    authenticate: false,
    templateUrl: 'views/auth.html',
    controller: 'AuthCtrl',
  })

  .state('meals', {
    url: '/meals/{id:int}',
    // authenticate: true,
    templateUrl: 'views/mealInfo.html',
    // params: {
    //   id: 'latest'
    // },
    controller: 'MealInfoController'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
    // controller: 'AboutCtrl'
  })

  .state('entryForm', {
    url: '/entryForm',
    authenticate: true,
    templateUrl: 'views/entryForm.html'
  })

  .state('mealForm', {
    url: '/mealForm',
    authenticate: true,
    templateUrl: 'views/mealForm.html',
  })

  .state('mealInfo', {
    url: '/mealInfo',
    templateUrl: 'views/mealInfo.html',
  })

  .state('landing', {
    url: '/landing',
    authenticate: false,
    templateUrl: 'views/landing.html'
  })
})
.run(function ($rootScope, $state, $location, Auth) {
  // When state changes, we check if the user needs to be authenticated before
  // allowing them access to the page
  $rootScope.$on('$stateChangeStart', function (evt, next, current) {
    if (next.authenticate && Auth.isLoggedIn() === false) {
      // User is not logged in,
      $location.path($state.href('landing'));
    }
  });
});

require('./services');
require('./models');
require('./controllers');
require('./directives');
