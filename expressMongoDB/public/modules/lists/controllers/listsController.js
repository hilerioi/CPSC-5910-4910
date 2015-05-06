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
			$http.get('/app/lists').success(function(data, status, headers, config) {
			   $scope.results = data;
			   var listNames = [];
			   for (var i = 0; i < data.length; i++) {
				   listNames[i] = { "name": data[i].name, "listId": data[i].listId };
			   }
			   $rootScope.listNames = listNames;
			});
		};
		$scope.writeList = function() {
			console.log($scope.list);
			$http.post('/app/lists', $scope.list).success(function(data, status, headers, config) {
				$scope.list.listId = data;
			});
		};
		$scope.initNewList = function() {
			var newList = {};
			newList.listId = 0;
			newList.owner = "israelh";
			newList.state = "A";
			$scope.list = newList;
		};
	}
]);