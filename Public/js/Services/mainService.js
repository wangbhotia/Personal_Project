angular.module('merofood').service('mainService', function($http){

	var baseUrl = 'http://localhost:3000/';

	// GET ROUTES
	
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

	this.getMenuData = function(id){
		return $http({
			method: 'GET',
			url: baseUrl + 'menu/' + id
		}).then(function(response){
			return response.data;
		});
	}

	this.getMenuItemsData = function(id){
		return $http({
			method: 'GET',
			url: baseUrl + 'menuitems/' + id
		}).then(function(response){
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


	// POST ROUTES

	this.addNewBus = function(newBus){
		return $http({
			method: 'POST',
			url: baseUrl + 'createbus',
			data: newBus
		}).then(function(response){
			return response;
		});
	}


	// DELETE ROUTE

	this.deleteBus = function(id){
		return $http({
			method: 'DELETE',
			url: baseUrl + 'deletebus/' + id,
		}).then(function(response){
			return response;
		});
	}

});