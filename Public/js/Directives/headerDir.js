angular.module('merofood').directive('headerDir', function(){

	return {
		restrict: 'E',
		templateUrl: '../../views/header.html',
		controller: 'userCtrl'
	}
	
});