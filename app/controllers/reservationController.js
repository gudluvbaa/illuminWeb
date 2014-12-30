(function() {

	function ReservationController ($scope, reservationProvider, $modal, $http, $timeout) {
		$scope.newClubhouse = {};
		$scope.createProcessing = false;
		
		reservationProvider.getClubhouses(function (err, clubhouses) {
        	if (err) {
           		$scope.page_load_error = "Unexpected error loading clubhouses: " + e.message;
        		//console.log("error");
    		} else {
      		//$scope.sortedtoDoLists = todolists;
        	$scope.clubhouses = clubhouses;
        	console.log("ok");
        	//console.log($scope.toDoLists);
       		}
  		});
  		
		reservationProvider.getReservations(function (err, reservations) {
        	if (err) {
           		$scope.page_load_error = "Unexpected error loading reservations: " + e.message;
        		//console.log("error");
    		} else {
      		//$scope.sortedtoDoLists = todolists;
        	$scope.reservations = reservations;
        	console.log("ok");
        	//console.log($scope.toDoLists);
       		}
  		});
  		
  		$scope.updateClubhouse = function (cid, serviceContent, phone, points) {
  			console.log(cid+", " + serviceContent + ", " +phone+"," + points);
  			$http.put( originname + '/clubhouse/' + cid, {
				serviceContent: serviceContent,
				phone: phone,
				point: points
			},{
            	headers: {
                	'Content-Type': 'application/json'
               	}
       		})
       		.success(function(data) {
				console.log('clubhouse Update succeeded');	
				alert("會館資料更改成功");		
             })
			.error(function(err) {
				console.log('clubhouse Update failed');
				alert("會館資料更改失敗");		
            })
  		};
  		$scope.addClubhouse = function (newClubhouse_data) {
  			var fd = new FormData();
			angular.forEach($scope.files, function(file){
				fd.append('image', file);
				console.log(file[0]);
			})
            $scope.createProcessing = true;
  			reservationProvider.addClubhouse(newClubhouse_data, fd, function (err, results) {
                if (err) {
                    if (err.code == "missing_name")
                        $scope.add_error_text = "Missing name";
                    else if (err.code == "missing_serviceContent")
                        $scope.add_error_text = "Missing serviceContent";
                    else if (err.code == "missing_phone")
                        $scope.add_error_text = "Missing phone";
                    else if (err.code == "missing_point")
                        $scope.add_error_text = "Missing point";
                } else {
                    $scope.newClubhouse_data = {};
                    $scope.add_error_text = '';
                    $scope.createProcessing = false;
                }

            });
  		};

	};

    illuminApp.controller("ReservationController", ReservationController);
    
    /*var clubhouseImage;
   	function imageUploader ($scope, $http) {
		$scope.upload = function () {
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
				clubhouseImage = d.id;
				alert("已新增圖片");
			})
		}
   	};
   	
    illuminApp.controller("imageUploader", imageUploader);*/
})();
