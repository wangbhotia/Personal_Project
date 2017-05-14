angular.module('merofood').factory('imageService', function($http, $rootScope){
  // AMAZON S3

  var service = {};

  service.storeImage = function (imageData, fileName) {
    var imageExtension = imageData.split(';')[0].split('/');
    imageExtension = imageExtension[imageExtension.length - 1];

    var newImage = {
      imageName: fileName,
      imageBody: imageData,
      imageExtension: imageExtension,
      userEmail: $rootScope.currentUserEmail
    }

    return $http.post('/newimage', newImage);
  }
  return service;
});
