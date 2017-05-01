angular.module('merofood', ['ui.router', 'ui.materialize'])
	.config(function($stateProvider, $urlRouterProvider){

		$stateProvider

			.state('home', {
				url: '/',
				templateUrl: '../views/main.html',
				controller: 'mainCtrl'
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
				templateUrl: '../views/new_bus.html'
			});

			// $urlRouterProvider.otherwise('/');

	});