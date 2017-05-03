angular.module('merofood').controller('detailsCtrl', function($scope, mainService, $stateParams){
	
	var menuArray = [];

	// GET ALL BUSINESSES
	$scope.getBusiness = function(){
		mainService.getData().then(function(response){
			$scope.business = response.data;
			console.log($scope.business);

			// GET ONE BUSINESS WITH MATCHED ID
			for(var i = 0; i < $scope.business.length; i++){
				if($scope.business[i].id === parseInt($stateParams.id)){
					$scope.b1 = $scope.business[i];
					// console.log($scope.b1);

					// LOOPING THROUGH OBJECTS AND ARRAYS WITHIN TO FIND MENU ITEMS
					for(var key in $scope.b1){
						if(key === "bus_menu"){
							$scope.b1m1 = $scope.b1[key];
							// console.log($scope.b1m1);

							for(var j = 0; j < $scope.b1m1.length; j++){
								menuArray.push($scope.b1m1[j]);
								// console.log(menuArray);
							}
						}
					}
					$scope.bMenu = menuArray;
				}
			}
		});
	}

	$scope.getBusiness();

});