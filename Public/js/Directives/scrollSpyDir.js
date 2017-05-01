angular.module('merofood').directive('scrollSpy', function(){

	return {
		link: function(scope, element, attrs){
			element.click(function(){
				element.scrollSpy();
				// console.log('Scroll Spy Fired!!!!');
			});
		}
	}

});