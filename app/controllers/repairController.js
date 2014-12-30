(function() {

	function RepairController ($scope, repairProvider, $modal, $http, $timeout) {
		
		repairProvider.getRepairs(function (err, results) {
        	if (err) {
           		$scope.page_load_error = "Unexpected error loading repairs " + e.message;
        		//console.log("error");
    		} else {
      		//$scope.sortedtoDoLists = todolists;
        	$scope.repairs = results;
        	console.log("ok");
        	//console.log($scope.toDoLists);
       		}
  		});

	};

    illuminApp.controller("RepairController", RepairController);
    
})();
