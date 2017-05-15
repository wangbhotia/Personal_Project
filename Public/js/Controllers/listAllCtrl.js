angular.module('merofood').controller('listAllCtrl', function($scope, $stateParams, $rootScope){

	let stateType = $stateParams.type;

	$scope.typeTitle = stateType;
	$scope.busType = [];

	if(stateType === 'Featured'){
		$scope.busType = $rootScope.featured;
	}
	if(stateType === 'Restaurants'){
		$scope.busType = $rootScope.restaurants;
	}
	if(stateType === 'Coffee-Cafe'){
		$scope.busType = $rootScope.coffeeCafe;
	}
	if(stateType === 'Bars'){
		$scope.busType = $rootScope.bars;
	}
	if(stateType === 'Bakery'){
		$scope.busType = $rootScope.bakeries;
	}
	if(stateType === 'Dessert'){
		$scope.busType = $rootScope.desserts;
	}
	if(stateType === 'Food-Trucks-Take-Outs'){
		$scope.busType = $rootScope.takeouts;
	}


});