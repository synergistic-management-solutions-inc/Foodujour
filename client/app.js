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


  //changed to addd authorization page to landing page, it should not be needed but serveral parts of the code will need to be changed.
  //to be able to redirect everyhing that goes to auth to landing.
  .state('auth', {
    url: '/landing',
    authenticate: false,
    templateUrl: 'views/landing.html',
    controller: 'AuthCtrl',
  })

  //pretty sure this guy isn't doing anything 
  // .state('meals', {
  //   url: '/meals/{id:int}',
  //   // authenticate: true,
  //   templateUrl: 'views/mealInfo.html',
  //   // params: {
  //   //   id: 'latest'
  //   // },
  //   controller: 'MealInfoController'
  // })

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

  //this code, also not doing anything 

  // .state('mealInfo', {
  //   url: '/mealInfo',
  //   templateUrl: 'views/mealInfo.html',
  // })

  .state('landing', {
    url: '/landing',
    authenticate: false,
    templateUrl: 'views/landing.html'
  })

  .state('mealstream', {
    url: '/mealstream',
    authenticate: true,
    templateUrl: 'views/mealStream.html',
    controller: 'mealView'
  })

  .state('entrystream', {
    url: '/entrystream',
    authenticate: true,
    templateUrl: 'views/entryStream.html',
    controller: 'entryStream'
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
  })
  $rootScope.convertDate = function(d) {
    var dateObj = new Date(d * 1000)
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newDate = month + "/" + day + "/" + year;
    return newDate;
  }
});

require('./services');
require('./models');
require('./controllers');
require('./directives');
