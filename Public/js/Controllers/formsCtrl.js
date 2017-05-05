angular.module('merofood').controller('formsCtrl', function($scope, mainService){

	$scope.addBus = function(newBus){
		console.log('addBus fn fired!!!');
		console.log(newBus);
		mainService.addNewBus(newBus).then(function(respose){
			$scope.newBusiness = {};
			$scope.newB = response;
		});
	}

});