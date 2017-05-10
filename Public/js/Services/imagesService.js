angular.module('merofood').factory('imageService', function($http){
  // AMAZON S3

  var service = {};

  service.storeImage = function (imageData, fileName) {
    var imageExtension = imageData.split(';')[0].split('/');
    imageExtension = imageExtension[imageExtension.length - 1];

    var newImage = {
      imageName: fileName,
      imageBody: imageData,
      imageExtension: imageExtension,
      userEmail: 'wangbhotia@gamil.com'
    }

    return $http.post('/newimage', newImage);
  }
  return service;
});
