var angular = require('angular');
var ui = require('angular-ui-router');
var materialize = require('../node_modules/angular-materialize/src/angular-materialize');

window.app = angular.module('myApp', [
  'ui.router', 'ui.materialize'
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/main.html',
    // controller: 'MainCtrl'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
    // controller: 'AboutCtrl'
  })

  .state('auth', {
    url: '/auth',
    templateUrl: 'views/auth.html',
    // controller: 'AuthCtrl',
  })

  .state('entryForm', {
    url: '/entryForm',
    templateUrl: 'views/entryForm.html'
  })

  .state('mealForm', {
    url: '/mealForm',
    templateUrl: 'views/mealForm.html',
  })
});

require('./models');
require('./controllers');
require('./directives');
