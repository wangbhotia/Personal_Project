'use strict';

angular.module('merofood', ['ui.router', 'ui.materialize']).config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url: '/',
		templateUrl: '../views/main.html',
		controller: 'mainCtrl'
	}).state('b', {
		url: '/b/:id',
		templateUrl: '../views/merofood_default.html',
		controller: 'detailsCtrl'
	}).state('default', {
		url: '/default',
		templateUrl: '../views/merofood_default.html'
	}).state('night', {
		url: '/night',
		templateUrl: '../views/merofood_night.html'
	}).state('new-bus', { //Only if a User is logged in
		url: '/new-bus',
		templateUrl: '../views/new_bus.html'
	});

	$urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('merofood').controller('detailsCtrl', function ($scope, mainService, $stateParams) {

	var menuArray = [];

	// GET ALL BUSINESSES
	$scope.getBusiness = function () {
		mainService.getData().then(function (response) {
			$scope.business = response.data;
			// console.log($scope.business);

			// GET ONE BUSINESS WITH MATCHED ID
			for (var i = 0; i < $scope.business.length; i++) {
				if ($scope.business[i].id === parseInt($stateParams.id)) {
					$scope.b1 = $scope.business[i];
					// console.log($scope.b1);

					// LOOPING THROUGH OBJECTS AND ARRAYS WITHIN TO FIND MENU ITEMS
					for (var key in $scope.b1) {
						if (key === "bus_menu") {
							$scope.b1m1 = $scope.b1[key];
							// console.log($scope.b1m1);

							for (var j = 0; j < $scope.b1m1.length; j++) {
								menuArray.push($scope.b1m1[j]);
								// console.log(menuArray);
							}
						}
					}
					$scope.bMenu = menuArray;
				}
			}
		});
	};

	$scope.getBusiness();
});
'use strict';

angular.module('merofood').controller('mainCtrl', function ($scope, mainService) {

	$scope.getBusiness = function () {
		mainService.getData().then(function (response) {
			$scope.business = response;
			console.log($scope.business);
		});
	};

	$scope.getBusiness();
});
'use strict';

angular.module('merofood').directive('footerDir', function () {

	return {
		restrict: 'E',
		templateUrl: '../../views/footer.html'
	};
});
'use strict';

angular.module('merofood').directive('headerDir', function () {

	return {
		restrict: 'E',
		templateUrl: '../../views/header.html'
	};
});
"use strict";
'use strict';

angular.module('merofood').directive('scrollSpy', function () {

	return {
		link: function link(scope, element, attrs) {
			element.click(function () {
				element.scrollSpy();
				// console.log('Scroll Spy Fired!!!!');
			});
		}
	};
});
'use strict';

angular.module('merofood').service('mainService', function ($http) {

	var baseUrl = 'http://localhost:3000/';

	// this.getData = function(){
	// 	return $http.get('seed_data.json');
	// }

	this.getData = function () {
		return $http({
			method: 'GET',
			url: baseUrl + 'businesses'
		}).then(function (response) {
			console.log(response.data);
			return response.data;
		});
	};
});
//# sourceMappingURL=bundle.js.map
