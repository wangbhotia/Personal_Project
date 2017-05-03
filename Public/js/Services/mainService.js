angular.module('merofood').service('mainService', function($http){

	this.getData = function(){
		return $http.get('seed_data.json');
	}
	
});