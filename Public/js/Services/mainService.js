angular.module('merofood').service('mainService', function($http){

	var baseUrl = 'http://localhost:3000/';
	
	this.getBusData = function(){
		return $http({
			method: 'GET',
			url: baseUrl + 'businesses'
		}).then(function(response){
			return response.data;
		});
	}

	this.getSpecialData = function(id){
		return $http({
			method: 'GET',
			url: baseUrl + 'special/' + id
		}).then(function(response){
			return response.data;
		});
	}

	// this.getMenuData = function(id){
	// 	return $http({
	// 		method: 'GET',
	// 		url: baseUrl + 'menu/' + id
	// 	}).then(function(response){
	// 		return response.data;
	// 	});
	// }
	this.getMenuData = function(){
		return $http({
			method: 'GET',
			url: baseUrl + 'menu'
		}).then(function(response){
			// console.log(response.data)
			return response.data;
		});
	}


	this.getGalleryData = function(id){
		return $http({
			method: 'GET',
			url: baseUrl + 'gallery/' + id
		}).then(function(response){
			return response.data;
		});
	}

});