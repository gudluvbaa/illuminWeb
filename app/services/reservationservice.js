(function () {

    function reservationProvider ($http) {
		this.getClubhouses = function (callback) {
             $http.get(originname + '/clubhouses')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                    console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };
        
        this.getReservations = function (callback) {
             $http.get(originname + '/reservations/building/1')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                    console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };
        
        this.addClubhouse = function (newClubhouse_data, fd, callback) {
        	console.log(newClubhouse_data);
        	if (!newClubhouse_data.name) throw new Error("missing_name");
        	if (!newClubhouse_data.serviceContent) throw new Error("missing_serviceContent");
        	if (!newClubhouse_data.phone) throw new Error("missing_phone");
        	if (!newClubhouse_data.point) throw new Error("missing_point");
           
           	console.log(newClubhouse_data.name);
           	console.log(newClubhouse_data.serviceContent);
           	console.log(newClubhouse_data.phone);
           	console.log(fd);
			
           	$http.post( originname + '/clubhouse', fd,{
				name: "newClubhouse_data.name",
				serviceContent: newClubhouse_data.serviceContent,
				image: fd,
				serviceImage: fd,
				phone: newClubhouse_data.phone,
				like: '0',
				point: newClubhouse_data.point
            }, {
            	headers: {
					transformRequest:angular.identity,
					headers:{'Content-Type':undefined}
           		}
            })
			.success(function (data, status, headers, conf) {
				callback(null, data);
	    		console.log("已新增一個會館: " + data.image);
             })
			.error(function (err, status, headers, conf) {
				 callback(data);
             })
        };
    }

    illuminApp.service("reservationProvider", reservationProvider);

})();
