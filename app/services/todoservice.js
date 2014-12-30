(function () {

    function todoProvider ($http) {

        /*var toDoLists = [ 
            {title: 'reservation I', time:'1416556960000', read:'false', done:'false'},
			{title: 'reservation II', time:'1416556980000', read:'false', done:'false'},
			{title: 'checking II', time:'1416546980000', read:'false', done:'true'},
			{title: 'reservation IV', time:'1416556980000', read:'false', done:'true'},
			{title: 'Checking I', time:'1416556380000', read:'false', done:'false'},
			{title: 'reservation VI', time:'1416552980000', read:'false', done:'true'},
			{title: 'reservation VII', time:'1416553980000', read:'false', done:'true'},
			{title: 'reservation VIII', time:'1416556980000', read:'false', done:'false'}
        ];*/

        this.getToDoLists = function (callback) {
             $http.get(originname + '/todolists')
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                    //console.log(data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };  
        
        this.addToDoList = function (toDo_data, datepicker, callback) {
        	        	
        	if (!toDo_data.title) throw new Error("missing_title");
        	/*if (!toDo_data.pickday) throw new Error("missing_date");
        	if (!toDo_data.picktime) throw new Error("missing_Time");*/
            //if (!toDo_data.processDateFormat) throw new Error("bad_date");
            
            
			//check whether it is bigger than current time
           /* var d = new Date(toDo_data.time.trim());
            if (isNaN(d.getTime())) throw new Error("bad_date");*/
            //toDoLists.push((toDo_data));
           
           
            $http.post( originname + '/todolist', {
				title: toDo_data.title,
				processDateFormat: datepicker
            }, {
            	headers: {
                	'Content-Type': 'application/json'
           		}
            })
			.success(function (data, status, headers, conf) {
				callback(null, data);
	    		alert("已新增一個待完成項目: " + data.title);
             })
			.error(function (err, status, headers, conf) {
				 callback(data);
             })
        };
        
        

    }

    illuminApp.service("todoProvider", todoProvider);

})();
