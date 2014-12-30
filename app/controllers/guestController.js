(function() {
	function GuestDateController ($scope, $http) {
		 /************datepicker****************/
    	$scope.toggleMin = function() {
  			$scope.minDate = $scope.minDate ? null : new Date();
  		};
  		$scope.toggleMin();
  		
  		$scope.open = function($event) {
  			$event.preventDefault();
  		    $event.stopPropagation();
  		
  		    $scope.opened = true;
  		};
  		
  		$scope.dateOptions = {
  		    formatYear: 'yy',
  		    startingDay: 1
  		};
  		
  		$scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  		$scope.format = $scope.formats[0];
  		
  		
  		var dt = new Date();
  		var currentMonth =  dt.getMonth() + 1;
  		//$scope.pickday = dt.getFullYear() + '-' + currentMonth + '-' + dt.getDay();
  		$scope.newGuest.pickday = new Date();
		$scope.newGuest.picktime = new Date();
  		$scope.hstep = 1;
  		$scope.mstep = 1;
    	/************datepicker end****************/
        
    	//alert("date picker date: " + datepicker);
	};
	
	illuminApp.controller("GuestDateController", GuestDateController);
	
	var topGuestId = 0;

	function GuestController ($scope, guestProvider, $modal, $http, $timeout) {
		$scope.newGuest = {};
		$scope.buildingId = {};
   		$scope.newGuest.numberHost = '';
   		
   		$scope.today = new Date();
		$scope.arriveProcessing = false;
   		$scope.leaveProcessing = false;
		$scope.deleteProcessing = false;
		
		var guestName;
   		
   		function checkForm() {
   			$scope.createProcessing = true;
   			guestName = $scope.newGuest.name;
   			console.log(guestName);
   			if (guestName != null){
   				$scope.createProcessing = false;
   				console.log(guestName);
   			}
   			$timeout(checkForm, 2000);
   		};
   		$timeout(checkForm, 2000);
		
   		$http.get(originname + '/building').success(function(building) {
   			$scope.buildings = building;  
   		});
   		
   		$scope.getHousehold = function (id) {
   			alert(id);
   			$http.get(originname + '/households/building/'+id).success(function(household) {
	   			$scope.households = household;  
	   		});
   		};

   		//$scope.guests = [{houseHoldDetail:{floor:0,number:0},name:name,gender:gender,visitDate:visitDate,reason:reason,idNumber:idNumber,phone:phone}];

   		/*function guestTimeout (){
	   		guestProvider.getGuests(208, function (err, guests) {
	            if (err) {
	                $scope.page_load_error = "Unexpected error loading guests: " + e.message;
	            } else {
	                //$scope.guests = guests;
	                $scope.guests.push({
	                	//console.log("guests ok");	                	
	           			
	         //        	<td style="text-align: center;">{{item.houseHoldDetail.floor}} - {{item.houseHoldDetail.number}}</td>
				    		// <td style="text-align: center;">{{item.name}}</td>
				    		// <td style="text-align: center;">{{item.gender}}</td>
				    		// <td style="text-align: center;">{{item.visitDate | date:'yyyy-MM-dd HH:mm'}}</td>
				    		// <td style="text-align: center;">{{item.reason}}</td>
				    		// <td style="text-align: center;">{{item.idNumber}}</td>
				    		// <td style="text-align: center;">{{item.phone}}</td>

	                })
	                //console.log("guests ok");
	                //console.log($scope.guests.length);
	            }
	   		});
   			$timeout(guestTimeout, 5000);
   		}
   		$timeout(guestTimeout, 500);*/
   		//function guestTimeout (){
	   		guestProvider.getGuests(function (err, guests) {
	            if (err) {
	                $scope.page_load_error = "Unexpected error loading guests: " + e.message;
	            } else {
	                $scope.guests = guests;
	                console.log("guests ok");
	                console.log($scope.guests.length);
	            }
	   		});
   			//$timeout(guestTimeout, 5000);
   		//}
   		// $timeout(guestTimeout, 300);
   		/*function guestTimeout () {
	   		$http.get(originname + '/guest/building/1').success(function(data) {
	   			$scope.guests = data;
	   		});
   			console.log("guest timeout load");
   			$timeout(guestTimeout, 3000);
   		};
   		$timeout(guestTimeout, 3000);*/
		
		function newGuestList () {
   			$http.get(originname + '/guest/building/1').success(function(data) {
	   			$scope.guests = data;
	   		});
   		};
   		$scope.addGuest = function (guest_data, hostId, datepick, timepick) {
   			var datepicker = new Date();
   			var timepick = new Date();
			$scope.createProcessing = true;
			var date = datepick.getDate();
			var month = datepick.getMonth() + 1;
			var year = datepick.getFullYear();
			var hours = timepick.getHours();
			var minutes = timepick.getMinutes();
			datepicker = year + '-' + month + '-' + date + ':' + hours + '-' + minutes;
			console.log("date picker date: " + datepicker);
			console.log("date picker date: " + datepick + ", date time: " +timepick);
   			
   			guestProvider.addGuest(guest_data, hostId, datepicker, guestImgId, function (err, results) {
   				if (err) {
                    if (err.code == "missing_reason")
                        $scope.add_error_text = "Missing reason";
                    else if (err.code == "missing_name")
                        $scope.add_error_text = "Missing name";
                } else {                
		    		$scope.newGuest = {};
		    		$scope.newGuest.floorHost = '';
                    $scope.add_error_text = '';
                    $scope.createProcessing = false;
                    newGuestList ();
                }	
   			});
   		};
	};

    illuminApp.controller("GuestController", GuestController);
    
    function updateGuestController ($scope, $http, $timeout) {
    	function updateGuestList () {
   			$http.get(originname + '/guest/building/1').success(function(guest) {
	   			$scope.arriveGuests = guest;  
	   		});
   			$timeout(updateGuestList, 5000);
   		};
   		$timeout(updateGuestList, 5000);
    	$scope.arriveGuest = function (id, name, reason, gender, idNumber, phone, parkSpace,guestCardid) {
    		//alert(id +", " + name +", " + reason +", " + gender +", " + idNumber +", " + phone +", " + parkSpace +", " + guestCardid);
			$scope.arriveProcessing = true;
	   		$scope.leaveProcessing  = true;
			$scope.deleteProcessing = true;
   			$http.put( originname + '/guest/' + id, {
				name: name,
				reason: reason,
				gender: gender,
				idNumber: idNumber,
				phone: phone,
				parkSpace: parkSpace,
				arrive: "true"
			},{
            	headers: {
                	'Content-Type': 'application/json'
               	}
       		})
       		.success(function(data) {
				console.log('Guest Update succeeded');
				console.log(data);
				$scope.arriveProcessing = false;
		   		$scope.leaveProcessing  = false;
				$scope.deleteProcessing = false;
				// alert("Status has been changed to ARRIVED");
				$http.put( originname + '/guest/'+ id +'/addcard/', {
					cardNumber: guestCardid
				},{
	            	headers: {
	                	'Content-Type': 'application/json'
	               	}
           		})
           		.success(function(data) {
					console.log('arrive relation succeeded');
					$('#guest'+id).remove();
	             })
				.error(function(err) {
					console.log('arrive relation failed');
					//console.log(err);
	             })
				updateGuestList();
				
             })
			.error(function(err) {
				console.log('Guest Update failed');
				//console.log(err);
            })
   		};
   		$scope.exitGuest = function (id, name, reason, gender, idNumber, phone, parkSpace, arrive) {
   			//alert(id+","+ name+","+ reason+","+ gender +","+ idNumber+","+ phone+","+ parkSpace);
	   		$scope.arriveProcessing = true;
	   		$scope.leaveProcessing  = true;
			$scope.deleteProcessing = true;
   			$http.put( originname + '/guest/' + id, {
				name: name,
				reason: reason,
				gender: gender,
				idNumber: idNumber,
				phone: phone,
				parkSpace: parkSpace,
				arrive: arrive,
				exit: "true"
			},{
            	headers: {
                	'Content-Type': 'application/json'
               	}
       		})
       		.success(function(data) {
				console.log('Guest Update succeeded');
		   		$scope.arriveProcessing = false;
		   		$scope.leaveProcessing  = false;
				$scope.deleteProcessing = false;
				//console.log(data);
				alert("Status has been changed to LEFT");
				$('#guestArrive'+id).remove();
             })
			.error(function(err) {
				console.log('Guest Update failed');
				//console.log(err);
            })
   		};
   		$scope.deleteGuest = function (gid) {
	   		$scope.arriveProcessing = true;
	   		$scope.leaveProcessing  = true;
			$scope.deleteProcessing = true;
        	$http.delete(originname + '/guest/' + gid).success(function(data, status, headers, config) {
        		console.log("delete id: " + gid + " success!");
        		//location.reload();
		   		$scope.arriveProcessing = false;
		   		$scope.leaveProcessing  = false;
				$scope.deleteProcessing = false;
        		alert("A guest has been removed from the list.");
        		updateGuestList();
        	});
   		};
    };
    
    illuminApp.controller("updateGuestController", updateGuestController);
   		
    
    /*function addGuestController ($scope, $http) {
		$scope.createProcessing = false;
		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();
		
		$scope.open = function($event) {
			$event.preventDefault();
		    $event.stopPropagation();
		
		    $scope.opened = true;
		};
		
		$scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		};
		
		$scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
		
		
		var dt = new Date();
		var currentMonth =  dt.getMonth() + 1;
		//$scope.pickday = dt.getFullYear() + '-' + currentMonth + '-' + dt.getDay();
		$scope.pickday = new Date();
		$scope.picktime = new Date();
		$scope.hstep = 1;
		$scope.mstep = 1;
		
		$scope.guestPost = function(newGuest, hostId, datepick, timepick) {
			var datepicker = dt;
			$scope.createProcessing = true;
			var date = datepick.getDate();
			var month = datepick.getMonth() + 1;
			var year = datepick.getFullYear();
			var hours = timepick.getHours();
			var minutes = timepick.getMinutes();
			datepicker = year + '-' + month + '-' + date + ':' + hours + '-' + minutes;
			console.log("date picker date: " + datepicker);
			console.log("date picker date: " + datepick + ", date time: " +timepick);
			
			$http.post( originname + '/guest', {
				name: newGuest.name,
				reason: newGuest.reason,
				visitDateFormat: datepicker,
				gender: newGuest.gender,
				idNumber: newGuest.idNumber,
				phone: newGuest.phone,
				parkSpace: newGuest.parkSpace,
				arrive: newGuest.arrive,
				exit: "false",
				worker: newGuest.worker
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function(data) {
				console.log('add guest succeeded');
				//console.log(data);
				$http.post( originname + '/household/' + hostId + '/guest/' + data.id, 
				{
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
				.success(function(Tdata) {
					console.log('guest relationship succeeded');
					$scope.newGuest = {};
					$scope.createProcessing = false;
					alert('The guest has been create.');
	             })
				.error(function(Terr) {
					console.log('guest relationship failed');
	             })
             })
			.error(function(err) {
				console.log('add guest failed');
				//console.log(err);
             })
          };
		
	};
	illuminApp.controller("addGuestController", addGuestController);*/
    
    var guestImgId;
   	function guestImg ($scope, $http) {
		$scope.guestImgUpload = function () {
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
				guestImgId = d.id;
				alert("已新增圖片");
			})
		}
   	};
   	
    illuminApp.controller("guestImg", guestImg);

})();
