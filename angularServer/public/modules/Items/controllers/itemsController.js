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
.service('myItemSvc', function () {
	this.getName = function(listNames, id) {
		for (var i=0; i < listNames.length; i++) {
			if (listNames[i].id == id) {
				return listNames[i].name;
			}
		}
     };
})
.controller('ItemsCtrl', ['$scope', '$rootScope', '$http', '$route', 'myItemSvc',
	function($scope, $rootScope, $http, $route, myItem) {
		$scope.getItems = function() {
			$scope.listId = $route.current.params.listId;
			var url = '/app/json/lists/'+ $scope.listId + '.json';
			//$scope.listName = myItem();
			$http.get(url).success(function(data, status, headers, config) {
			   $scope.results = data;
			});
			$scope.listName = myItem.getName($rootScope.listNames, $scope.listId);
		};
	}
]);