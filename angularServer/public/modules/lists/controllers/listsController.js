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
.module('toDoApp')
.controller('ListsCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		$scope.getLists = function() {
			$http.get('/app/json/lists.json').success(function(data, status, headers, config) {
			   $scope.results = data;
			   var listNames = [];
			   for (var i = 0; i < data.length; i++) {
				   listNames[i] = { "name": data[i].name, "id": data[i].id };
			   }
			   $rootScope.listNames = listNames;
			});
		};
	}
]);