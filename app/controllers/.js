(function() {

	function guestController ($scope, $http) {
   		$scope.today = new Date();
   		$http.get(originname + '/mails').success(function(data) {
   			$scope.mails = data;
   		});
	};

    illuminApp.controller("guestController", guestController);

})();
