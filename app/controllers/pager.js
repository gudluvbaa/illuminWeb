(function () {
	function OtherController($scope) {
		$scope.pageChangeHandler = function(num) {
			console.log('meals page changed to ' + num);
		};
  
		$scope.pageChangeHandler = function(num) {
			console.log('going to page ' + num);
		};
	};
	illuminApp.controller("OtherController", OtherController);
})();
