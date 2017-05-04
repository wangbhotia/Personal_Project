angular.module('merofood').controller('detailsCtrl', function($scope, mainService, $stateParams){
	
	var bid = parseInt($stateParams.id);
	//var menuArray = [];

	// GET ALL BUSINESSES
	$scope.getAllBus = function(){
		mainService.getBusData().then(function(response){
			// console.log(response);

			// GET ONE BUSINESS WITH MATCHED ID
			for(var i = 0; i < response.length; i++){
				if(response[i].id === bid){
					$scope.b1 = response[i];
					// console.log($scope.b1);
				}
			}
		});
	}

	$scope.getAllBus();


	// GET ALL SPECIAL
	$scope.getSpecial = function(){
		mainService.getSpecialData(bid).then(function(response){
			$scope.s1 = response;
			// console.log($scope.s1);
		});
	}

	$scope.getSpecial();


	// GET ALL MENUe
	$scope.getMenu = function(){
		mainService.getMenuData().then(function(response){
			$scope.m1 = response;
			// console.log($scope.m1);
			$scope.itemdesc = $scope.m1.itemdesc
		});
	}

	$scope.getMenu();


	// GET ALL GALLERY
	$scope.getGallery = function(){
		mainService.getGalleryData(bid).then(function(response){
			$scope.g1 = response;
			// console.log($scope.g1)
		});
	}

	$scope.getGallery();



});