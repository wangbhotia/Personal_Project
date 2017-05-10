angular.module('merofood').directive('fileread', function (imageService) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {
          // debugger;
          var fileread = loadEvent.target.result;
          // console.warn(fileread);

          // console.log('elem: ', elem);
          var tempArray = elem[0].value.split('\\');
          // console.log('tempArray: ', tempArray);
          var fileName = tempArray[tempArray.length - 1];

          imageService.storeImage(fileread, fileName)
          .then(function (result) {
            scope.images.unshift(result.data);
            // console.log('fileread: ', scope.images);
          })
          .catch(function (err) {
            console.error(err);
          });
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
});
  