angular.module('merofood').controller('formsCtrl', function($scope, mainService, $location){

	// console.log(mainService.selected);

	$scope.newBus = mainService.selected;

	$scope.addBus = function(newBus){
		console.log('addBus fn fired!!!');
		console.log(newBus);
		mainService.addNewBus(newBus).then(function(respose){
			// console.log(respose);
			$scope.business = response;
		});
	}


	// UPDATE BUSINESS

	$scope.updateBusiness = function(update){
		console.log('update: ', update);	
		mainService.updateBus(update).then(function(response){
			console.log('update res: ', response);
			// $location.path('/');
		});
	}

});