angular.module('merofood').service('mainService', function($http){

	this.selected = {};

	// GET ROUTES
	
	this.getBusData = () => {
		return $http({
			method: 'GET',
			url: 'businesses'
		}).then(function(response){
			return response.data;
		});
	}

	this.getSpecialData = (id) => {
		return $http({
			method: 'GET',
			url: 'special/' + id
		}).then(function(response){
			return response.data;
		});
	}

	this.getMenuData = (id) => {
		return $http({
			method: 'GET',
			url: 'menu/' + id
		}).then(function(response){
			return response.data;
		});
	}

	this.getMenuItemsData = (id) => {
		return $http({
			method: 'GET',
			url: 'menuitems/' + id
		}).then(function(response){
			return response.data;
		});
	}


	this.getGalleryData = (id) => {
		return $http({
			method: 'GET',
			url: 'gallery/' + id
		}).then(function(response){
			return response.data;
		});
	}


	// POST ROUTE

	this.addNewBus = (newBus) => {
		return $http({
			method: 'POST',
			url: 'createbus',
			data: newBus
		}).then(function(response){
			return response;
		});
	}


	// PUT ROUTE -- UPDATE

	this.updateBus = (updatedBus) => {
		return $http({
			method: 'PUT',
			url: 'updatebus',
			data: updatedBus
		}).then(function(response){
			return response.data;
		});
	}


	// FEATURE BUSINESS

	this.featureBus = (feat) => {
		return $http({
			method: 'PUT',
			url: 'featbus',
			data: feat
		}).then(function(response){
			return response.data;
		});
	}


	// DELETE ROUTE

	this.deleteBus = (id) => {
		return $http({
			method: 'DELETE',
			url: 'deletebus/' + id,
		}).then(function(response){
			return response;
		});
	}

});
