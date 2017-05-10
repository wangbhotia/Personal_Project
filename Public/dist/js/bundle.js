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
		templateUrl: '../views/new_bus.html',
		controller: 'formsCtrl'
	});

	$urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('merofood').controller('detailsCtrl', function ($scope, mainService, $stateParams, $location) {

	var bid = parseInt($stateParams.id);

	// GET ALL BUSINESSES
	$scope.getAllBus = function () {
		mainService.getBusData().then(function (response) {
			// console.log(response);

			// GET ONE BUSINESS WITH MATCHED ID
			for (var i = 0; i < response.length; i++) {
				if (response[i].id === bid) {
					$scope.b1 = response[i];
					// console.log($scope.b1);
				}
			}
		});
	};

	$scope.getAllBus();

	// GET ALL SPECIAL
	$scope.getSpecial = function () {
		mainService.getSpecialData(bid).then(function (response) {
			$scope.s1 = response;
			// console.log($scope.s1);
		});
	};

	$scope.getSpecial();

	// GET ALL MENU
	$scope.getMenu = function () {
		mainService.getMenuData(bid).then(function (response) {
			$scope.m1 = response;
			mainService.getMenuItemsData(bid).then(function (res) {
				var items = res;
				for (var i = 0; i < $scope.m1.length; i++) {
					$scope.m1[i].items = [];
					for (var j = 0; j < items.length; j++) {
						if (items[j].menuid === $scope.m1[i].menu_id) {
							$scope.m1[i].items.push(items[j]);
						}
					}
				}
			});
			// console.log('m1', $scope.m1);
		});
	};

	$scope.getMenu();

	// GET ALL GALLERY
	$scope.getGallery = function () {
		mainService.getGalleryData(bid).then(function (response) {
			$scope.g1 = response;
			// console.log($scope.g1)
		});
	};

	$scope.getGallery();

	// UPDATE ONE BUSINESS
	$scope.editBusiness = function (b1) {
		mainService.selected = b1;
		$location.path('/new-bus');
	};

	// DELETE ONE BUSINESS
	$scope.deleteBusiness = function (id) {
		console.log(id);
		mainService.deleteBus(id).then(function (response) {
			alert('Business Successfully Deleted!!');
			$location.path('/');
		});
	};
});
'use strict';

angular.module('merofood').controller('formsCtrl', function ($scope, mainService, $location) {

	$scope.images = [];
	$scope.newBus = mainService.selected;
	// console.log($scope.images);
	$scope.addBus = function (newBus) {
		// console.log('addBus fn fired!!!');
		newBus.bus_logo = $scope.images[0];
		newBus.spimg1 = $scope.images[1];
		newBus.spimg2 = $scope.images[2];
		newBus.bus_cover_img = $scope.images[3];
		newBus.spbg1 = $scope.images[4];
		newBus.spbg2 = $scope.images[5];

		console.log(newBus);

		mainService.addNewBus(newBus).then(function (response) {
			// console.log(respose);
			$scope.business = response;
		});
	};

	// UPDATE BUSINESS

	$scope.updateBusiness = function (update) {
		mainService.updateBus(update).then(function (response) {
			$scope.resFromDb = response;
			// console.log('update res: ', response);
			// $location.path('/');
		});
	};
});
'use strict';

angular.module('merofood').controller('mainCtrl', function ($scope, mainService) {

	// console.log('mainCtrl running');

	$scope.getBusiness = function () {
		mainService.getBusData().then(function (response) {
			$scope.business = response;
			// console.log($scope.business);
		});
	};

	$scope.getBusiness();

	// $scope.getSpecial = function(){
	// 	mainService.getSpecialData().then(function(response){
	// 		$scope.special = response;
	// 		// console.log($scope.special);
	// 	});
	// }

	// $scope.getSpecial();
});
'use strict';

angular.module('merofood').directive('fileread', function (imageService) {
  return {
    restrict: 'A',
    link: function link(scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {
          // debugger;
          var fileread = loadEvent.target.result;
          // console.warn(fileread);

          // console.log('elem: ', elem);
          var tempArray = elem[0].value.split('\\');
          var fileName = tempArray[tempArray.length - 1];

          imageService.storeImage(fileread, fileName).then(function (result) {
            console.log(result.data.Location);
            scope.images.push(result.data.Location);
            // console.log('fileread: ', scope.images);
          }).catch(function (err) {
            console.error(err);
          });
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  };
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

angular.module('merofood').factory('imageService', function ($http) {
  // AMAZON S3

  var service = {};

  service.storeImage = function (imageData, fileName) {
    var imageExtension = imageData.split(';')[0].split('/');
    imageExtension = imageExtension[imageExtension.length - 1];

    var newImage = {
      imageName: fileName,
      imageBody: imageData,
      imageExtension: imageExtension,
      userEmail: 'wangbhotia@gamil.com'
    };

    return $http.post('/newimage', newImage);
  };
  return service;
});
'use strict';

angular.module('merofood').service('mainService', function ($http) {

	var baseUrl = 'http://localhost:3000/';

	this.selected = {};

	// GET ROUTES

	this.getBusData = function () {
		return $http({
			method: 'GET',
			url: baseUrl + 'businesses'
		}).then(function (response) {
			return response.data;
		});
	};

	this.getSpecialData = function (id) {
		return $http({
			method: 'GET',
			url: baseUrl + 'special/' + id
		}).then(function (response) {
			return response.data;
		});
	};

	this.getMenuData = function (id) {
		return $http({
			method: 'GET',
			url: baseUrl + 'menu/' + id
		}).then(function (response) {
			return response.data;
		});
	};

	this.getMenuItemsData = function (id) {
		return $http({
			method: 'GET',
			url: baseUrl + 'menuitems/' + id
		}).then(function (response) {
			return response.data;
		});
	};

	this.getGalleryData = function (id) {
		return $http({
			method: 'GET',
			url: baseUrl + 'gallery/' + id
		}).then(function (response) {
			return response.data;
		});
	};

	// POST ROUTE

	this.addNewBus = function (newBus) {
		return $http({
			method: 'POST',
			url: baseUrl + 'createbus',
			data: newBus
		}).then(function (response) {
			return response;
		});
	};

	// PUT ROUTE -- UPDATE

	this.updateBus = function (updatedBus) {
		return $http({
			method: 'PUT',
			url: baseUrl + 'updatebus',
			data: updatedBus
		}).then(function (response) {
			return response.data;
		});
	};

	// DELETE ROUTE

	this.deleteBus = function (id) {
		return $http({
			method: 'DELETE',
			url: baseUrl + 'deletebus/' + id
		}).then(function (response) {
			return response;
		});
	};
});
//# sourceMappingURL=bundle.js.map
