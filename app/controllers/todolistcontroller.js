(function() {
	
	var day;
	var month;
	var year;
	var hours;
	var minutes;
	
	function DateController ($scope, $http) {
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
  		$scope.new_toDoList.pickday = new Date();
		$scope.new_toDoList.picktime = new Date();
  		$scope.hstep = 1;
  		$scope.mstep = 1;
    	/************datepicker end****************/
        
    	//alert("date picker date: " + datepicker + ", gender: " + newGuest.gender);
	};
	
	illuminApp.controller("DateController", DateController);

    function ToDoListController ($scope, todoProvider, $modal, $http, $timeout) {
  		var currentTime = new Date();
          $scope.new_toDoList = {};
          $scope.add_error_text = '';
          $scope.page_load_error = "";
          $scope.toDoLists = [];
          //$scope.toDoLists = todoProvider.getToDoLists();
        
		$scope.hoverIn = function(){
	        this.todoDetail = true;
	    };
	
		$scope.hoverOut = function(){
	          this.todoDetail = false;
		};

      function todoTimeout() {
		  todoProvider.getToDoLists(function (err, todolists) {
	            if (err) {
	                $scope.page_load_error = "Unexpected error loading todolists: " + e.message;
	                //console.log("error");
	            } else {
	              //$scope.sortedtoDoLists = todolists;
	                $scope.toDoLists = todolists;
	                //console.log("ok");
	                //console.log($scope.toDoLists);
	            }
	      });
	
	          //console.log( "function time out" );
	      $timeout(todoTimeout, 3000);
      };
      $timeout(todoTimeout, 500);
      

      $scope.changeRead = function (id) {
        //console.log("read change - " + id);
      	$http.put( originname + '/todolist/' +  id + '/read', {
  			},{
              	headers: {
                  	'Content-Type': 'application/json'
                 	}
         		})
         		.success(function(data) {
  				console.log('change to read succeeded');
  				//console.log(data);
              })
  			.error(function(err) {
  				console.log('change to read failed');
  				//console.log(err);
        	})
	    };
      	$scope.changeDone = function (id) {
        	$http.put( originname + '/todolist/' +  id + '/complete', {
			},{
            	headers: {
                	'Content-Type': 'application/json'
               	}
       		})
       		.success(function(data) {
				console.log('to do this complete succeeded');
				//console.log(data);
            })
			.error(function(err) {
				console.log('to do this complete failed');
				//console.log(err);
            })
		};	
	    
        $scope.isProcessing = false;
        $scope.addToDoList = function (toDo_data, datepick, timepick ) {
			var datepicker = new Date();
        	$scope.isProcessing = true;
        	date = datepick.getDate();
			month = datepick.getMonth() + 1;
			year = datepick.getFullYear();
			hours = timepick.getHours();
			minutes = timepick.getMinutes();
			datepicker = year + '-' + month + '-' + date + ':' + hours + '-' + minutes;
			console.log("date picker day: " + date + " , date picker month: " + month + " , date picker year: " +year + "date picker date: " + datepick + ", date time: " +timepick);
	        
        	todoProvider.addToDoList(toDo_data, datepicker, function (err, results) {
                if (err) {
                    if (err.code == "missing_title")
                        $scope.add_error_text = "Missing title";
                    else if (err.code == "missing_date")
                        $scope.add_error_text = "Missing date";
                    else if (err.code == "missing_Time")
                        $scope.add_error_text = "Missing time";
                } else {
                    $scope.new_toDoList = {};
                    $scope.add_error_text = '';
                    $scope.isProcessing = false;
                }

            });
        };
       	$scope.openMenuDialogAnnouncement = function () {
       		//alert("openMenuDialogMail");
       		var openMenuAnnouncementDialog = $modal.open({
       			templateUrl: './app/partials/announcement.html',
			    controller: 'AnnouncementController',
			    size: "lg",
			    resolve: {
			    }
       		});
       	};
       	$scope.openMenuDialogMail = function () {
       		//alert("openMenuDialogMail");
       		var openMenuMailDialog = $modal.open({
       			templateUrl: './app/partials/mail.html',
			    controller: 'MailController',
			    size: "lg",
			    resolve: {
			    }
       		});
       	};
       	$scope.openMenuDialogGuest = function () {
       		var openMenuGuestDialog = $modal.open({
       			templateUrl: './app/partials/guest.html',
			    controller: 'GuestController',
			    size: "lg",
			    resolve: {
			    	
			    }
       		});
       	};
       	$scope.openMenuDialogRepair = function () {
       		var openMenuRepairDialog = $modal.open({
       			templateUrl: './app/partials/repair.html',
			    controller: 'RepairController',
			    size: "lg",
			    resolve: {
			    	
			    }
       		});
       	};
       	$scope.openMenuDialogFacility = function () {
       		var openMenuFacilityDialog = $modal.open({
       			templateUrl: './app/partials/facility.html',
			    controller: 'ReservationController',
			    size: "lg",
			    resolve: {
			    	
			    }
       		});
       	};
       	$scope.openMenuDialogFee = function () {
       		var openMenuFeeDialog = $modal.open({
       			templateUrl: './app/partials/maintenancefee.html',
			    controller: 'maintenancefeeController',
			    size: "lg",
			    resolve: {
			    	
			    }
       		});
       	};
       	$scope.openMenuDialogCorporation = function () {
       		var openMenuCorporationDialog = $modal.open({
       			templateUrl: './app/partials/corporation.html',
			    //controller: 'mailController',
			    size: "lg",
			    resolve: {
			    	
			    }
       		});
       	};
       	$scope.openMenuDialogSetting = function () {
       		var openMenuSettingDialog = $modal.open({
       			templateUrl: './app/partials/setting.html',
			    //controller: 'mailController',
			    size: "lg",
			    resolve: {
			    	
			    }
       		});
       	};
       	$scope.openMenuDialogMore = function () {
       		var openMenuMoreDialog = $modal.open({
       			templateUrl: './app/partials/morefunction.html',
			    controller: 'morefunctionController',
			    size: "lg",
			    resolve: {
			    	
			    }
       		});
       	};
       	/*var inputChangedPromise;
       	$scope.userSearch = function (){
       		if(inputChangedPromise){
		        $timeout.cancel(inputChangedPromise);
		    }
		    inputChangedPromise = $timeout(taskToDo,1000);
       	};*/
    };

    illuminApp.controller("ToDoListController", ToDoListController);
    
    /*function MenuInfoController ($scope, $http, $timeout) {
    	function amountTimeout() {
	    	$http.get(originname + '/mails').success(function(data) {
	   			$scope.mails = data;
	   		});
	   		$http.get(originname + '/guest/building/1').success(function(data) {
	   			$scope.guests = data;
	   		});
    		$timeout(amountTimeout, 2000);
    	}
    	$timeout(amountTimeout, 2000);
    	
    };
    illuminApp.controller("MenuInfoController", MenuInfoController);*/
})();
