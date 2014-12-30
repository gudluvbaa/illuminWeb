(function() {

	function morefunctionController ($scope, moreProvider, $modal, $http, $timeout) {
		$scope.gasrecords = [];
		$scope.newActivity = {};
		//function gasrecordeTimeout () {
	   		moreProvider.getGasrecords(function (err, gasrecords) {
	            if (err) {
	                $scope.page_load_error = "Unexpected error loading gasrecords: " + e.message;
	            } else {
	                //$scope.gasrecords = gasrecords;
	                console.log("ok");
	                for(var i = 0 ; i < gasrecords.length ; i++) {
		            	if (gasrecords[i].gasRecordDetails.length > 0){
		            		for(var j = 0 ; j < gasrecords[i].gasRecordDetails.length ; j++) {
		            			$scope.gasrecords.push({
		            				floorNum: gasrecords[i].floor +"-"+gasrecords[i].number,
		            				gasrecordDetail: gasrecords[i].gasRecordDetails[j]
		            			});
		            			//console.log($scope.gasrecords);
		            		}
		            	}
		            }
	            }
	     	});
	     	console.log($scope.gasrecords );
	     	//$timeout(gasrecordeTimeout, 3000);			
		//};
		//$timeout(gasrecordeTimeout, 1000);
     	function activityTimeout () {
     		moreProvider.getActivities(function (err, activities) {
	            if (err) {
	                $scope.page_load_error = "Unexpected error loading activities: " + e.message;
	            } else {
	                $scope.activities = activities;
	                console.log("ok");
	            }
	     	});
	     	$timeout(activityTimeout, 3000);	
     	}
	    $timeout(activityTimeout, 3000);	
			
     	$scope.addActivity = function (activity_data) {
			$scope.isProcessing = true;
			moreProvider.addActivity(activity_data, activityImgId, function (err, results) {
				if (err) {
                    if (err.code == "missing_title")
                        $scope.add_error_text = "Missing title";
                    else if (err.code == "missing_room")
                        $scope.add_error_text = "Missing room";
                    else if (err.code == "missing_time")
                        $scope.add_error_text = "Missing time";
                    else if (err.code == "missing_detail")
                        $scope.add_error_text = "Missing detail";
                    else if (err.code == "missing_price")
                        $scope.add_error_text = "Missing price";
                    else if (err.code == "missing_nopLimit")
                        $scope.add_error_text = "Missing nopLimit";
                    else if (err.code == "missing_nop")
                        $scope.add_error_text = "Missing nop";                        
                } else {
					$scope.newActivity = {};
                    $scope.add_error_text = '';
                    $scope.isProcessing = false;
                }

            });
		};
		function printGasData()
		{
		   var divToPrint=document.getElementById("printGasTable");
		   newWin= window.open("");
		   newWin.document.write(divToPrint.outerHTML);
		   newWin.print();
		   newWin.close();
		}
		
		$scope.printGas = function(){
			printGasData();
			console.log("is clcik");
		};
		
   		/*$scope.addCustomActivity = function (newActivity) {
   			$http.post( originname + '/activity', {
				title: newActivity.title,
				room: newActivity.room,
				time: newActivity.time,
				detail: newActivity.detail,
				price: newActivity.price,
				//comment: newActivity.comment,
				nopLimit: newActivity.nopLimit,
				nop: newActivity.nop
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function(data) {
				console.log('Activity create success');
				console.log(data);
				$http.post( originname + '/activity/' + data.id + '/building/1', {
					
	            }, {
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
				.success(function(rdata) {
					console.log('Activity relation success');
					console.log(rdata);
					console.log("New Activity has been created.");
					$scope.newActivity = {};
	             })
				.error(function(rerr) {
					console.log('Activity relation failed');
	             })
             })
			.error(function(err) {
				console.log('Activity create failed');
             })
   		};*/
	};

    illuminApp.controller("morefunctionController", morefunctionController);
    
    
    
    function activityUserController ($scope, $http) {
		$scope.arriveProcessing = false;
		var activityId;
		
    	$scope.getAllusers = function(aid){
    		activityId = aid;
	    	$http.get(originname + '/activity/' + aid + '/arrived').success(function(arrives) {
	   			$scope.arriveusers = arrives;
	   		});
	   		$http.get(originname + '/activity/'+ aid +'/notarrive').success(function(notarrives) {
	   			$scope.notarriveusers = notarrives; 
	   			console.log("not");
	   			console.log($scope.notarriveusers);				
	   		});
	  	};
	  	$scope.arriveUser = function(id) {
	  		$http.put( originname + '/activity/'+ activityId +'/user/'+ id +'/arrive',{
	           headers: {
	                	'Content-Type': 'application/json'
	           }
	       	})
			.success(function(data) {
		   		$scope.arriveProcessing = false;
				console.log('arrive');
				$('#activityUser'+id).remove();
				console.log(data+", "+id);
				getAllusers();
				/*$http.get(originname + '/user/'+ id).success(function(user) {
		   			$('.arrive-list-tbody').append("<tr class='activityUserListItem'><td style='text-align: left;'>"+ user.name +"</td><td style='text-align: left;'>"+ user.phone +"</td></tr>")
		   		});*/
		   		
             })
			.error(function(err) {
					console.log('arrive Update failed');
            })
	  	};
    	
    };    

    illuminApp.controller("activityUserController", activityUserController);
    
    var activityImgId;
   	function activityImg ($scope, $http) {
		$scope.activityImgUpload = function () {
			var fd = new FormData();
			angular.forEach($scope.files, function(file){
				fd.append('image', file);
				console.log(file[0]);
			})
			$http.post( originname + '/image', fd,
			{
				transformRequest:angular.identity,
				headers:{'Content-Type':undefined}
			})
			.success(function(d){
				console.log(d);
				activityImgId = d.id;
				alert("已新增圖片");
			})
		}
   	};
   	
    illuminApp.controller("activityImg", activityImg);
    
})();
