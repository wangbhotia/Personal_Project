angular.module('merofood').controller('userCtrl', function($scope, userService, $state, $rootScope){

  function getUser() {
    userService.getUser().then(function(user) {
      if(user){
        $scope.user = user.first_name;
        $rootScope.currentUserId = user.id;
        $rootScope.isLoggedIn = true;
      } else {
        $scope.user = 'Sign In';
        $rootScope.isLoggedIn = false;
      }  
    });
  }

  getUser();

  $scope.loginLocal = function(username, password) {
    console.log('Logging in with', username, password);
    userService.loginLocal({
      username: username,
      password: password
    })
    .then(function(res) {
      getUser();
    })
  }

  $scope.logout = userService.logout;

});