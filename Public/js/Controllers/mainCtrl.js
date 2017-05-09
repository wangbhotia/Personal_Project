angular.module('merofood').controller('mainCtrl', function($scope, mainService){

	// console.log('mainCtrl running');

	$scope.getBusiness = function(){
		mainService.getBusData().then(function(response){
			$scope.business = response;
			// console.log($scope.business);
		});
	}

	$scope.getBusiness();

	// $scope.getSpecial = function(){
	// 	mainService.getSpecialData().then(function(response){
	// 		$scope.special = response;
	// 		// console.log($scope.special);
	// 	});
	// }

	// $scope.getSpecial();

});