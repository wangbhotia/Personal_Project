angular.module('merofood').controller('detailsCtrl', function($scope, mainService, $stateParams, $location, scrollSrv, $rootScope){
	
	var bid = parseInt($stateParams.id);
	$scope.toFeatId = bid;
	
	// GET ALL BUSINESSES
	$scope.getAllBus = function(){
		mainService.getBusData().then(function(response){
			// GET ONE BUSINESS WITH MATCHED ID
			for(var i = 0; i < response.length; i++){
				if(response[i].id === bid){
					$scope.b1 = response[i];
				}
			}
		});
	}

	$scope.getAllBus();


	// GET ALL SPECIAL
	$scope.getSpecial = function(){
		mainService.getSpecialData(bid).then(function(response){
			$scope.s1 = response;
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
		});
	}

	$scope.getMenu();


	// GET ALL GALLERY
	$scope.getGallery = function(){
		mainService.getGalleryData(bid).then(function(response){
			$scope.g1 = response;
		});
	}

	$scope.getGallery();


	// UPDATE ONE BUSINESS
	$scope.editBusiness = function(b1){
		mainService.selected = b1;
		$location.path('/new-bus');
	}

	// SHOW SAVE & EXIT BUTTON
	$scope.edit = function(){
		$rootScope.isEditing = true;
	}


	// UPDATE FEATURED BUSINESS
	$scope.featureBus = function(featBus){
		mainService.featureBus(featBus).then(function(response){
			if(response[0].featured === 'yes'){
				Materialize.toast('Your Business is now Featured!', 2000, 'green');
			} 
			if(response[0].featured === 'no'){
				Materialize.toast('Your Business is no longer Featured!', 2000, 'red');
			}
			$location.path('/');
		});
	}


	// DELETE ONE BUSINESS
	$scope.deleteBusiness = function(id){
		mainService.deleteBus(id).then(function(response){
			$location.path('/');
		});
	}
    
	//SCROLL SPY
  $scope.gotoElement = function (eID){
  	$location.hash(eID);
  	scrollSrv.scrollTo(eID); 
  };

});