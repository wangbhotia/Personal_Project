angular.module('merofood').controller('formsCtrl', function($scope, mainService, $location, $rootScope){

	$scope.images = [];
	$scope.newBus = mainService.selected;

	// console.log($scope.images);
	$scope.addBus = function(newBus){
		// console.log('addBus fn fired!!!');
		newBus.bus_logo = $scope.images[0];
		newBus.spimg1 = $scope.images[1];
		newBus.spimg2 = $scope.images[2];
		newBus.bus_cover_img = $scope.images[3];
		newBus.spbg1 = $scope.images[4];
		newBus.spbg2 = $scope.images[5];
		newBus.user_id = $rootScope.currentUserId;

		mainService.addNewBus(newBus).then(function(response){
			// console.log(respose);
			$scope.business = response;
		});
	}


	// UPDATE BUSINESS

	$scope.updateBusiness = function(update){
		mainService.updateBus(update).then(function(response){
			$scope.resFromDb = response;
			// console.log('update res: ', response);
			// $location.path('/');
		});
	}

});