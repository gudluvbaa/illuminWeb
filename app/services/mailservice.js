(function () {

    function mailProvider ($http) {

        this.getMails = function (callback) {
             $http.get(originname + '/mails')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    callback(data);
                });
        };  
        
        this.addMail = function (mail_data, fromId, toId, fromfloorNum, tofloorNum, callback) {
        	        	
        	if (!mail_data.title) throw new Error("missing_title");
           	console.log("testlllll========" + fromfloorNum + ", " + tofloorNum);
           	var from = fromfloorNum;
           	var to = tofloorNum;
           	if (mail_data.from != null) {
           		from = mail_data.from;
           	}; 	if (mail_data.to != null) {
           		to = mail_data.to;
           	};
           	
           	console.log("commant========" + from + ", " + to);
            $http.post( originname + '/mail', {
				title: mail_data.title,
				deliveryMethod: mail_data.deliveryMethod,
				from: from,
				to: to,
				mailNumber: mail_data.mailNumber
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function (data, status, headers, conf) {
				callback(null, data);
	    		console.log("已新增一個信件: " + data.title);
		    	$http.post( originname + '/household/' + fromId + '/mail/' + data.id, {
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
					.success(function (data, status, headers, conf) {
						callback(null, data);
			    		console.log("from relation has been created");
		             })
					.error(function (err, status, headers, conf) {
						callback(data);
			    		console.log("from relation has not been created");
		             })
		        $http.post( originname + '/household/' + toId + '/mailto/' + data.id, {
	            	headers: {
	                	'Content-Type': 'application/json'
	           		}
	            })
					.success(function (data, status, headers, conf) {
						callback(null, data);
			    		console.log("to relation has been created");
		             })
					.error(function (err, status, headers, conf) {
						callback(data);
			    		console.log("to relation has not been created");
		             })
             })
			.error(function (err, status, headers, conf) {
				 callback(data);
             })
        };
        
        

    }

    illuminApp.service("mailProvider", mailProvider);

})();
