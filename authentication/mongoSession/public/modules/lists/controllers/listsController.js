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
.controller('ListsCtrl', ['$scope', '$rootScope', '$http', '$route',
	function($scope,  $rootScope, $http, $route) {
		$scope.getLists = function() {
			$http.get('/app/lists').success(function(data, status, headers, config) {
			   $scope.results = data;
			  /* var listNames = [];
			   for (var i = 0; i < data.length; i++) {
				   listNames[i] = { "name": data[i].name, "listId": data[i].listId };
			   }
			   $rootScope.listNames = listNames;
			  */
			});
		};
		$scope.writeList = function() {
			if ($scope.listId == 'New') {
				var url = '/app/lists';
				$http.post(url, $scope.list).success(function(data, status, headers, config) {
					$scope.list.listId = data;
					$scope.status = '(Saved List)';
				});				
			}
			else {
				var url = '/app/lists/' + $scope.listId;
				$http.put(url, $scope.list).success(function(data, status, headers, config) {
					//$scope.list = data;
					$scope.status = '(Updated List)';
				});
			}
		};
		$scope.getList = function() {
			var url = '/app/lists/' + $scope.listId; 
			$http.get(url).success(function(data, status, headers, config) {
			   $scope.list = data;
			   $scope.listId = data.listId;
			});
		};
		$scope.initList = function() {
			$scope.listId = $route.current.params.listId;
			if ($scope.listId) {
				$scope.status = 'Update List';
				$scope.buttonLabel = 'Update';
				$scope.getList();
			} else {
				$scope.status = 'New List';
				$scope.buttonLabel = 'Add';
				var newList = {};
				$scope.listId = 'New';
				newList.owner = "israelh";
				newList.state = "A";
				$scope.list = newList;
			}
		};
		$scope.enableListEdit = function(value) {
			$scope.listEdit = true;
		};
		$scope.disableListEdit = function() {
			$scope.listEdit = false;
		};
		$scope.setState = function (value) {
			$scope.list.state = value;
		};
	}
]);