angular.module('merofood').controller('mainCtrl', function($scope, mainService){

	// console.log('mainCtrl running');

	$scope.cardflowSnapPage = {};

	$scope.featured = [];
	$scope.restaurants = [];
	$scope.coffeeCafe = [];
	$scope.bars = [];
	$scope.bakeries = [];
	$scope.desserts = [];
	$scope.takeouts = [];

	$scope.getBusiness = function(){
		mainService.getBusData().then(function(response){
			// $scope.business = response;
			// console.log($scope.business);
			$scope.cards = response.length;
			// console.log($scope.cards)

			for (let i = 0; i < response.length; i++){
				if(response[i].featured === 'yes'){
					$scope.featured.push(response[i]);
				};
			};

			for(let j = 0; j < response.length; j++){
				if(response[j].bus_type === 'Restaurant'){
					$scope.restaurants.push(response[j]);
				}
				if(response[j].bus_type === 'Coffee / Cafe'){
					$scope.coffeeCafe.push(response[j]);
				}
				if(response[j].bus_type === 'Bar'){
					$scope.bars.push(response[j]);
				}
				if(response[j].bus_type === 'Bakery'){
					$scope.bakeries.push(response[j]);
				}
				if(response[j].bus_type === 'Dessert'){
					$scope.desserts.push(response[j]);
				}
				if(response[j].bus_type === 'Food Trucks / Take Outs'){
					$scope.takeouts.push(response[j]);
				}
			};
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