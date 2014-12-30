(function () {

    function guestProvider ($http) {

        /*this.getGuests = function (topId, callback) {
             $http.get(originname + '/guest/building/1/top/' +topId)
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    callback(data);
                });
        };*/
       	this.getGuests = function (callback) {
             $http.get(originname + '/guest/building/1')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    callback(data);
                });
        }; 
        
        this.addGuest = function (guest_data, hostId, datepicker, guestImgId , callback) {
        	        	
        	if (!guest_data.name) throw new Error("missing_name");
        	if (!guest_data.reason) throw new Error("missing_reason");
           	$http.post( originname + '/guest', {
				name: guest_data.name,
				reason: guest_data.reason,
				visitDateFormat: datepicker,
				gender: guest_data.gender,
				idNumber: guest_data.idNumber,
				phone: guest_data.phone,
				parkSpace: guest_data.parkSpace,
				cardNumber: guest_data.cardNumber,
				arrive: guest_data.arrive,
				exit: "false",
				worker: guest_data.worker
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function (data, status, headers, conf) {
				callback(null, data);
	    		console.log("已新增一個訪客: " + data.name);
	    		var gid = data.id;
	    		$http.post( originname + '/household/' + hostId + '/guest/' + gid, 
				{
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
				.success(function(Tdata) {
					console.log('guest relationship succeeded');
					console.log(Tdata);
					//alert('The guest has been create.');
					$http.post( originname + '/guest/' + gid + '/image/' + guestImgId, {
		            }, {
		            	headers: {
		                	'Content-Type': 'application/json'
		           		}
		            })
					.success(function(idata) {
						console.log('Image with guest relation success');
						
		            })
					.error(function(ierr) {
						console.log('Image with guest relation failed');
		            })
	             })
				.error(function(Terr) {
					console.log('guest relationship failed');
	             })
             })
			.error(function (err, status, headers, conf) {
				 callback(data);
             })
        };
    };

    illuminApp.service("guestProvider", guestProvider);

})();
