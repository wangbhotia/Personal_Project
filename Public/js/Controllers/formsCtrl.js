angular.module('merofood').controller('formsCtrl', function($scope, mainService, $location, $rootScope){

	$scope.images = [];
	$scope.newGallery = [];
	$scope.newBus = mainService.selected;

	$scope.addBus = (newBus) => {
		// console.log('addBus fn fired!!!');
		newBus.bus_logo = $scope.images[0];
		newBus.spimg1 = $scope.images[1];
		newBus.spimg2 = $scope.images[2];
		newBus.bus_cover_img = $scope.images[3];
		newBus.spbg1 = $scope.images[4];
		newBus.spbg2 = $scope.images[5];

		for (let i = 6; i < $scope.images.length; i++) {
			$scope.newGallery.push($scope.images[i]);
		}

		newBus.gallery = $scope.newGallery;		
		newBus.user_id = $rootScope.currentUserId;

		mainService.addNewBus(newBus).then(function(response){
			$scope.business = response;
		});
	}


	// UPDATE BUSINESS

	$scope.updateBusiness = (update) => {
		mainService.updateBus(update).then(function(response){
			$scope.resFromDb = response;
			// $location.path('/');
		});
	}

});