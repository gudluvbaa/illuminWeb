(function() {

	function AnnouncementController ($scope, announcementProvider, $modal, $http, $timeout) {
		$scope.privateBulletins = [];
		$scope.newActivity = {};
		$scope.newBulletin = {};
		$scope.newPrivateBulletin = {};
		$scope.isProcessing = false;
		$scope.newPrivateBulletin.number = '';
		
		$http.get(originname + '/building').success(function(building) {
   			$scope.buildings = building;  
   		});
   		
   		$scope.getHousehold = function (id) {
   			$scope.newPrivateBulletin.floor = {};
   			alert(id);
   			$http.get(originname + '/households/building/'+id).success(function(household) {
	   			$scope.households = household;  
	   		});
   		};
		function bulletinTimeout() {
	     	announcementProvider.getBulletins(function (err, bulletins) {
	            if (err) {
	                $scope.page_load_error = "Unexpected error loading bulletins: " + e.message;
	            } else {
	                $scope.bulletins = bulletins;
	            }
	     	});
		    $timeout(bulletinTimeout, 3000);
	   	};
		$timeout(bulletinTimeout, 500);
		
		function privateBulletinTimeout() {
			
			
		    $timeout(bulletinTimeout, 3000);
	   	};
		$timeout(bulletinTimeout, 500);
		
     	announcementProvider.getPrivateBulletins(function (err, privateBulletins) {
            if (err) {
                $scope.page_load_error = "Unexpected error loading private bulletins: " + e.message;
            } else {
            	console.log("ok");
                for(var i = 0 ; i < privateBulletins.length ; i++) {
	            	if (privateBulletins[i].bulletins.length > 0){
	            		for(var j = 0 ; j < privateBulletins[i].bulletins.length ; j++) {
	            			$scope.privateBulletins.push({
	            				description: privateBulletins[i].description,
	            				floorNum: privateBulletins[i].floor +"-"+privateBulletins[i].number,
	            				bulletins: privateBulletins[i].bulletins[j]
	            			});
	            			console.log("$scope.privateBulletins");
	            			console.log($scope.privateBulletins);
	            		}
	            	}
	            }
            }
     	});
		/*announcementProvider.getActivities(function (err, activities) {
            if (err) {
                $scope.page_load_error = "Unexpected error loading activities: " + e.message;
            } else {
                $scope.activities = activities;
                console.log("ok");
            }
     	});*/
     	
     	
     	/*function newListBulletin () {
     		$http.get(originname + '/bulletins/building/1').success(function(data) {
           		$scope.bulletins = data;
	   		});
     	}*/
     	function newListPrivateBulletin () {
     		$http.get(originname + '/bulletins/private').success(function(privateBulletins) {
           		for(var i = 0 ; i < privateBulletins.length ; i++) {
	            	if (privateBulletins[i].bulletins.length > 0){
	            		for(var j = 0 ; j < privateBulletins[i].bulletins.length ; j++) {
	            			$scope.privateBulletins.push({
	            				description: privateBulletins[i].description,
	            				floorNum: privateBulletins[i].floor +"-"+privateBulletins[i].number,
	            				bulletins: privateBulletins[i].bulletins[j]
	            			});
	            			console.log("$scope.privateBulletins------------>");
	            			console.log($scope.privateBulletins);
	            		}
	            	}
	            } 
	   		});
     	}
		$scope.addBulletin = function (bulletin_data) {
			$scope.isProcessing = true;
			announcementProvider.addBulletin(bulletin_data, imageId , function (err, results) {
				if (err) {
                    if (err.code == "missing_title")
                        $scope.add_error_text = "Missing title";
                    else if (err.code == "missing_detail")
                        $scope.add_error_text = "Missing detail";
                } else {
                    $scope.newBulletin = {};
                    $scope.add_error_text = '';
                    $scope.isProcessing = false;
                    //newListBulletin ();
                }

            });
		};
		
		/*$scope.addphoto = function () {
			$http.post( originname + '/image', {
				image: $scope.file
				}, {
	            	headers: {
	                	'Content-Type': 'multipart/form-data'
	           		},
		            transformRequest: function (data, headersGetter) {
		                var formData = new FormData();
		                angular.forEach(data, function (key, value) {
		                    formData.append(key, value);
		                });
		
		                var headers = headersGetter();
		                delete headers['Content-Type'];
		
		                return formData;
		            }
            	})
				.success(function(data) {
					console.log('add image succeeded');
					
	             })
				.error(function(err) {
					console.log('add image failed');
					//console.log(err);
	             })
		};*/
		
		
		$scope.addPrivateBulletin = function (privateBulletin_data, hid) {
			$scope.isProcessing = true;
			announcementProvider.addPrivateBulletin(privateBulletin_data, imageId, hid, function (err, results) {
			if (err) {
                    if (err.code == "missing_title")
                        $scope.add_error_text = "Missing title";
                    else if (err.code == "missing_detail")
                        $scope.add_error_text = "Missing detail";
                    else if (err.code == "missing_hid")
                        $scope.add_error_text = "Missing Household ID";
                } else {
                    $scope.newPrivateBulletin = {};
                    $scope.add_error_text = '';
                    $scope.newPrivateBulletin.floor ='';
                    $scope.isProcessing = false;
                    $scope.privateBulletins = [];
                    /********************************append new item***********************************/
                   	
                   /*
                    * $http.get(originname + '/bulletins/private')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                    console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });/*/
                   	/*********************************************************************************/
                }
                newListPrivateBulletin ();

            });
		};
   		/*$scope.addCustomBulletin = function (newBulletin) {
   			$http.post( originname + '/bulletin', {
				title: newBulletin.title,
				detail: newBulletin.detail,
				image: 'notify_notify_icon'
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function(data) {
				console.log('Bulletin create success');
				console.log(data);
				$http.post( originname + '/bulletin/' + data.id + '/building/1', {
					
	            }, {
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
				.success(function(rdata) {
					console.log('Bulletin relation success');
					console.log(rdata);
					alert("New Bulletin has been created.");
					$scope.newBulletin = {};
	             })
				.error(function(rerr) {
					console.log('Bulletin relation failed');
	             })
             })
			.error(function(err) {
				console.log('Bulletin create failed');
             })
   		};
   		$scope.addBulletin = function (newBulletin) {
   			$http.post( originname + '/bulletin', {
				title: 'Nutrition for 21st century',
				detail: 'An ambitious new agenda – in the form of a Political Declaration and Framework for Action to improve nutritional health for the next 10 years – was presented to a major United Nations conference in Rome, Italy, last month.',
				image: 'notify_notify_icon'
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function(data) {
				console.log('Bulletin create success');
				console.log(data);
				$http.post( originname + '/bulletin/' + data.id + '/building/1', {
					
	            }, {
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
				.success(function(rdata) {
					console.log('Bulletin relation success');
					console.log(rdata);
					alert("New Bulletin has been created.");
					$scope.newBulletin = {};
	             })
				.error(function(rerr) {
					console.log('Bulletin relation failed');
	             })
             })
			.error(function(err) {
				console.log('Bulletin create failed');
             })
   		};*/
	};

    illuminApp.controller("AnnouncementController", AnnouncementController);
    
    var imageId;
   	function uploader ($scope, $http) {
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
				imageId = d.id;
				alert("已新增圖片");
			})
		}
   	};
   	
    illuminApp.controller("uploader", uploader);
    
})();
