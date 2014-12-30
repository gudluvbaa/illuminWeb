$(function() {
	
	/*$.ajax({
		url: originname+"/appointments",
	    type: "GET",
	    dataType: "json",
	    success: function(Jdata) {
	    	console.log("guest calendar load success");
	    	console.log(Jdata);
	    	showCalendar(Jdata);
	    }, 
	      error: function(err) {
	   		console.log("sorry can't load the resulte, guest calendar load unsuccess");
	   	}        
	});*/
		
	console.log("document is read!");
	//function showCalendar(Jdata) {
	//var collection = Jdata;
	//console.log(collection);
	$('#calendar').fullCalendar({
		height: 950,
		header: {
	    	left: 'prev,next today',
	      	center: 'title',
	      	right: 'month,agendaWeek,agendaDay',
	    },
		editable: true,
		//timeFormat: 'H(:mm)',
			/*eventLimit: true, // allow "more" link when too many events*/
		eventSources: [
	        {
	            /*url: originname + '/appointments',
	            type: 'GET',
	            success: function () {
	            	console.log("it works!!!!");
	            },
			    error: function() {
	                console.log('there was an error while fetching events!');
	           	},*/
	           	events: [ // put the array in the `events` property
                {
                    title  : '會館預約',
                    start  : '2014-12-06T12:30',
                    description : '',
                    reason : '會館1預約'
                },
                {
                    title  : '會館預約',
                    start  : '2014-12-11T12:30',
                    end    : '2014-12-12T14:30',
                    description : '',
                    reason : '會館2預約'
                },
                {
                    title  : '會館預約',
                    start  : '2014-12-20T12:30',
                    description : '',
                    reason : '會館3預約'
                },
                {
                    title  : '會館預約',
                    start  : '2014-12-14T12:30',
                    description : '',
                    reason : '會館4預約'
                }],
	            color: '#AFAAA1',   // a non-ajax option
	            textColor: '#555555' // a non-ajax option
	            //timeFormat:'yyyy-MM-dd:hh-mm'
	        },
	        {
	            /*url: originname + '/appointments',
	            type: 'GET',
	            success: function () {
	            	console.log("it works!!!!");
	            },
			    error: function() {
	                console.log('there was an error while fetching events!');
	           	},*/
	           	events: [ // put the array in the `events` property
                {
                    title  : '訪客',
                    start  : '2014-12-13T11:30',
                    name   : 'John Willian',
                    reason : 'Metting'
                },
                {
                    title  : '訪客',
                    start  : '2014-12-21T13:30',
                    end    : '2014-12-23T14:30',
                    name   : 'Ben Harper',
                    reason : 'Hain Fun'
                },
                {
                    title  : '訪客',
                    start  : '2014-12-17T12:30',
                    name   : 'Mary Berry',
                    reason : 'Baking Class'
                }],
	            color: '#9DC99D',   // a non-ajax option
	            textColor: '#555555' // a non-ajax option
	            //timeFormat:'yyyy-MM-dd:hh-mm'
	        }
	    ],
	    eventClick:  function(event, jsEvent, view) {
            $('#modalTitle').html(event.title + ' - ' + event.reason);
            $('#modalBody').html(event.name + ' - ' + event.reason);
            $('#fullCalModal').modal();
		},
		defaultView: 'agendaDay' 
	});
	//};
	
	
});