(function () {

    function moreProvider ($http) {

        this.getGasrecords = function (callback) {
             $http.get(originname + '/households/gasrecord')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                   // console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        }; 
        
        this.getActivities = function (callback) {
             $http.get(originname + '/activities/building/1')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                    console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        }; 

        this.addActivity= function (activity_data, activityImgId, callback) {
        	        	
        	if (!activity_data.title) throw new Error("missing_title");
        	if (!activity_data.room) throw new Error("missing_room");
        	if (!activity_data.time) throw new Error("missing_time");
        	if (!activity_data.detail) throw new Error("missing_detail");
        	if (!activity_data.price) throw new Error("missing_price");
        	// if (!activity_data.comment) throw new Error("missing_comment");
        	if (!activity_data.nopLimit) throw new Error("missing_nopLimit");
                      
            $http.post( originname + '/activity', {
				title: activity_data.title,
				room: activity_data.room,
				time: activity_data.time,
				detail: activity_data.detail,
				price: activity_data.price,
				//comment: activity_data.comment,
				nopLimit: activity_data.nopLimit,
				nop: "0"
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function (data, status, headers, conf) {
				callback(null, data);
	    		alert("已新增一個活動: " + data.title);
	    		var aid = data.id;
	    		$http.post( originname + '/activity/' + aid + '/building/1', {
					
	            }, {
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
				.success(function(rdata) {
					console.log('Activity relation success');
					console.log(rdata);
					$http.post( originname + '/activity/' + aid + '/image/' + activityImgId, {
		            }, {
		            	headers: {
		                	'Content-Type': 'application/json'
		           		}
		            })
					.success(function(idata) {
						console.log('Image with Bulletin relation success');
						console.log("New Activity has been created.");
						
		            })
					.error(function(ierr) {
						console.log('Image with Bulletin relation failed');
		            })
	             })
				.error(function(rerr) {
					console.log('Activity relation failed');
	             })
             })
			.error(function (err, status, headers, conf) {
				 callback(data);
             })
        };
        
    }

    illuminApp.service("moreProvider", moreProvider);

})();
