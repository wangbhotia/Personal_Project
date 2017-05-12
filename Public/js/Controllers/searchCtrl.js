angular.module('merofood').controller('searchCtrl', function($scope, $rootScope){

	$scope.allBusForSearch = $rootScope.searchAllBus;
	console.log($scope.allBusForSearch);


});