(function () {

    function announcementProvider ($http) {

        /*this.getActivities = function (callback) {
             $http.get(originname + '/activities/building/1')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                    console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        }; */
        this.getBulletins = function (callback) {
             $http.get(originname + '/bulletins/building/1')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                    console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };  
        this.getPrivateBulletins = function (callback) {
             $http.get(originname + '/bulletins/private')
                .success(function (data, status, headers, conf) {
                	
                    callback(null, data);
                    console.log("data ok");
                    console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                   callback(data);
                });
        };
        this.addBulletin= function (bulletin_data, imageId, callback) {
        	        	
        	if (!bulletin_data.title) throw new Error("missing_title");
        	if (!bulletin_data.detail) throw new Error("missing_detail");
           	console.log("image id: " + imageId);
            $http.post( originname + '/bulletin', {
				title: bulletin_data.title,
				detail: bulletin_data.detail,
				image: 'notify_notify_icon'
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function (data, status, headers, conf) {
				callback(null, data);
	    		alert("已新增一個公告: " + data.title);
	    		var bid = data.id;
	    		$http.post( originname + '/bulletin/' + data.id + '/building/1', {
					
	            }, {
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
				.success(function(rdata) {
					console.log('Bulletin relation success');
					$http.post( originname + '/bulletin/' + bid + '/image/' + imageId, {
		            }, {
		            	headers: {
		                	'Content-Type': 'application/json'
		           		}
		            })
					.success(function(idata) {
						console.log('Image with Bulletin relation success');
						
		            })
					.error(function(ierr) {
						console.log('Image with Bulletin relation failed');
		            })
	            })
				.error(function(rerr) {
					console.log('Bulletin relation failed');
	            })
             })
			.error(function (err, status, headers, conf) {
				 callback(data);
             })
        };
        
        this.addPrivateBulletin= function (privateBulletin_data, imageId, hid, callback) {
        	        	
        	if (!hid) throw new Error("missing_hid");
        	if (!privateBulletin_data.title) throw new Error("missing_title");
        	if (!privateBulletin_data.detail) throw new Error("missing_detail");
           	console.log(privateBulletin_data.title+ ", id: " +hid + ", image id: " + imageId);
            $http.post( originname + '/bulletin', {
				title: privateBulletin_data.title,
				detail: privateBulletin_data.detail,
				image: 'notify_notify_icon'
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function (data, status, headers, conf) {
				callback(null, data);
	    		//alert("已新增一個私人訊息: " + data.title);
	    		console.log(data.id);
	    		var bid = data.id;
	    		$http.post( originname + '/bulletin/' + bid + '/household/' + hid, {
					
	            }, {
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
				.success(function(rdata) {
					console.log('Bulletin with household relation success');
					$http.post( originname + '/bulletin/' + bid + '/image/' + imageId, {
		            }, {
		            	headers: {
		                	'Content-Type': 'application/json'
		           		}
		            })
					.success(function(idata) {
						console.log('Image with Bulletin relation success');
						
		            })
					.error(function(ierr) {
						console.log('Image with Bulletin relation failed');
		            })
	             })
				.error(function(rerr) {
					console.log('Bulletin with household relation failed');
	             })
             })
			.error(function (err, status, headers, conf) {
				 callback(data);
             })
        };
        
    }

    illuminApp.service("announcementProvider", announcementProvider);
    
    illuminApp.service('fileUpload', ['$http', function ($http) {
	    this.uploadFileToUrl = function(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('file', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': 'multipart/form-data'}
	        })
	        .success(function(){
	        	console.log("success image");
	        	alert("照片已新增");
	        })
	        .error(function(){
	        	console.log("unsuccess image");
	        });
	    }
	}]);

})();
