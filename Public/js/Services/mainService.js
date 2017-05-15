angular.module('merofood').service('mainService', function($http){

	var baseUrl = 'http://localhost:3000/';

	this.selected = {};

	// GET ROUTES
	
	this.getBusData = () => {
		return $http({
			method: 'GET',
			url: baseUrl + 'businesses'
		}).then(function(response){
			return response.data;
		});
	}

	this.getSpecialData = (id) => {
		return $http({
			method: 'GET',
			url: baseUrl + 'special/' + id
		}).then(function(response){
			return response.data;
		});
	}

	this.getMenuData = (id) => {
		return $http({
			method: 'GET',
			url: baseUrl + 'menu/' + id
		}).then(function(response){
			return response.data;
		});
	}

	this.getMenuItemsData = (id) => {
		return $http({
			method: 'GET',
			url: baseUrl + 'menuitems/' + id
		}).then(function(response){
			return response.data;
		});
	}


	this.getGalleryData = (id) => {
		return $http({
			method: 'GET',
			url: baseUrl + 'gallery/' + id
		}).then(function(response){
			return response.data;
		});
	}


	// POST ROUTE

	this.addNewBus = (newBus) => {
		return $http({
			method: 'POST',
			url: baseUrl + 'createbus',
			data: newBus
		}).then(function(response){
			return response;
		});
	}


	// PUT ROUTE -- UPDATE

	this.updateBus = (updatedBus) => {
		return $http({
			method: 'PUT',
			url: baseUrl + 'updatebus',
			data: updatedBus
		}).then(function(response){
			return response.data;
		});
	}


	// FEATURE BUSINESS

	this.featureBus = (feat) => {
		return $http({
			method: 'PUT',
			url: baseUrl + 'featbus',
			data: feat
		}).then(function(response){
			return response.data;
		});
	}


	// DELETE ROUTE

	this.deleteBus = (id) => {
		return $http({
			method: 'DELETE',
			url: baseUrl + 'deletebus/' + id,
		}).then(function(response){
			return response;
		});
	}

});
