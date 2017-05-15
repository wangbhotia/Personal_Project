angular.module('merofood').controller('userCtrl', function($scope, userService, $state, $rootScope, $location){

  function getUser() {
    userService.getUser().then(function(user) {
      if(user){
        $scope.user = user.first_name;
        $rootScope.currentUserId = user.id;
        $rootScope.currentUserEmail = user.email;
        $rootScope.isLoggedIn = true;
      } else {
        $scope.user = 'Sign In';
        $rootScope.isLoggedIn = false;
      }  
    });
  }

  getUser();

  $rootScope.isSignedIn = () => {
    if($rootScope.isLoggedIn){
      $location.path('new-bus');
    } else {
      Materialize.toast('Please Sign In First.', 2000, 'red');
    }
  }

  $scope.loginLocal = (username, password) => {
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
