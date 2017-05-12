angular.module('merofood').service('userService', function($http){

  this.loginLocal = function(credentials){
    return $http({
      method: "POST",
      url: '/auth/local',
      data: credentials
    })
    .then(function(res) {
      // console.log(res);
      return res.data;
    })
    .catch(function(err) {
      console.log('ERROR LOGGING IN!', err);
    })
  }

  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/auth/me'
    })
    .then(function(res) {
      // console.log(res)
      return res.data;
    })
    .catch(function(err) {
      // console.log(err);
    })
  }

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    })
    .then(function(res) {
      // console.log(res.data)
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    })
  }
})
