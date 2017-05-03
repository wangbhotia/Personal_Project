angular.module('merofood').service('mainService', function($http){

	var baseUrl = 'http://localhost:3000';

	// this.getData = function(){
	// 	return $http.get('seed_data.json');
	// }
	
	this.getData = function(){
		return $http({
			method: 'GET',
			url: baseUrl
		}).then(function(response){
			console.log(response);
			return response;
		});
	}

});