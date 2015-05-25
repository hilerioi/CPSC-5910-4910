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
.filter('checkEdit',  function() {
    return function (input, param1) {
        var result = '';
        if (param1 == true) 
		{ 
			result = input + ' (Edit)';
		}
        else {
			result = input;
		}
        return result;
    };
})
.service('myItemSvc', function () {
	this.getName = function(listNames, id) {
		for (var i=0; i < listNames.length; i++) {
			if (listNames[i].listId == id) {
				return listNames[i].name;
			}
		}
     };
})
.service('myStatus',  function() {
	this.checkValue = function(value) {
	    if (value == 'A') { 
			return true; 
	    }
	    else { 
			return false;
	    }
	};
 })
.controller('ItemsCtrl', ['$scope', '$rootScope', '$http', '$route', 'myItemSvc', 'myStatus',
	function($scope, $rootScope, $http, $route, myItem, myStatus) {
		$scope.getItems = function() {
			$scope.listId = $route.current.params.listId;
			var url = '/app/tasks/'+ $scope.listId;
			//$scope.listName = myItem();
			$http.get(url).success(function(data, status, headers, config) {
			   $scope.results = data;
			});
			//$scope.listName = myItem.getName($rootScope.listNames, $scope.listId);
		};
		$scope.checkValue = function(value) {
			$scope.checked = myStatus.checkValue(value);
		};
		$scope.enableTaskEdit = function(value) {
			$scope.taskEdit = true;
			$scope.task = $scope.results.tasks[value];
			$scope.indexValue = value;
		};
		$scope.disableTaskEdit = function() {
			$scope.taskEdit = false;
			$scope.task = null;
			$scope.indexValue = -1;
		};
		$scope.setStatus = function(value, statusValue) {
			$scope.results.tasks[value].status = statusValue;
			//$scope.task.status = value;
		}
	}
]);