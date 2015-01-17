(function() {
	
	function MailController ($scope, mailProvider, $modal, $http, $timeout) {
		$scope.mailCollectType = 'all';
		$scope.newMail = {};
		$scope.receiver = {};
		$scope.mails = [];
   		$scope.today = new Date();
   		$scope.newMail.NumberFrom = '';
   		$scope.newMail.NumberTo = '';
   		
   		var method;
   		var mailNumber;
   		var title;
   		
   		function checkForm() {
   			$scope.createProcessing = true;
   			method = $scope.newMail.deliveryMethod;
   			mailNumber = $scope.newMail.mailNumber;
   			title = $scope.newMail.title;
   			//console.log(method + mailNumber+ title);
   			if (method != null && mailNumber != null && title != null){
   				$scope.createProcessing = false;
   				console.log(method + ", " + mailNumber+ ", "+ title);
   			}
   			$timeout(checkForm, 2000);
   		};
   		$timeout(checkForm, 2000);
   		
   		$http.get(originname + '/building').success(function(building) {
   			$scope.buildings = building;  
   		});
   		
   		$scope.getHousehold = function (id) {
   			//alert(id);
   			$http.get(originname + '/households/building/'+id).success(function(household) {
	   			$scope.households = household;  
	   		});
   		};
   		
   		$scope.getHouseTohold = function (id) {
   			//alert(id);
   			$http.get(originname + '/households/building/'+id).success(function(household) {
	   			$scope.householdsTo = household;  
	   		});
   		};
   		
		mailProvider.getMails(function (err, mails) {
            if (err) {
                $scope.page_load_error = "Unexpected error loading mails: " + e.message;
            } else {
                $scope.mails = mails;
                console.log("ok");
                //console.log($scope.mails);
                getReadyRetuenMails();
            }
   		});
	   		
   		/*function mailTimeout () {
   			mailProvider.getMails(function (err, mails) {
	            if (err) {
	                $scope.page_load_error = "Unexpected error loading mails: " + e.message;
	            } else {
	                $scope.mails = mails;
	                console.log("ok");
	                console.log($scope.mails.length);
	            }
	   		});
   			$timeout(mailTimeout, 60000);
   		};
   		$timeout(mailTimeout, 60000);*/
   		
   		function newMailList () {
   			mailProvider.getMails(function (err, mails) {
	            if (err) {
	                $scope.page_load_error = "Unexpected error loading mails: " + e.message;
	            } else {
	                $scope.mails = mails;
	                console.log("ok");
	                console.log($scope.mails.length);
	            }
	   		});
   		};
   		
   		$scope.addMail = function (mail_data, fromId, toId, fromfloorNum, tofloorNum) {
   			$scope.createProcessing = true;
   			mailProvider.addMail(mail_data, fromId, toId, fromfloorNum, tofloorNum, function (err, results) {
   				if (err) {
                    if (err.code == "missing_method")
                        $scope.add_error_text = "Missing method";
                    else if (err.code == "missing_title")
                        $scope.add_error_text = "Missing title";
                } else {                
		    		$scope.newMail = {};
			   		$scope.newMail.NumberFrom = '';
			   		$scope.newMail.NumberTo = '';
                    $scope.add_error_text = '';
                    $scope.createProcessing = false;
                    newMailList();
                }	
   			});
   		};
   		
   		$scope.returnMailBtn = function (itemId) {
			$('.mail-complete-btn-false').prop('disabled', true);
			$('.mail-complete-btn-false').css('opacity','0.4');
   			console.log("returnMailBtn " + itemId);
   			$http.put( originname + '/mail/' +  itemId + '/return', {
            	headers: {
                	'Content-Type': 'application/json'
               	}
       		})
       		.success(function(data) {
				console.log(data);
				alert("退件成功");
				newMailList();
             })
			.error(function(err) {
				console.log(err);
             })
   		};
   		$scope.cancelReturnMailBtn = function (itemId) {
			$('.mail-complete-btn-false').prop('disabled', true);
			$('.mail-complete-btn-false').css('opacity','0.4');
   			console.log("cancelReturnMailBtn " + itemId);
   			$http.put( originname + '/mail/' +  itemId + '/return/cancel', {
            	headers: {
                	'Content-Type': 'application/json'
               	}
       		})
       		.success(function(data) {
				console.log(data);
				alert("退件取消");
				newMailList();
             })
			.error(function(err) {
				console.log(err);
             })
   		};   		
	};

    illuminApp.controller("MailController", MailController);
	
	function updateMailController ($scope, $http) {
		$scope.updateProcessing = false;
		$scope.selection=[];
		//$scope.receiver.name = {};
		$scope.toggleSelection = function toggleSelection(itemId) {
			var idx = $scope.selection.indexOf(itemId);
			if (idx > -1) {
				$scope.selection.splice(idx, 1);
				//console.log($scope.selection);
		    }
		    else {
		    	$scope.selection.push(itemId);
				//console.log($scope.selection);
			}
		};
		function updateMailList () {
   			$http.get(originname + '/mails').success(function(data) {
	   			$scope.mails = data;  
	   		});
   		};
		$scope.updateMail = function(receiverInputName) {
			$scope.updateProcessing = true;
			for(var i = 0; i < $scope.selection.length; i++) {
				//console.log(receiverInputName+ ", " + $scope.selection[i]);
				$http.put( originname + '/mail/' +  $scope.selection[i] + '/obtained', {
					receiver: receiverInputName
				},{
	            	headers: {
	                	'Content-Type': 'application/json'
	               	}
           		})
           		.success(function(data) {
					console.log('Update succeeded');
					//console.log(data);
					alert("Mails have been collected.");
					$scope.receiver = {};
					$scope.updateProcessing = false;
					updateMailList ();
	             })
				.error(function(err) {
					console.log('Update failed');
					//console.log(err);
	             })
			};
		};
		$scope.deletemail = function(mailid) {
        	//alert("delete mail: " + mailid);
        	$http.delete(originname + '/mail/' + mailid).success(function(data, status, headers, config) {
        		console.log("success!");
        		alert("Mails have been removed.");
        		updateMailList ();
        	});
		};
	};
	illuminApp.controller("updateMailController", updateMailController);
})();

