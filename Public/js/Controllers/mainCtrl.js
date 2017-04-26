angular.module('merofood').controller('mainCtrl', function($scope, mainService){

	$scope.test = 'Hello from mainCtrl';
	$scope.test2 = mainService.test2;

})