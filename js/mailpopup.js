	
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
/***************front-part*******************/
function userSearch(val) {
    //alert("The input value has changed. The new value is: " + val);
    $( "#dialog" ).dialog( "open" );
    //getHousehold(val);
    getUserMail(val);
    //getUserName(val);
    $(".create-mail-btn").html("");
	$("#userSearchBar").val("");
	$("#userSearchBarInput").val("");
	selectUser = val;
};
function getUserMail(val){
	$.ajaxSetup({
		beforeSend: function (xhr){
	        xhr.setRequestHeader("Authorization",  "bearer " + window.localStorage.getItem("Authorization"));
	    }
	});	
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
        		 + "</td><td style='text-align: center; width: 10%'>" + data.mailDetails[i].to + "</td><td style='text-align: center; width: 10%'>" + data.mailDetails[i].title + "</td>"
        		 + "<td style='text-align: center; width: 10%'>" + data.mailDetails[i].complete + "</td><td style='text-align: center; width: 10%'>" + data.mailDetails[i].returnMail + "</td>"
        		 + "<td style='text-align: center; width: 10%'><input class='user-collected' type='checkbox' value='" + data.mailDetails[i].id + "'</td></tr>");
        	}
        	$(".mail-receiver-section").append("<button id='mailSumbit' style='display:none' class='btn btn-small btn-danger' onclick='mailReceiverSubmit(" + val + ")'>領取</button><div id='content'><div id='signatureparent'><div id='signature'></div>	</div><div id='tools'></div></div>");
        	/*$(".mail-receiver-section").append("領件者<input id='mailReceiver' type='text' placeholder='Type name for collection' style='border-radius: 4px;'/><button id='mailSumbit' style='display:none' class='btn btn-small btn-danger' onclick='mailReceiverSubmit(" + val + ")'>領取</button><div id='content'><div id='signatureparent'><div id='signature'></div>	</div><div id='tools'></div></div>");*/
        	/*$(".create-mail-btn").append("<button class='btn btn-default btn-primary pull-right' onclick='createMail(" + data.id + ")'>Create</button>");*/

			// This is the part where jSignature is initialized.
			
			//var $sigdiv = $("#signature").jSignature({'UndoButton':false})
			$sigdiv_windows = $("#signature").jSignature({'UndoButton':false, height:330})

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
			
			$('<input class="btn btn-small btn-primary" type="button" value="清除" style="float:right">').bind('click', function(e){
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
	$('#mailSumbit').attr('disabled','disabled');
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
		$.ajaxSetup({
			beforeSend: function (xhr){
		        xhr.setRequestHeader("Authorization",  "bearer " + window.localStorage.getItem("Authorization"));
		    }
		});	
		$.ajax({
			url: originname+'/mails/obtained',
			data: fd,
			processData: false,
		   	contentType: false,
		   	type: 'POST',
		  	success: function(data){		    
				console.log("信件領取成功");
		    	getUserMail(userid);
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

function selectMailCollect(val){
	var barcode = val;
	console.log(barcode+". " + selectUser);
	var searchMailArray = [];
	$.ajaxSetup({
		beforeSend: function (xhr){
	        xhr.setRequestHeader("Authorization",  "bearer " + window.localStorage.getItem("Authorization"));
	    }
	});	
	$.ajax({
        type:'GET',
        url: originname+"/mails/household/barcode/" + selectUser + "/notobtain",
        success:function(data){
        	console.log("data is okay!");
        		console.log(data);
        	for(var i = 0 ; i < data.mailDetails.length; i++){
        		if (data.mailDetails[i].mailNumber == barcode ) {
        			searchMailArray.push(data.mailDetails[i]);
        		}
        		console.log(searchMailArray);
        	}
        	appendSearchMailList(searchMailArray);
        },
        error: function(data){
        }
    });
}

/*function searchMailBtn() {
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
        		///$('#searchMailCode').val('');
				//$(".user-mail-list").html("");
				//$(".mail-receiver-section").html("");
				//for(var i = 0 ; i < searchMailArray.length ; i++){
				//	$(".user-mail-list").append("<tr><td style='text-align: center; width: 10%'>" + searchMailArray[i].mailNumber + "</td><td class='sender-type-" + searchMailArray[i].deliveryMethod +"' style='text-align: center; width: 5%'></td><td style='text-align: center; width: 5%'>" + searchMailArray[i].from
				//	 + "</td><td style='text-align: center; width: 10%'>" + searchMailArray[i].to + "</td><td style='text-align: center; width: 10%'>" + searchMailArray[i].title + "</td><td style='text-align: center; width: 10%'><input class='user-collected' type='checkbox' value='" + searchMailArray[i].id + "'</td></tr>");
				//}
				//$(".mail-receiver-section").append("領件者<input id='mailReceiver' type='text' placeholder='Type name for collection' style='border-radius: 4px;'/><button class='btn btn-small btn-danger' onclick='mailReceiverSubmit(" + selectUser + ")'>更新</button>");
        	}
        	appendSearchMailList(searchMailArray);
        },
        error: function(data){
        }
    });
}*/
function appendSearchMailList (searchMailArray) {
	$('#searchMailCode').val('');
	$(".mail").css("background-color","transparent");
	console.log("new search mail");
	console.log(searchMailArray);
	for(var i = 0 ; i < searchMailArray.length ; i++){
		$(".mail."+searchMailArray[i].mailNumber).css("background-color","#d9534f");
		$(".mail."+searchMailArray[i].mailNumber+" input[type=checkbox]").prop("checked", true);
		selectCollectMailCheck(searchMailArray[i].id, searchMailArray[i].mailNumber)
	}
}



///////////////////////////************************************************************************************/////////////////////////////


function userSearchInMailMng(val) {
    $("#userSearchBarInput").blur();
    $("#searchResult").css("display", "block");
    $("#userSearchResult").css("display", "block");
    $(".user-search-bar #userSearchBarInput").css("display", "none");
	$('#addmailweapbtn').prop('disabled', true);
	$('#addmailweapbtn').css('opacity','0.4');
	$('#mailquantity').html('0');
	
    getUserMailInMailMng(val);
	selectUser = val;
	console.log("step1");
};

function getUserMailInMailMng(val){
	$.ajaxSetup({
		beforeSend: function (xhr){
	        xhr.setRequestHeader("Authorization",  "bearer " + window.localStorage.getItem("Authorization"));
	    }
	});	
    $.ajax({
        type:'GET',
        url: originname+"/mails/household/barcode/" + val + "/notobtain",
        success:function(data){
        	$(".left-mail-field").html("");
	       	$("#housefloornumber").html(data.floor + " - " + data.number);
        	$("#mailtoHouseId").html(data.id);
        	$(".left-mail-field").append("<div class='add-mail-type-setion' style='display: block;' ><labe>郵件類型</label><input id='searchMailTypeCode' type='text' name='txt' class='form-control' onchange='searchMailTypeCodeInput(this.value)' placeholder='請輸入郵件類別...'  autofocus />" +
        	//"<select id='poststamp_mailDeliveryMethod'/ class='form-control'/ name='deliveryMethod' onchange='toaddmailbarcode(this.value)'><option value='0'>郵件類型</option><option value='parcel'>包裹</option><option value='certified'>掛號</option><option value='other'>其他</option></select>
        	"</div><div class='add-mail-number-setion'></div>");	
        	$("#searchMailTypeCode").focus();
        },
        error: function(data){
        }
    });
}


/*************************mail managment******************************/
/************************領件***************************/
var collecthid;
var houseNo;
function userSearchInMailListMng(val) {
	$(".mail-list-search2").css("display", "block");
	$(".add-collect-field").css("display", "block");
	$(".mail-collect-content").css("display", "block");
	
    $("#searchUserMailResult").css("display", "block");
    $(".user-search-bar #userCollectSearchBar").css("display", "none");
    $(".collection-mail-header").css("display", "block");
	$('#addmailcollectweapBtn').prop('disabled', true);
	$('#addmailcollectweapBtn').css('opacity','0.4');
	
    $("#userTitle").html("");
	$("#mailManagerHouseId").html("");
	$("#mailManagerTitle").html("");
	$("#userAmountMail").html("");

    getSelectUserMails(val);
	selectUser = val;
};
function getSelectUserMails(val){
	$.ajaxSetup({
		beforeSend: function (xhr){
	        xhr.setRequestHeader("Authorization",  "bearer " + window.localStorage.getItem("Authorization"));
	    }
	});	
	$.ajax({
		type:'GET',
        url: originname+"/mails/household/barcode/" + val + "/notobtain",
        success:function(data){
        	$("#userTitle").html(data.floor + " - " + data.number);
			$("#mailManagerHouseId").html(data.id);//Mail Manager HouseId
			$("#mailManagerTitle").html(data.floor + " - " + data.number);//Mail Manager Title
        	$("#userAmountMail").html(data.mailDetails.length);
        	collecthid = data.id;
        	houseNo = data.floor + " - " + data.number;
        	console.log("ajax success");
        	console.log(data);
        	$(".user-mail-list").html("");
        	$(".mail-receiver-section").html("");
        	for(var i = 0 ; i < data.mailDetails.length ; i++){
        		$(".user-mail-list").append("<tr class='mail "+ data.mailDetails[i].mailNumber +"'><td style='text-align: center; width: 10%'>" + data.mailDetails[i].mailNumber + "</td><td class='sender-type-" + data.mailDetails[i].deliveryMethod +"' style='text-align: center; width: 5%'></td>"
        		// + "<td style='text-align: center; width: 5%'>" + data.mailDetails[i].from
        		// + "</td><td style='text-align: center; width: 10%'>" + data.mailDetails[i].to + "</td><td style='text-align: center; width: 10%'>" + data.mailDetails[i].title + "</td>"
        		// + "<td style='text-align: center; width: 10%'>" + data.mailDetails[i].complete + "</td><td style='text-align: center; width: 10%'>" + data.mailDetails[i].returnMail + "</td>"
        		+ "<td class='collectMailList" + data.mailDetails[i].id + "' style='text-align: center; width: 10%'>" 
        		+ "<input class='user-collected' type='checkbox' value='" + data.mailDetails[i].id + "' onchange='selectCollectMailCheck(" + data.mailDetails[i].id + ", \"" +data.mailDetails[i].mailNumber+  "\""+ ")'/></td></tr>");
        	} //data.mailDetails[i].mailNumber
        }
	});
}

function selectCollectMailCheck(val, mailnumber) {
	if($('.collectMailList' + val + ' .user-collected').prop('checked')) {
		$('#collectMailList').append("<tr id='collectId"+ val +"'>"
		+ "<td id='addcollect_id' style='display: none'>" + val + "</td>"
		+ "<td id='addcollect_mailNo'>" + mailnumber + "</td></tr>");  
		countCollectMails ();
	} else {
	    $('#collectId' + val).remove(); 
	    countCollectMails ();
	}
}
function countCollectMails () {
	//$("#mailquantity").html($('.left-collect-table table tbody#collectMailList tr').length);
	var mailAmount = $('.left-collect-table table tbody#collectMailList tr').length;
	if (mailAmount > 0 ) {
		$('#addmailcollectweapBtn').prop('disabled', false);
		$('#addmailcollectweapBtn').css('opacity','1');
	} else {
		$('#addmailcollectweapBtn').prop('disabled', true);
		$('#addmailcollectweapBtn').css('opacity','0.4');
	}
}
var collectNumberList = [];
var collectMailNumberList = [];
function mailListCollectInMailMng () {
	$('#collectMailList tr').each(function() {
		var mailId = $(this).find("#addcollect_id").html();
		var mailNumber = $(this).find("#addcollect_mailNo").html();
		collectNumberList.push(mailId);
		collectMailNumberList.push(mailNumber);
		console.log(collectNumberList, collecthid);
	});
	if(collectNumberList.length != 0){	
    	getSignature (collecthid);
	}else{
		alert("請輸入郵件");
	}
}
function getSignature (collecthid){
	console.log("collectNumberList+collecthid");
	console.log(collectNumberList+ ", "+collecthid);
	$(".mail-list-search2").css("display", "none");
	$(".add-collect-field").css("display", "none");
	$(".mail-collect-content").css("display", "none");
	$(".mail-receiver-section").css("display", "block");
	$(".mail-receiver-section").append("<button id='mailSumbit' style='display:none' class='btn btn-small btn-danger' onclick='mailReceiverCollectSubmit(" + collecthid + ")'>領取</button><div id='content'><div id='signatureparent'><div id='signature'></div>	</div><div id='tools'></div></div>");

	$sigdiv_windows = $("#signature").jSignature({'UndoButton':false, height:330})					
	var  $tools = $('#tools')
	, $extraarea = $('#displayarea')
	, pubsubprefix = 'jSignature.demo.'
	
	
	$sigdiv_windows.bind('change', function(e) {
		$("#mailSumbit").css("display","block");
		$("#mailSumbit").css("float","right");
	});
	
	$('<input class="btn btn-small btn-primary" type="button" value="清除" style="float:right">').bind('click', function(e){
		$sigdiv_windows.jSignature('reset')
		$("#mailSumbit").css("display","none");
		$("#mailSumbit").css("float","right");
	}).appendTo($sigdiv_windows)
}


function mailReceiverCollectSubmit(userid) {
	$('#mailSumbit').attr('disabled','disabled');
	
	$(".mail-collect-confirm").css("display", "block");
	$(".mail-collect-confirm").html("");
	var datapair = $sigdiv_windows.jSignature("getData", "svgbase64") 
	var signature_img = new Image();
	signature_img.src = "data:" + datapair[0] + "," + datapair[1]	

	checkCollectedInfo(userid, signature_img);
	console.log(userid + ", " + datapair);
	$(".mail-collect-confirm").css("display", "block");
	
};
function checkCollectedInfo(userid, signature_img) {
	var canvas = $(".jSignature").get(0).toDataURL("image/png");
	
	$(".mail-receiver-section").css("display","none");
	$("#searchUserMailResult .mail-collect-confirm").append("<div class='col-lg-12 mail-collect-confirm-wrap'><h4>" + houseNo + " 郵件 共 <span id='amountColMails'></span> 件</h4><div class='col-lg-6 check-mail-list-table'><table><thead><tr><th>信件編號</th></tr></thead><tbody id='check_mail_list'></tbody></table></div><div class='col-lg-6 check-signature-img'><h4>簽名</h4><img src='" + canvas + "'/></div></div>"
	+ "<button id='mailCheckSubBtn' class='btn btn-small btn-primary pull-right' onclick='mailUpdateCollectedBtn(" + collecthid +")'>確定</button>"
	+ "<button id='mailCheckCancelBtn' class='btn btn-small btn-danger pull-right' onclick='mailCancelCollectedBtn()'>取消</button>");
	
	getConfirmMailListTablt ();
    
	console.log(canvas);
}
function getConfirmMailListTablt () {
	
	$('#mailCheckSubBtn').prop('disabled', false);
	$('#mailCheckSubBtn').css('opacity','1');
	$('#mailCheckCancelBtn').prop('disabled', false);
	$('#mailCheckCancelBtn').css('opacity','1');
	
	$(".check_mail_list").html("");
	for(var i = 0 ; i < collectNumberList.length ; i++){
		$("#check_mail_list").append("<tr><td>" + collectMailNumberList[i] + "</td></tr>");
		countColMailsAmout ();
    }
}
function countColMailsAmout () {
	$("#amountColMails").html("");
	var mailColAmount = $('#check_mail_list tr').length;
	$("#amountColMails").html(mailColAmount);
}

function mailUpdateCollectedBtn(hid) {
	var canvas = $(".jSignature").get(0).toDataURL("image/png");
	console.log(hid+", "+ collectNumberList);
	$('#mailCheckSubBtn').prop('disabled', true);
	$('#mailCheckSubBtn').css('opacity','0.4');
	$('#mailCheckCancelBtn').prop('disabled', true);
	$('#mailCheckCancelBtn').css('opacity','0.4');
	var fd = new FormData();    
		fd.append( 'mailid', collectNumberList );
		fd.append( 'receiver', hid );
		fd.append( 'image', canvas );
		$.ajaxSetup({
			beforeSend: function (xhr){
		        xhr.setRequestHeader("Authorization",  "bearer " + window.localStorage.getItem("Authorization"));
		    }
		});	
		$.ajax({
			url: originname+'/mails/obtained',
			data: fd,
			processData: false,
		   	contentType: false,
		   	type: 'POST',
		  	success: function(data){		    
				alert("信件領取成功");
				mailCancelCollectedBtn();
			}
		});

};
function mailCancelCollectedBtn() {
	collectNumberList = [];
	$(".mail-collect-confirm").css("display", "none");
	prestagefinduserCol();
}
/************************退件***************************/
function searchReturnMailInput(val) {
    $("#searchReturnMailResult").css("display", "block");
	$(".user-mail-return-list").html('');
	$(".mail-return-section").html('');
	var returnBarcode = val;
	console.log(returnBarcode);
	var searchReturnMailArray = [];
	var searchReturnMailItem;
	$.ajax({
        type:'GET',
        url: originname+"/mails",
        success:function(data){
        	console.log("data is okay!");
        	console.log(data);
        	for(var i = 0 ; i < data.length; i++){
        		if (data[i].complete === false && data[i].returnMail === false) {
        			console.log(data[i]);
        			if (data[i].mailNumber == returnBarcode ) {
	        			$("#returnUserTitle").html(data[i].toHouseHold.floor + " - " + data[i].toHouseHold.number);
	        			console.log(data[i].toHouseHold.floor + " - " + data[i].toHouseHold.number);
	        			searchReturnMailArray.push(data[i]);
	        			searchReturnMailItem = data[i];
	        			$(".user-mail-return-list").append("<tr class='returnMail "+ data[i].mailNumber +"'><td style='text-align: center; width: 10%'>" + data[i].mailNumber + "</td><td class='sender-type-" + data[i].deliveryMethod +"' style='text-align: center; width: 5%'></td><td style='text-align: center; width: 5%'>" + data[i].from
	        		 + "</td><td style='text-align: center; width: 10%'>" + data[i].to + "</td><td style='text-align: center; width: 10%'>" + data[i].title + "</td><td style='text-align: center; width: 10%'><input class='user-return-collected' type='checkbox' value='" + data[i].id + "'</td></tr>");
	        		}
	        		console.log(searchReturnMailArray);
	        		appendSearchReturnMailList (searchReturnMailArray);        	
        		}
        	}
        	console.log("this is mail and id : ");
        	console.log(searchReturnMailItem.toHouseHold.id);
        	$(".mail-return-section").append("<button id='mailReturnSumbit' style='display:none' class='btn btn-small btn-danger' onclick='mailReturnSubmit(" + searchReturnMailItem.toHouseHold.id + ")'>退件</button><div id='content'><div id='returnsignatureparent'><div id='returnsignature'></div>	</div><div id='tools'></div></div>");
        	$sigdiv_windows = $("#returnsignature").jSignature({'UndoButton':false, height:330})

			// All the code below is just code driving the demo. 					
			var  $tools = $('#returntools')
			, $extraarea = $('#returndisplayarea')
			, pubsubprefix = 'jSignature.demo.'
			
			$sigdiv_windows.bind('change', function(e) {
				$("#mailReturnSumbit").css("display","block");
				$("#mailReturnSumbit").css("float","right");
			});
			
			$('<input class="btn btn-small btn-primary" type="button" value="清除" style="float:right">').bind('click', function(e){
				$sigdiv_windows.jSignature('reset')
				$("#mailReturnSumbit").css("display","none");
				$("#mailReturnSumbit").css("float","right");
			}).appendTo($sigdiv_windows)
        },
        error: function(data){
        }
    });
}
function mailReturnSubmit(uid) {
	var returnMailId = $('.user-return-collected:checked').val();
	//alert(returnMailId);
	var datapair = $sigdiv_windows.jSignature("getData", "svgbase64");
	var signature_img = new Image();
	signature_img.src = "data:" + datapair[0] + "," + datapair[1];
	updateUserCollectedReturn(returnMailId, signature_img, uid);
	$('#mailReturnSumbit').attr('disabled','disabled');
}
function updateUserCollectedReturn (returnMailId, signature_img, uid) {
	var canvas = $(".jSignature").get(0).toDataURL("image/png");
	var fd = new FormData();    
	fd.append( 'image', canvas );
	
	console.log(canvas);
	$.ajax({
		url: originname+'/household/'+ uid + '/mailto/' + returnMailId,
		data: fd,
	  	processData: false,
	   	contentType: false,
	   	type: 'DELETE',
	   	success: function(data){		    
			console.log("relation 信件退件成功");
			$.ajax({
			   	url: originname+'/mail/' + returnMailId + '/return',
			   	data: fd,
			   	processData: false,
			   	contentType: false,
			   	type: 'POST',
			   	success: function(data){		    
			   		alert("信件退件成功");
		   			$("#returnUserTitle").html("");
		   			$(".user-mail-return-list").remove();
		   			$(".mail-return-section").remove();
			   	},
			   	error: function(data){		    
			    	alert("信件退件失敗");
			   	}
			});
	   },
	   error: function(data){		    
	     	console.log("relation 信件退件失敗");
	   }
	});
};

function appendSearchReturnMailList (searchReturnMailArray) {
	$('#searchReturnMailCode').val('');
	$(".returnMail").css("background-color","transparent");
	for(var i = 0 ; i < searchReturnMailArray.length ; i++){
		$(".returnMail."+searchReturnMailArray[i].mailNumber).css("background-color","#d9534f");
		$(".returnMail."+searchReturnMailArray[i].mailNumber+" input[type=checkbox]").prop("checked", true);
	}
}

function prestagefinduser() {
	$(".user-search-bar #userSearchBarInput").css("display", "block");
	$("#userSearchBarInput").val("");
	$("#userSearchResult").css("display", "none");
	$(".left-mail-field").html("");
	$("#userSearchBar").val("");
	$("#addMailList").html("");
	
	$("#searchMailTypeCode").blur();
	$("#poststamp_number").blur();
	$("#userSearchBarInput").focus();
	
}

function prestagefinduserCol() {
	$(".user-search-bar #userCollectSearchBar").css("display", "block");
	$("#userCollectSearchBar").val("");
	$("#searchUserMailResult").css("display", "none");
	$(".user-mail-list").html("");
	$("#collectMailList").html("");
	
	// $("#searchMailCode").blur();
	$("#userCollectSearchBar").focus();
	
}
