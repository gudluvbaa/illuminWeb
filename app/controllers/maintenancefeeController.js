(function() {

	function maintenancefeeController ($scope, $http, $timeout) {
   		$scope.today = new Date();
   		$scope.imageIn = function(){
	        this.feeDetail = true;
	    };
		$scope.imageOut = function(){
	          this.feeDetail = false;
		};
		$scope.feearray = [];

   		//function maintenancefeeTimeout () {
   		$http.get(originname + '/households/fee').success(function(data) {
   			$scope.maintenancefees = data;
			
            for(var i = 0 ; i < data.length ; i++) {
            	if (data[i].maintenanceFeeDetails.length > 0){
            		for(var j = 0 ; j < data[i].maintenanceFeeDetails.length ; j++) {
            			$scope.feearray.push({
            				floorNum: data[i].floor +"-"+data[i].number,
            				feedetail: data[i].maintenanceFeeDetails[j]
            			});
            			console.log($scope.feearray);
            		}
            	}
            }
           //console.log($scope.maintenancefees);
   		});
   			//console.log("maintenancefees timeout load");
   			//$timeout(maintenancefeeTimeout, 3000);
   		//};
   		//$timeout(maintenancefeeTimeout, 3000);
   		
   		function printFeeData()
		{
		   var divToPrint=document.getElementById("printFeeTable");
		   newWin= window.open("");
		   newWin.document.write(divToPrint.outerHTML);
		   newWin.print();
		   newWin.close();
		}
		
		$scope.printFee = function(){
			printFeeData();
			//console.log("is clcik");
		};
		/*$scope.fullMonth = new Date();
		$scope.feeFilter = function(year, month){
			$scope.fullMonth = new Date(year+"-"+month);
			console.log($scope.fullMonth);
		};*/
	};

    illuminApp.controller("maintenancefeeController", maintenancefeeController);
})();
