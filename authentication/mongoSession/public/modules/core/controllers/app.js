'use strict';

/**
 * @ngdoc overview
 * @name To Do App
 * @description
 * # To do Application
 *
 * Main module of the application.
 */
angular
  .module('toDoApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/core/views/welcome.html'
	  })
      .when('/lists/new', {
        templateUrl: 'modules/lists/views/listDetails.html',
//        controller: 'ListsCtrl'
      })
      .when('/lists/:listId/update', {
        templateUrl: 'modules/lists/views/listDetails.html',
//        controller: 'ListsCtrl'
      })
      .when('/lists/:listId', {
        templateUrl: 'modules/lists/views/listFullDetails.html'
//        templateUrl: 'modules/items/views/tasksList.html',
//        controller: 'ItemsCtrl'
      })
      .when('/lists', {
        templateUrl: 'modules/lists/views/listsView.html',
//        controller: 'ListsCtrl'
      })
      .when('/login', {
        templateUrl: 'modules/core/views/login.html'
	  })
      .otherwise({
        redirectTo: '/'
      });
  });
