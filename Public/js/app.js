angular.module('merofood', ['ui.router', 'ui.materialize', 'angular-cardflow'])
	.config(function($stateProvider, $urlRouterProvider, $uiViewScrollProvider){

		$stateProvider

			.state('home', {
				url: '/',
				templateUrl: '../views/main.html',
				controller: 'mainCtrl'
			})

			.state('all', {
				url: '/all/:type',
				templateUrl: '../views/list_all.html',
				controller: 'listAllCtrl'
			})

			.state('search', {
				url: '/search',
				templateUrl: '../views/search.html',
				controller: 'searchCtrl'
			})

			.state('b', {
				url: '/b/:id',
				templateUrl: '../views/merofood_default.html',
				controller: 'detailsCtrl'
			})

			.state('default', {
				url: '/default',
				templateUrl: '../views/merofood_default.html'
			})

			.state('night', {
				url: '/night',
				templateUrl: '../views/merofood_night.html'
			})

			.state('new-bus', { //Only if a User is logged in
				url: '/new-bus',
				templateUrl: '../views/new_bus.html',
				controller: 'formsCtrl'
			});

			$urlRouterProvider.otherwise('/');

			$uiViewScrollProvider.useAnchorScroll();

	});