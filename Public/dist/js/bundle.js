'use strict';

angular.module('merofood', ['ui.router', 'ui.materialize', 'angular-cardflow']).config(function ($stateProvider, $urlRouterProvider, $uiViewScrollProvider) {

			$stateProvider.state('home', {
						url: '/',
						templateUrl: '../views/main.html',
						controller: 'mainCtrl'
			}).state('all', {
						url: '/all/:type',
						templateUrl: '../views/list_all.html',
						controller: 'listAllCtrl'
			}).state('search', {
						url: '/search',
						templateUrl: '../views/search.html',
						controller: 'searchCtrl'
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

			$uiViewScrollProvider.useAnchorScroll();
});
'use strict';

angular.module('merofood').controller('detailsCtrl', function ($scope, mainService, $stateParams, $location, scrollSrv, $rootScope) {

	var bid = parseInt($stateParams.id);
	$scope.toFeatId = bid;

	// GET ALL BUSINESSES
	$scope.getAllBus = function () {
		mainService.getBusData().then(function (response) {
			// GET ONE BUSINESS WITH MATCHED ID
			for (var i = 0; i < response.length; i++) {
				if (response[i].id === bid) {
					$scope.b1 = response[i];
				}
			}
		});
	};

	$scope.getAllBus();

	// GET ALL SPECIAL
	$scope.getSpecial = function () {
		mainService.getSpecialData(bid).then(function (response) {
			$scope.s1 = response;
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
		});
	};

	$scope.getMenu();

	// GET ALL GALLERY
	$scope.getGallery = function () {
		mainService.getGalleryData(bid).then(function (response) {
			$scope.g1 = response;
		});
	};

	$scope.getGallery();

	// UPDATE ONE BUSINESS
	$scope.editBusiness = function (b1) {
		mainService.selected = b1;
		$location.path('/new-bus');
	};

	// SHOW SAVE & EXIT BUTTON
	$scope.edit = function () {
		$rootScope.isEditing = true;
	};

	// UPDATE FEATURED BUSINESS
	$scope.featureBus = function (featBus) {
		mainService.featureBus(featBus).then(function (response) {
			if (response[0].featured === 'yes') {
				Materialize.toast('Your Business is now Featured!', 2000, 'green');
			}
			if (response[0].featured === 'no') {
				Materialize.toast('Your Business is no longer Featured!', 2000, 'red');
			}
			$location.path('/');
		});
	};

	// DELETE ONE BUSINESS
	$scope.deleteBusiness = function (id) {
		mainService.deleteBus(id).then(function (response) {
			$location.path('/');
		});
	};

	//SCROLL SPY
	$scope.gotoElement = function (eID) {
		$location.hash(eID);
		scrollSrv.scrollTo(eID);
	};
});
'use strict';

angular.module('merofood').controller('formsCtrl', function ($scope, mainService, $location, $rootScope) {

	$scope.images = [];
	$scope.newGallery = [];
	$scope.newBus = mainService.selected;

	$scope.addBus = function (newBus) {
		// console.log('addBus fn fired!!!');
		newBus.bus_logo = $scope.images[0];
		newBus.spimg1 = $scope.images[1];
		newBus.spimg2 = $scope.images[2];
		newBus.bus_cover_img = $scope.images[3];
		newBus.spbg1 = $scope.images[4];
		newBus.spbg2 = $scope.images[5];

		for (var i = 6; i < $scope.images.length; i++) {
			$scope.newGallery.push($scope.images[i]);
		}

		newBus.gallery = $scope.newGallery;
		newBus.user_id = $rootScope.currentUserId;

		mainService.addNewBus(newBus).then(function (response) {
			$scope.business = response;
		});
	};

	// UPDATE BUSINESS

	$scope.updateBusiness = function (update) {
		mainService.updateBus(update).then(function (response) {
			$scope.resFromDb = response;
			// $location.path('/');
		});
	};
});
'use strict';

angular.module('merofood').controller('listAllCtrl', function ($scope, $stateParams, $rootScope) {

	var stateType = $stateParams.type;

	$scope.typeTitle = stateType;
	$scope.busType = [];

	if (stateType === 'Featured') {
		$scope.busType = $rootScope.featured;
	}
	if (stateType === 'Restaurants') {
		$scope.busType = $rootScope.restaurants;
	}
	if (stateType === 'Coffee-Cafe') {
		$scope.busType = $rootScope.coffeeCafe;
	}
	if (stateType === 'Bars') {
		$scope.busType = $rootScope.bars;
	}
	if (stateType === 'Bakery') {
		$scope.busType = $rootScope.bakeries;
	}
	if (stateType === 'Dessert') {
		$scope.busType = $rootScope.desserts;
	}
	if (stateType === 'Food-Trucks-Take-Outs') {
		$scope.busType = $rootScope.takeouts;
	}
});
'use strict';

angular.module('merofood').controller('mainCtrl', function ($scope, mainService, $rootScope) {

	$scope.dataFromServer = false;

	$rootScope.featured = [];
	$rootScope.restaurants = [];
	$rootScope.coffeeCafe = [];
	$rootScope.bars = [];
	$rootScope.bakeries = [];
	$rootScope.desserts = [];
	$rootScope.takeouts = [];

	$scope.getBusiness = function () {
		mainService.getBusData().then(function (response) {
			// console.log(response);
			$rootScope.searchAllBus = response;

			for (var i = 0; i < response.length; i++) {
				if (response[i].featured === 'yes') {
					$rootScope.featured.push(response[i]);
				};
			};

			for (var j = 0; j < response.length; j++) {
				if (response[j].bus_type === 'Restaurant') {
					$rootScope.restaurants.push(response[j]);
				}
				if (response[j].bus_type === 'Coffee / Cafe') {
					$rootScope.coffeeCafe.push(response[j]);
				}
				if (response[j].bus_type === 'Bar') {
					$rootScope.bars.push(response[j]);
				}
				if (response[j].bus_type === 'Bakery') {
					$rootScope.bakeries.push(response[j]);
				}
				if (response[j].bus_type === 'Dessert') {
					$rootScope.desserts.push(response[j]);
				}
				if (response[j].bus_type === 'Food Trucks / Take Outs') {
					$rootScope.takeouts.push(response[j]);
				}
			};
			$scope.dataFromServer = true;
		});
	};

	$scope.getBusiness();

	$scope.searchBusiness = function (searchKey) {
		$rootScope.searchKeyMain = searchKey;
	};
});
'use strict';

angular.module('merofood').controller('searchCtrl', function ($scope, $rootScope) {

	$scope.allBusForSearch = $rootScope.searchAllBus;
});
'use strict';

angular.module('merofood').controller('userCtrl', function ($scope, userService, $state, $rootScope, $location) {

  function getUser() {
    userService.getUser().then(function (user) {
      if (user) {
        $scope.user = user.first_name;
        $rootScope.currentUserId = user.id;
        $rootScope.currentUserEmail = user.email;
        $rootScope.isLoggedIn = true;
      } else {
        $scope.user = 'Sign In';
        $rootScope.isLoggedIn = false;
      }
    });
  }

  getUser();

  $rootScope.isSignedIn = function () {
    if ($rootScope.isLoggedIn) {
      $location.path('new-bus');
    } else {
      Materialize.toast('Please Sign In First.', 2000, 'red');
    }
  };

  $scope.loginLocal = function (username, password) {
    console.log('Logging in with', username, password);
    userService.loginLocal({
      username: username,
      password: password
    }).then(function (res) {
      getUser();
    });
  };

  $scope.logout = userService.logout;
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
		templateUrl: '../../views/header.html',
		controller: 'userCtrl'
	};
});
'use strict';

var $scope, $location;

angular.module('merofood').service('scrollSrv', function () {

    this.scrollTo = function (eID) {

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;if (leapY > stopY) leapY = stopY;timer++;
            }return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;if (leapY < stopY) leapY = stopY;timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            }return y;
        }
    };
});
'use strict';

angular.module('merofood').factory('imageService', function ($http, $rootScope) {
  // AMAZON S3

  var service = {};

  service.storeImage = function (imageData, fileName) {
    var imageExtension = imageData.split(';')[0].split('/');
    imageExtension = imageExtension[imageExtension.length - 1];

    var newImage = {
      imageName: fileName,
      imageBody: imageData,
      imageExtension: imageExtension,
      userEmail: $rootScope.currentUserEmail
    };

    return $http.post('/newimage', newImage);
  };
  return service;
});
'use strict';

angular.module('merofood').service('mainService', function ($http) {

	this.selected = {};

	// GET ROUTES

	this.getBusData = function () {
		return $http({
			method: 'GET',
			url: 'businesses'
		}).then(function (response) {
			return response.data;
		});
	};

	this.getSpecialData = function (id) {
		return $http({
			method: 'GET',
			url: 'special/' + id
		}).then(function (response) {
			return response.data;
		});
	};

	this.getMenuData = function (id) {
		return $http({
			method: 'GET',
			url: 'menu/' + id
		}).then(function (response) {
			return response.data;
		});
	};

	this.getMenuItemsData = function (id) {
		return $http({
			method: 'GET',
			url: 'menuitems/' + id
		}).then(function (response) {
			return response.data;
		});
	};

	this.getGalleryData = function (id) {
		return $http({
			method: 'GET',
			url: 'gallery/' + id
		}).then(function (response) {
			return response.data;
		});
	};

	// POST ROUTE

	this.addNewBus = function (newBus) {
		return $http({
			method: 'POST',
			url: 'createbus',
			data: newBus
		}).then(function (response) {
			return response;
		});
	};

	// PUT ROUTE -- UPDATE

	this.updateBus = function (updatedBus) {
		return $http({
			method: 'PUT',
			url: 'updatebus',
			data: updatedBus
		}).then(function (response) {
			return response.data;
		});
	};

	// FEATURE BUSINESS

	this.featureBus = function (feat) {
		return $http({
			method: 'PUT',
			url: 'featbus',
			data: feat
		}).then(function (response) {
			return response.data;
		});
	};

	// DELETE ROUTE

	this.deleteBus = function (id) {
		return $http({
			method: 'DELETE',
			url: 'deletebus/' + id
		}).then(function (response) {
			return response;
		});
	};
});
'use strict';

angular.module('merofood').service('userService', function ($http) {

  this.loginLocal = function (credentials) {
    return $http({
      method: "POST",
      url: '/auth/local',
      data: credentials
    }).then(function (res) {
      // console.log(res);
      return res.data;
    }).catch(function (err) {
      console.log('ERROR LOGGING IN!', err);
    });
  };

  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/auth/me'
    }).then(function (res) {
      // console.log(res)
      return res.data;
    }).catch(function (err) {
      // console.log(err);
    });
  };

  this.logout = function () {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    }).then(function (res) {
      // console.log(res.data)
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
});
//# sourceMappingURL=bundle.js.map
