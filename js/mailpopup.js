	
	var $sigdiv_windows;

$(function() {
	$( "#tabs" ).tabs();
	
	$( "#dialog" ).dialog({
		title: "郵件管理",
		at:"center",
		//position: 'center',
		width: 1400,
		height: 900,
		autoOpen: false,
		show: {
			effect: "fade",
			duration: 500
		},
		hide: {
			effect: "fade",
			duration: 500
		},
		create: function(event, ui) { 
		    var widget = $(this).dialog("widget");
		    $(".ui-dialog-titlebar-close span", widget).removeClass("ui-icon-minusthick").addClass("ui-icon-closethick");
	   	}
	});
	$( "#opener" ).click(function() {
		$( "#dialog" ).dialog( "open" );
	});

	

	//jSignture
	var topics = {};
	$.publish = function(topic, args) {
	    if (topics[topic]) {
	        var currentTopic = topics[topic],
	        args = args || {};
	
	        for (var i = 0, j = currentTopic.length; i < j; i++) {
	            currentTopic[i].call($, args);
	        }
	    }
	};
	$.subscribe = function(topic, callback) {
	    if (!topics[topic]) {
	        topics[topic] = [];
	    }
	    topics[topic].push(callback);
	    return {
	        "topic": topic,
	        "callback": callback
	    };
	};
	$.unsubscribe = function(handle) {
	    var topic = handle.topic;
	    if (topics[topic]) {
	        var currentTopic = topics[topic];
	
	        for (var i = 0, j = currentTopic.length; i < j; i++) {
	            if (currentTopic[i] === handle.callback) {
	                currentTopic.splice(i, 1);
	            }
	        }
	    }
	};

});
var selectUser;

function userSearch(val) {
    //alert("The input value has changed. The new value is: " + val);
    $( "#dialog" ).dialog( "open" );
    //getHousehold(val);
    getUserMail(val);
    //getUserName(val);
    $(".create-mail-btn").html("");
	$("#userSearchBar").val("");
	selectUser = val;
};

function getUserMail(val){
    $.ajax({
        type:'GET',
        url: originname+"/mails/household/barcode/" + val + "/notobtain",
        //headers: { 'userid': window.localStorage.getItem("LoginId"), 'usertoken':  window.localStorage.getItem("LoginToken") },
        //data:"stampid="+stampid,
        success:function(data){
	       	$("#userTitle").html(data.floor + " - " + data.number);
			$("#mailManagerHouseId").html(data.id);//Mail Manager HouseId
			$("#mailManagerTitle").html(data.floor + " - " + data.number);//Mail Manager Title
        	$("#userAmountMail").html(data.mailDetails.length);
        	console.log("ajax success");
        	console.log(data);
        	$(".user-mail-list").html("");
        	$(".mail-receiver-section").html("");
        	for(var i = 0 ; i < data.mailDetails.length ; i++){
        		//$(".user-mail-list").append(data.floor+', '+data.floor);
        		$(".user-mail-list").append("<tr class='mail "+ data.mailDetails[i].mailNumber +"'><td style='text-align: center; width: 10%'>" + data.mailDetails[i].mailNumber + "</td><td class='sender-type-" + data.mailDetails[i].deliveryMethod +"' style='text-align: center; width: 5%'></td><td style='text-align: center; width: 5%'>" + data.mailDetails[i].from
        		 + "</td><td style='text-align: center; width: 10%'>" + data.mailDetails[i].to + "</td><td style='text-align: center; width: 10%'>" + data.mailDetails[i].title + "</td><td style='text-align: center; width: 10%'><input class='user-collected' type='checkbox' value='" + data.mailDetails[i].id + "'</td></tr>");
        	}
        	$(".mail-receiver-section").append("<div id='content'><div id='signatureparent'><div id='signature'></div>	</div><div id='tools'></div></div>");
        	/*$(".mail-receiver-section").append("領件者<input id='mailReceiver' type='text' placeholder='Type name for collection' style='border-radius: 4px;'/><button id='mailSumbit' style='display:none' class='btn btn-small btn-danger' onclick='mailReceiverSubmit(" + val + ")'>領取</button><div id='content'><div id='signatureparent'><div id='signature'></div>	</div><div id='tools'></div></div>");*/
        	/*$(".create-mail-btn").append("<button class='btn btn-default btn-primary pull-right' onclick='createMail(" + data.id + ")'>Create</button>");*/

			// This is the part where jSignature is initialized.
			
			//var $sigdiv = $("#signature").jSignature({'UndoButton':false})
			$sigdiv_windows = $("#signature").jSignature({'UndoButton':false})

			// All the code below is just code driving the demo. 					
			var  $tools = $('#tools')
			, $extraarea = $('#displayarea')
			, pubsubprefix = 'jSignature.demo.'
			
			// var export_plugins = $sigdiv.jSignature('listPlugins','export')
			// , chops = ['<span><b>Extract signature data as: </b></span><select>','<option value="">(select export format)</option>']
			// , name
			// for(var i in export_plugins){
			// 	if (export_plugins.hasOwnProperty(i)){
			// 		name = export_plugins[i]
			// 		chops.push('<option value="' + name + '">' + name + '</option>')
			// 	}
			// }
			// chops.push('</select><span><b> or: </b></span>')
			
			// $(chops.join('')).bind('change', function(e){
			// 	if (e.target.value !== ''){
			// 		var data = $sigdiv.jSignature('getData', e.target.value)
			// 		$.publish(pubsubprefix + 'formatchanged')
			// 		if (typeof data === 'string'){
			// 			$('textarea', $tools).val(data)
			// 		} else if($.isArray(data) && data.length === 2){
			// 			$('textarea', $tools).val(data.join(','))
			// 			$.publish(pubsubprefix + data[0], data);
			// 		} else {
			// 			try {
			// 				$('textarea', $tools).val(JSON.stringify(data))
			// 			} catch (ex) {
			// 				$('textarea', $tools).val('Not sure how to stringify this, likely binary, format.')
			// 			}
			// 		}
			// 	}
			// }).appendTo($tools)
			
			$sigdiv_windows.bind('change', function(e) {
				$("#mailSumbit").css("display","block");
				$("#mailSumbit").css("float","right");
			});
			
			$('<input type="button" value="清除" style="color:#000000; float:right">').bind('click', function(e){
				$sigdiv_windows.jSignature('reset')
				$("#mailSumbit").css("display","none");
				$("#mailSumbit").css("float","right");
			}).appendTo($sigdiv_windows)
			
			// $('<div><textarea style="width:100%;height:7em;"></textarea></div>').appendTo($tools)
						


        },
        error: function(data){
        }
    });
}

function mailReceiverSubmit(userid) {
	var mailArray=[];
	var receiver = $('#mailReceiver').val();
		$('.user-collected:checked').each(function() {
        	mailArray.push($(this).val());
        	//alert($(this).val());
    	});
    	
    	console.log(mailArray+", "+ receiver);    
    	//alert("submit");
		var datapair = $sigdiv_windows.jSignature("getData", "svgbase64") 
		var signature_img = new Image()
		signature_img.src = "data:" + datapair[0] + "," + datapair[1]	

		//$(signature_img).appendTo($sigdiv_windows)
		//data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiI…9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMCIgaGVpZ2h0PSIwIj48L3N2Zz4=

		//console.log(signature_img.src);


		// for (var i = 0; i < mailArray.length; i++) {
		// 	alert(mailArray[i]+", "+receiver+", "+userid);
		// };

    	updateUserCollected(mailArray, receiver, userid, signature_img);
};

function updateUserCollected(mailArray, receiver, userid, signature_img) {

	//var img    = signature_img.toDataURL("image/png");

	// for (var i = 0; i < mailArray.length; i++) {
	// 	alert(mailArray[i]+", "+receiver+", "+userid);
	// };

	var canvas = $(".jSignature").get(0).toDataURL("image/png");
	//var img = canvas.toDataURL();

	// var image = new Image();
	// image.src = canvas;

	// window.open(canvas, "toDataURL() image", "width=600, height=200");

	var fd = new FormData();    
		fd.append( 'mailid', mailArray );
		fd.append( 'receiver', receiver );
		fd.append( 'image', canvas );

		 $.ajax({
		   url: originname+'/mails/obtained',
		   //url: 'http://192.168.0.109:8080/HouseManager/mails/obtained',
		   data: fd,
		   processData: false,
		   contentType: false,
		   type: 'POST',
		   success: function(data){		    
		     alert("信件領取成功");
		   }
		 });

	/*for(var i = 0 ; i < mailArray.length ; i++){
		console.log(mailArray[i]+", "+receiver+", "+userid);
		$.ajax({
	        type:'PUT',
	        url: originname+'/mail/' +  mailArray[i] + '/obtained?receiver='+ receiver,
	        //headers: { 'userid': window.localStorage.getItem("LoginId"), 'usertoken':  window.localStorage.getItem("LoginToken") },
	        success:function(data){
	        	console.log("received success");
	        	getUserMail(userid);
	        	$("#mailReceiver").html("");
	        },
	        error: function(data){
	        }
	    });
	}*/

	// alert(receiver);
	// alert(signature_img);
	// alert(userid);
	// console.log(receiver);
	// console.log(signature_img);
	// console.log(userid);
	// for (var i = 0; i < mailArray; i++) {
	// 	console.log(mailArray[i]+", "+receiver+", "+userid);
	// };
};

function createMail(uid) {
	console.log("id: " + uid);
	var today = new Date();
	var time = today.getYear() + "-" + today.getMonths() + "-" + today.getDays() + ":" + today.getDays() + "-" + today.getMinutes();
	console.log("time: "+ time);
	/*.ajax({
		url: serverUrl+"/mail",
		data: "title="+$('#ac_tilte').val()+"&deliveryMethod="+$('#mailDeliveryMethod').val()+"&dateReceiveFormat="+$('#ac_time').val()+"&from="+$('#ac_detail').val()+"&to="+$('#ac_price').val()+"&mailNumber="+$('#mailMailNumber').val(),
		type: "POST",
		dataType: "json",
		success: function(Jdata) {
			console.log("done");
		}, 
		  error: function() {
			  console.log("undone");
		  }        
	});*/
}



function searchMailBtn() {
	var barcode = $('#searchMailCode').val();
	console.log(barcode+". " + selectUser);
	var searchMailArray = [];
	$.ajax({
        type:'GET',
        url: originname+"/mails/household/barcode/" + selectUser + "/notobtain",
        //headers: { 'userid': window.localStorage.getItem("LoginId"), 'usertoken':  window.localStorage.getItem("LoginToken") },
        //data:"stampid="+stampid,
        success:function(data){
        	console.log("data is okay!");
        		console.log(data);
        	for(var i = 0 ; i < data.mailDetails.length; i++){
        		if (data.mailDetails[i].mailNumber == barcode ) {
        			searchMailArray.push(data.mailDetails[i]);
        		}
        		console.log(searchMailArray);
        		/*$('#searchMailCode').val('');
				$(".user-mail-list").html("");
				$(".mail-receiver-section").html("");*/
				/*for(var i = 0 ; i < searchMailArray.length ; i++){
					$(".user-mail-list").append("<tr><td style='text-align: center; width: 10%'>" + searchMailArray[i].mailNumber + "</td><td class='sender-type-" + searchMailArray[i].deliveryMethod +"' style='text-align: center; width: 5%'></td><td style='text-align: center; width: 5%'>" + searchMailArray[i].from
					 + "</td><td style='text-align: center; width: 10%'>" + searchMailArray[i].to + "</td><td style='text-align: center; width: 10%'>" + searchMailArray[i].title + "</td><td style='text-align: center; width: 10%'><input class='user-collected' type='checkbox' value='" + searchMailArray[i].id + "'</td></tr>");
				}
				$(".mail-receiver-section").append("領件者<input id='mailReceiver' type='text' placeholder='Type name for collection' style='border-radius: 4px;'/><button class='btn btn-small btn-danger' onclick='mailReceiverSubmit(" + selectUser + ")'>更新</button>");*/
        	}
        	appendSearchMailList(searchMailArray);
        },
        error: function(data){
        }
    });
}
function appendSearchMailList (searchMailArray) {
	$('#searchMailCode').val('');
	$(".mail").css("background-color","transparent");
	console.log("new search mail");
	console.log(searchMailArray);
	for(var i = 0 ; i < searchMailArray.length ; i++){
		$(".mail."+searchMailArray[i].mailNumber).css("background-color","#d9534f");
		$(".mail."+searchMailArray[i].mailNumber+" input[type=checkbox]").prop("checked", true);
	}
}



///////////////////////////************************************************************************************/////////////////////////////


function userSearchInMailMng(val) {
    $("#searchResult").css("display", "block");
    getUserMailInMailMng(val);
	selectUser = val;
};

function getUserMailInMailMng(val){
    $.ajax({
        type:'GET',
        url: originname+"/mails/household/barcode/" + val + "/notobtain",
        success:function(data){
	       	$("#housefloornumber").html(data.floor + " - " + data.number);
        	$("#mailtoHouseId").html(data.id);
        	/*$(".user-mail-list").html("");
        	$(".mail-receiver-section").html("");
        	$(".mail-receiver-section").append("領件者<input id='mailReceiver' type='text' placeholder='Type name for collection' style='border-radius: 4px;'/><button id='mailSumbit' style='display:none' class='btn btn-small btn-danger' onclick='mailReceiverSubmit(" + val + ")'>領取</button><div id='content'><div id='signatureparent'><div id='signature'></div>	</div><div id='tools'></div></div>");
        	$(".create-mail-btn").append("<button class='btn btn-default btn-primary pull-right' onclick='createMail(" + data.id + ")'>Create</button>");

			$sigdiv_windows = $("#signature").jSignature({'UndoButton':false})
		
			var  $tools = $('#tools')
			, $extraarea = $('#displayarea')
			, pubsubprefix = 'jSignature.demo.'
			
			
			$sigdiv_windows.bind('change', function(e) {
				$("#mailSumbit").css("display","block");
				$("#mailSumbit").css("float","right");
			});
			
			$('<input type="button" value="清除" style="color:#000000; float:right">').bind('click', function(e){
				$sigdiv_windows.jSignature('reset')
				$("#mailSumbit").css("display","none");
				$("#mailSumbit").css("float","right");
			}).appendTo($sigdiv_windows)*/

        },
        error: function(data){
        }
    });
}

/************************領件***************************/
function userSearchInMailListMng(val) {
    $("#searchUserMailResult").css("display", "block");
    getUserMail(val);
	selectUser = val;
};
/************************退件***************************/
function searchReturnMailBtn() {
	$(".user-mail-return-list").html('');
	var returnBarcode = $('#searchReturnMailCode').val();
	console.log(returnBarcode);
	var searchRetuenMailArray = [];
	$.ajax({
        type:'GET',
        url: originname+"/mails",
        success:function(data){
        	console.log("data is okay!");
        	console.log(data);
        	for(var i = 0 ; i < data.length; i++){
        		if (data[i].mailNumber == returnBarcode ) {
        			$("#retuenUserTitle").html(data[i].toHouseHold.floor + " - " + data[i].toHouseHold.number);
        			console.log(data[i].toHouseHold.floor + " - " + data[i].toHouseHold.number);
        			searchRetuenMailArray.push(data[i]);
        			$(".user-mail-return-list").append("<tr class='retuenMail "+ data[i].mailNumber +"'><td style='text-align: center; width: 10%'>" + data[i].mailNumber + "</td><td class='sender-type-" + data[i].deliveryMethod +"' style='text-align: center; width: 5%'></td><td style='text-align: center; width: 5%'>" + data[i].from
        		 + "</td><td style='text-align: center; width: 10%'>" + data[i].to + "</td><td style='text-align: center; width: 10%'>" + data[i].title + "</td><td style='text-align: center; width: 10%'><input class='user-collected' type='checkbox' value='" + data[i].id + "'</td></tr>");
        		}
        		console.log(searchRetuenMailArray);
        		appendSearchRetuenMailList (searchRetuenMailArray);
        	}
        },
        error: function(data){
        }
    });
}
function appendSearchRetuenMailList (searchRetuenMailArray) {
	$('#searchReturnMailCode').val('');
	$(".retuenMail").css("background-color","transparent");
	for(var i = 0 ; i < searchRetuenMailArray.length ; i++){
		$(".retuenMail."+searchRetuenMailArray[i].mailNumber+" input[type=checkbox]").prop("checked", true);
	}
}
