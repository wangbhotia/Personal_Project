'use strict';

angular.module('merofood', ['ui.router', 'ui.materialize', 'angular-cardflow']).config(function ($stateProvider, $urlRouterProvider) {

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

(function () {
    // set prefixed matrix transform without changing other elements of matrix
    // I tried out matrix3d, but it had visual artifacts in chrome
    var setTransform = function setTransform(element, matrix) {
        var transform;
        var t = window.getComputedStyle(element);
        var prefix;
        if (t) {
            angular.forEach(['moz', 'o', 'webkit'], function (p) {
                if (t[p + 'Transform']) {
                    transform = t[p + 'Transform'];
                    prefix = p;
                }
            });

            if (transform) {
                var m = transform.match(/\d+/g);
                if (m && m.length == 6) {
                    m = m.map(function (e) {
                        return Number(e);
                    });
                } else {
                    m = [1, 0, 0, 1, 0, 0];
                }
            } else {
                m = [1, 0, 0, 1, 0, 0];
            }

            for (var i = 0; i < 6; i++) {
                if (matrix[i] !== undefined) {
                    m[i] = matrix[i];
                }
            }
            var css = {};
            if (!prefix) {
                css['transform'] = 'matrix(' + m.join(',') + ')';
            } else {
                css[prefix + 'Transform'] = 'matrix(' + m.join(',') + ')';
            }
            angular.element(element).css(css);
        }
    };

    var module = angular.module('angular-cardflow', ['ngTouch']);

    module.directive('cardflow', ['$swipe', '$timeout', function ($swipe, $timeout) {
        return {
            'restrict': 'E',
            'template': '<div class="cardflow-wrapper" ng-swipe-left="swipeLeft($event)" ng-swipe-right="swipeRight($event)"><div class="cardflow-container" ng-transclude></div></div>',
            'transclude': true,
            'scope': { 'model': '=?', 'mode': '=?', 'current': '=?' },
            link: function link(scope, element, attrs) {
                // next available tick, so element is populated with transcluded content
                $timeout(function () {
                    scope.model = scope.model || {};
                    scope.model.cardWidth = 0;
                    scope.model.wrapperEl = angular.element(element.find('div')[0]);
                    scope.model.containerEl = angular.element(scope.model.wrapperEl.find('div')[0]);
                    scope.model.current = scope.current || scope.model.current || 0;
                    scope.model.cards = scope.model.cards || [];
                    scope.mode = attrs.mode || 'swipeSnapKinetic';
                    scope.model.increment = 1;

                    // wrapper for just setting X-transform of scope.model.containerEl[0]
                    function setPositionX(position) {
                        setTransform(scope.model.containerEl[0], [undefined, undefined, undefined, undefined, position, undefined]);
                    }

                    scope.model.setPositionX = setPositionX;

                    // track cards list, but use scope.model.cardEls just in case no model was set
                    scope.$watch(function () {
                        return scope.model.cards;
                    }, function () {
                        scope.model.cardEls = scope.model.containerEl.children();
                        if (scope.model.cardEls && scope.model.cardEls[1]) {
                            scope.model.cardWidth = scope.model.cardEls[1].offsetLeft - scope.model.cardEls[0].offsetLeft;

                            if (scope.model.cardWidth === 0) {
                                scope.model.cardWidth = scope.model.cardEls[0].offsetWidth;
                            }

                            var totalWidth = scope.model.cardWidth * scope.model.cardEls.length + scope.model.cardEls[1].offsetLeft;
                            //set container to wide enough to keep  from wrapping
                            scope.model.containerEl.css({ 'width': totalWidth + 'px' });

                            scope.model.pageSize = Math.floor(scope.model.wrapperEl[0].clientWidth / scope.model.cardWidth);
                            scope.model.increment = scope.mode == 'swipeSnapOne' ? 1 : scope.model.pageSize;
                        }
                    });

                    if (scope.mode != 'swipe') {
                        scope.$watch(function () {
                            return scope.model.current;
                        }, function () {
                            if (scope.model.cardEls) {
                                scope.model.cardEls.removeClass('cardflow-active');
                                var current = angular.element(scope.model.cardEls[scope.model.current]);
                                current.addClass('cardflow-active');
                                if (scope.model.cardWidth) {
                                    setPositionX(scope.model.cardWidth * -scope.model.current);
                                }
                            }
                        });
                    }

                    if (scope.mode == 'swipeSnapOne' || scope.mode == 'swipeSnapPage') {
                        scope.swipeLeft = function () {
                            var current = scope.model.current + scope.model.increment;
                            if (current < scope.model.cardEls.length) {
                                scope.model.current = current;
                            }
                        };
                        scope.swipeRight = function () {
                            var current = scope.model.current - scope.model.increment;
                            if (current >= 0) {
                                scope.model.current = current;
                            }
                        };
                    }

                    if (scope.mode == 'swipeSnap' || scope.mode == 'swipeSnapKinetic' || scope.mode == 'swipe') {

                        // store transition
                        var transition = {};
                        var t = window.getComputedStyle(scope.model.containerEl[0])['transition'];
                        if (t) {
                            transition.transition = t + '';
                        }
                        angular.forEach(['moz', 'o', 'webkit', 'ms'], function (p) {
                            t = window.getComputedStyle(scope.model.containerEl[0])[p + 'Transition'];
                            if (t) {
                                transition[p + 'Transition'] = t;
                            }
                        });

                        var offset = 0,
                            position = 0,
                            velocity = 0,
                            timestamp;

                        $swipe.bind(scope.model.wrapperEl, {
                            start: function start(coords) {
                                scope.model.cardEls.removeClass('cardflow-active');
                                offset = scope.mode == 'swipe' ? coords.x - position : coords.x;

                                // remove transition
                                angular.forEach(['moz', 'o', 'webkit', 'ms'], function (p) {
                                    scope.model.containerEl.css(p + 'Transition', 'none');
                                });
                                scope.model.containerEl.css({ 'transition': 'none' });

                                if (scope.mode == 'swipeSnapKinetic') {
                                    velocity = 0;
                                    timestamp = Date.now();
                                }
                            },
                            end: function end(coords) {
                                // restore transition
                                scope.model.containerEl.css(transition);

                                if (scope.mode != 'swipe') {
                                    // figure out current card from position
                                    var current = Math.floor(position / -scope.model.cardWidth + 0.5);

                                    if (scope.mode == 'swipeSnapKinetic') {
                                        //  calculate velocity here
                                        var now = Date.now();
                                        var elapsed = now - timestamp;
                                        var distance = offset - coords.x;
                                        var velocity = distance / elapsed;

                                        if (Math.abs(velocity) > 1) {
                                            current = Math.floor(current + velocity);
                                        }
                                    }

                                    if (current >= 0) {
                                        if (current > scope.model.cardEls.length - 1) {
                                            current = scope.model.cardEls.length - 1;
                                        }
                                    } else {
                                        current = 0;
                                    }

                                    // trigger update
                                    if (scope.model.current == current) {
                                        scope.model.current = -1;
                                        scope.$apply();
                                    }
                                    scope.model.current = current;
                                    scope.$apply();
                                }
                            },
                            move: function move(coords) {
                                // move cards to current position
                                if (scope.mode != 'swipe') {
                                    position = coords.x - scope.model.current * scope.model.cardWidth - offset;
                                } else {
                                    position = coords.x - offset;
                                }

                                setPositionX(position);
                            }
                        });
                    }
                });
            }
        };
    }]);
})();
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

	// UPDATE FEATURED BUSINESS
	$scope.featureBus = function (featBus) {
		// featBus.id = bid;
		console.log(featBus);
		// $location.path('/new-bus');
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

	$scope.cardflowSnapPage = {};

	$scope.featured = [];
	$scope.restaurants = [];
	$scope.coffeeCafe = [];
	$scope.bars = [];
	$scope.bakeries = [];
	$scope.desserts = [];
	$scope.takeouts = [];

	$scope.getBusiness = function () {
		mainService.getBusData().then(function (response) {
			// $scope.business = response;
			// console.log($scope.business);
			$scope.cards = response.length;
			// console.log($scope.cards)

			for (var i = 0; i < response.length; i++) {
				if (response[i].featured === 'yes') {
					$scope.featured.push(response[i]);
				};
			};

			for (var j = 0; j < response.length; j++) {
				if (response[j].bus_type === 'Restaurant') {
					$scope.restaurants.push(response[j]);
				}
				if (response[j].bus_type === 'Coffee / Cafe') {
					$scope.coffeeCafe.push(response[j]);
				}
				if (response[j].bus_type === 'Bar') {
					$scope.bars.push(response[j]);
				}
				if (response[j].bus_type === 'Bakery') {
					$scope.bakeries.push(response[j]);
				}
				if (response[j].bus_type === 'Dessert') {
					$scope.desserts.push(response[j]);
				}
				if (response[j].bus_type === 'Food Trucks / Take Outs') {
					$scope.takeouts.push(response[j]);
				}
			};
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
            // console.log(result.data.Location);
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
