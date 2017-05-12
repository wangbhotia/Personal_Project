angular.module('merofood').controller('mainCtrl', function($scope, mainService, $rootScope){

	$scope.cardflowSnapPage = {};

	$rootScope.featured = [];
	$rootScope.restaurants = [];
	$rootScope.coffeeCafe = [];
	$rootScope.bars = [];
	$rootScope.bakeries = [];
	$rootScope.desserts = [];
	$rootScope.takeouts = [];

	$scope.getBusiness = function(){
		mainService.getBusData().then(function(response){
			// console.log(response);
			$rootScope.searchAllBus = response;
			$scope.cards = response.length;
			// console.log($scope.cards)

			for (let i = 0; i < response.length; i++){
				if(response[i].featured === 'yes'){
					$rootScope.featured.push(response[i]);
				};
			};

			for(let j = 0; j < response.length; j++){
				if(response[j].bus_type === 'Restaurant'){
					$rootScope.restaurants.push(response[j]);
				}
				if(response[j].bus_type === 'Coffee / Cafe'){
					$rootScope.coffeeCafe.push(response[j]);
				}
				if(response[j].bus_type === 'Bar'){
					$rootScope.bars.push(response[j]);
				}
				if(response[j].bus_type === 'Bakery'){
					$rootScope.bakeries.push(response[j]);
				}
				if(response[j].bus_type === 'Dessert'){
					$rootScope.desserts.push(response[j]);
				}
				if(response[j].bus_type === 'Food Trucks / Take Outs'){
					$rootScope.takeouts.push(response[j]);
				}
			};
		});
	}

	$scope.getBusiness();

	$scope.searchBusiness = function(searchKey){
		$rootScope.searchKeyMain = searchKey;
	}

});