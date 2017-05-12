angular.module('merofood').controller('detailsCtrl', function($scope, mainService, $stateParams, $location){
	
	var bid = parseInt($stateParams.id);
	
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


	// GET ALL MENU
	$scope.getMenu = function(){
		mainService.getMenuData(bid).then(function(response){
			$scope.m1 = response;
			mainService.getMenuItemsData(bid).then(function(res){
				let items = res;
				for(let i = 0; i < $scope.m1.length; i++){
					$scope.m1[i].items = [];
					for(let j = 0; j < items.length; j++){
						if(items[j].menuid === $scope.m1[i].menu_id){
							$scope.m1[i].items.push(items[j]);
						}
					}
				}
			});
			// console.log('m1', $scope.m1);
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


	// UPDATE ONE BUSINESS
	$scope.editBusiness = function(b1){
		mainService.selected = b1;
		$location.path('/new-bus');
	}


	// UPDATE FEATURED BUSINESS
	$scope.featureBus = function(featBus){
		// featBus.id = bid;
		console.log(featBus);
		// $location.path('/new-bus');
	}


	// DELETE ONE BUSINESS
	$scope.deleteBusiness = function(id){
		// console.log(id);
		mainService.deleteBus(id).then(function(response){
			// alert('Business Successfully Deleted!');
			$location.path('/');
		});
	}



});