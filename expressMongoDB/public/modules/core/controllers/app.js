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
        templateUrl: 'modules/lists/views/newList.html',
        controller: 'ListsCtrl'
      })
      .when('/lists/:listId', {
        templateUrl: 'modules/items/views/itemsView.html',
        controller: 'ItemsCtrl'
      })
      .when('/lists', {
        templateUrl: 'modules/lists/views/listsView.html',
        controller: 'ListsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
