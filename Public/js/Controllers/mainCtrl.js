angular.module('merofood').controller('mainCtrl', function($scope, mainService){

	$scope.getBusiness = function(){
		mainService.getData().then(function(response){
			$scope.business = response.data;
			// console.log($scope.business);
		});
	}

	$scope.getBusiness();

})