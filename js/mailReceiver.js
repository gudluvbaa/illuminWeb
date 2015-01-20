function Add(){ 
	$("#mailReceiverTable tbody").append( 
		"<tr>"+ 
		"<td style='width:10%'><input id='stamp_number' type='text'/ style='color:#000000' ></td>"+ 
		"<td style='width:10%'><select id='stamp_mailDeliveryMethod'/ class='form-control'/ name='deliveryMethod' ><option value='parcel'>包裹</option><option value='certified'>掛號</option><option value='fresh'>生鮮</option><option value='court'>法院</option><option value='other'>其他</option></select></td>"+
		"<td style='width:5%'><input id='stamp_from' type='text'/ style='color:#000000'></td>"+ 
		"<td style='width:5%'><input id='stamp_to' type='text'/ style='color:#000000'></td>"+ 
		"<td style='width:10%'><input id='stamp_ps' type='text'/ style='color:#000000'></td>"+ 
		"<td style='width:10%'><img src='img2/Email-Attachment-icon.png' class='btnSave'><img src='img2/Email-Delete-icon.png' class='btnDelete'/></td>"+ 
		"</tr>"); 
	$(".btnSave").bind("click", Save);	
	$(".btnDelete").bind("click", Delete); 	
	CountMailTable();
}; 

function MailPost(){
	var titleList = [];
	var deliveryMethodList = [];
	var fromList = [];
	var toList = [];
	var mailNumberList = [];
	var houseid = [];

	$('#mailManagerTBody tr').each(function() {		
	    var mailNumber = $(this).find("#mailNumber").html();
	    var deliveryMethod = $(this).find("#deliveryMethod").html();  	    	
	    var toUser = $(this).find("#toUser").html();  	    	
	    var formUser = $(this).find("#fromUser").html();  	    	
	    var psText = $(this).find("#psText").html();  
	    	
	    if(mailNumber != undefined && deliveryMethod != undefined && toUser != undefined && formUser != undefined && psText != undefined){    	
		mailNumberList.push(mailNumber);		
//		deliveryMethodList.push(deliveryMethod);
		switch(deliveryMethod){
			case '包裹':
				deliveryMethodList.push('parcel');		
			case '掛號':
				deliveryMethodList.push('certified');
			case '生鮮':
				deliveryMethodList.push('fresh');
			case '法院':
				deliveryMethodList.push('court');
			case '其他':
				deliveryMethodList.push('other');
		}
		toList.push(toUser);
		fromList.push(formUser);
		titleList.push(psText);
	    }
		
	   
	 });

	if(mailNumberList.length != 0 && deliveryMethodList.length != 0 && toList.length != 0 && fromList.length != 0 && titleList.length != 0){				
		var fd = new FormData();    
			fd.append( 'title', titleList );
			fd.append( 'deliveryMethod', deliveryMethodList );
			fd.append( 'from', fromList );
			fd.append( 'to', toList );
			fd.append( 'mailNumber', mailNumberList );
			fd.append( 'houseid', $('#mailManagerHouseId').html());

		$.ajax({
		  url: originname+'/mails',
		  data: fd,
		  processData: false,
		  contentType: false,
		  type: 'POST',
		  success: function(data){
		    $("#mailReceiverTable tbody tr").remove();
		    alert("信件建檔完畢");
		  }
		});
	    	
	    }else{
		    	alert("表格沒填完")
	}

	/*if(mailNumberList.length != 0 && deliveryMethodList.length != 0 && toList.length != 0 && fromList.length != 0 && titleList.length != 0){
		alert('post')	    	
	    }else{
		alert("表格有問題～")	
	}*/
	
}

function Delete(){ 
	var par = $(this).parent().parent(); 
	par.remove(); 
	CountMailTable();
}; 

function Save(){ 
	var par = $(this).parent().parent(); //tr 
	var tdNumber = par.children("td:nth-child(1)"); 
	var tdCategory = par.children("td:nth-child(2)")
	var tdFrom = par.children("td:nth-child(3)"); 
	var tdTo = par.children("td:nth-child(4)"); 
	var stampPS = par.children("td:nth-child(5)"); 
	var tdButtons = par.children("td:nth-child(6)"); 
	tdNumber.html( "<div id='mailNumber'> "+tdNumber.children("input[type=text]").val()+"</div>"); 
	switch (tdCategory.children("select").val()) {
		case 'parcel' :
			tdCategory.html("<div id='deliveryMethod'>包裹</div>");		
			break;
		case 'certified' :
			tdCategory.html("<div id='deliveryMethod'>掛號</div>");
			break;
		case 'fresh' :
			tdCategory.html("<div id='deliveryMethod'>生鮮</div>");
			break;
		case 'court' :
			tdCategory.html("<div id='deliveryMethod'>法院</div>");
			break;
		case 'other' :
			tdCategory.html("<div id='deliveryMethod'>其他</div>");
			break;
	}	
	tdFrom.html("<div id='fromUser'>"+tdFrom.children("input[type=text]").val()+"</div>"); 
	tdTo.html("<div id='toUser'>"+tdTo.children("input[type=text]").val()+"</div>"); 
	stampPS.html("<div id='psText'>"+stampPS.children("input[type=text]").val()+"</div>");
	tdButtons.html("<img src='img2/Email-Delete-icon.png' class='btnDelete'/>"); 
	$(".btnDelete").bind("click", Delete); 	
	CountMailTable();
}; 

function CountMailTable(){
	//minute one cause title name
	$("#addUserMail").html($('#mailReceiverTable tr').length-1)
}

$(function(){ 
	$(".btnDelete").bind("click", Delete); 
	$(".btnSave").bind("click", Save); 
});



///////////////////////////************************************************************************************/////////////////////////////

function AddInMailMng(){ 
	$("#containMail").append( 
		"<tr>"+ 
		"<td style='width:10%'><input id='stamp_number' type='text'/ style='color:#000000' ></td>"+ 
		"<td style='width:10%'><select id='stamp_mailDeliveryMethod'/ class='form-control'/ name='deliveryMethod' ><option value='parcel'>包裹</option><option value='certified'>掛號</option><option value='fresh'>生鮮</option><option value='court'>法院</option><option value='other'>其他</option></select></td>"+
		"<td style='width:5%'><input id='stamp_from' type='text'/ style='color:#000000'></td>"+ 
		"<td style='width:5%'><input id='stamp_to' type='text'/ style='color:#000000'></td>"+ 
		"<td style='width:10%'><input id='stamp_ps' type='text'/ style='color:#000000'></td>"+ 
		"<td style='width:10%'><img src='img2/Email-Attachment-icon.png' class='btnSave'><img src='img2/Email-Delete-icon.png' class='btnDelete'/></td>"+ 
		"</tr>"); 
	$(".btnSave").bind("click", SaveInMailMng);	
	$(".btnDelete").bind("click", DeleteInMailMng); 	
	CountMailTableInMailMng();
}; 

function MailPostInMailMng(){
	$('#addmailweap').prop('disabled', true);
	$('#addmailweap').css('opacity','0.4');
	var titleList = [];
	var deliveryMethodList = [];
	var fromList = [];
	var toList = [];
	var mailNumberList = [];
	var houseid = [];

	$('#containMail tr').each(function() {		
	    var mailNumber = $(this).find("#mailNumber").html();
	    var deliveryMethod = $(this).find("#deliveryMethod").html();  	    	
	    var toUser = $(this).find("#toUser").html();  	    	
	    var formUser = $(this).find("#fromUser").html();  	    	
	    var psText = $(this).find("#psText").html();  
	    // console.log(mailNumber);
	    // console.log(deliveryMethod);
	    // console.log(toUser);
	    // console.log(formUser);
	    // console.log(psText);
	    
	    //alert("deliveryMethod" + deliveryMethod);
	    if(mailNumber != undefined && deliveryMethod != undefined && toUser != undefined && formUser != undefined && psText != undefined){    	
		mailNumberList.push(mailNumber);		
//		deliveryMethodList.push(deliveryMethod);
		switch(deliveryMethod){
			case '包裹':
				deliveryMethodList.push('parcel');	
			break;	
			case '掛號':
				deliveryMethodList.push('certified');
			break;	
			case '生鮮':
				deliveryMethodList.push('fresh');
			break;
			case '法院':
				deliveryMethodList.push('court');
			break;
			case '其他':
				deliveryMethodList.push('other');
			break;	
		}
		toList.push(toUser);
		fromList.push(formUser);
		titleList.push(psText);
	    }
		
	   
	 });
	// console.log("deliveryMethodList");
	// console.log(deliveryMethodList);
	// console.log(mailNumberList);
	
	if(mailNumberList.length != 0 && deliveryMethodList.length != 0 ){				
		var fd = new FormData();    
			//fd.append( 'title', titleList );
			fd.append( 'deliveryMethod', 'parcel' );
			//fd.append( 'from', fromList );
			//fd.append( 'to', toList );
			fd.append( 'mailNumber', 'jfoiwejf555' );
			fd.append( 'houseid', $('#mailtoHouseId').html());

		$.ajax({
		  url: originname+'/mails',
		  data: fd,
		  processData: false,
		  contentType: false,
		  type: 'POST',
		  success: function(data){
		    $("#mailReceiverTable tbody tr").remove();
		    $("#userSearchBar").val('');
		    alert("信件建檔完畢");
		    
			$('#addmailweap').prop('disabled', false);
			$('#addmailweap').css('opacity','1');
		  }
		});

	    	
	}else{
		    	alert("表格沒填完")
	}

	/*if(mailNumberList.length != 0 && deliveryMethodList.length != 0 && toList.length != 0 && fromList.length != 0 && titleList.length != 0){
		alert('post')	    	
	    }else{
		alert("表格有問題～")	
	}*/
	
}

function DeleteInMailMng(){ 
	var par = $(this).parent().parent(); 
	par.remove(); 
	// CountMailTableInMailMng();
	countMailAddAmount();
}; 

function SaveInMailMng(){ 
	var par = $(this).parent().parent(); //tr 
	var tdNumber = par.children("td:nth-child(1)"); 
	var tdCategory = par.children("td:nth-child(2)")
	var tdFrom = par.children("td:nth-child(3)"); 
	var tdTo = par.children("td:nth-child(4)"); 
	var stampPS = par.children("td:nth-child(5)"); 
	var tdButtons = par.children("td:nth-child(6)"); 
	tdNumber.html( "<div id='mailNumber'> "+tdNumber.children("input[type=text]").val()+"</div>"); 
	switch (tdCategory.children("select").val()) {
		case 'parcel' :
			tdCategory.html("<div id='deliveryMethod'>包裹</div>");		
			break;
		case 'certified' :
			tdCategory.html("<div id='deliveryMethod'>掛號</div>");
			break;
		case 'fresh' :
			tdCategory.html("<div id='deliveryMethod'>生鮮</div>");
			break;
		case 'court' :
			tdCategory.html("<div id='deliveryMethod'>法院</div>");
			break;
		case 'other' :
			tdCategory.html("<div id='deliveryMethod'>其他</div>");
			break;
	}	
	tdFrom.html("<div id='fromUser'>"+tdFrom.children("input[type=text]").val()+"</div>"); 
	tdTo.html("<div id='toUser'>"+tdTo.children("input[type=text]").val()+"</div>"); 
	stampPS.html("<div id='psText'>"+stampPS.children("input[type=text]").val()+"</div>");
	tdButtons.html("<img src='img2/Email-Delete-icon.png' class='btnDelete'/>"); 
	$(".btnDelete").bind("click", DeleteInMailMng); 	
	CountMailTableInMailMng();
}; 

function CountMailTableInMailMng(){
	//minute one cause title name
	//$("#mailquantity").html($('#mailReceiverTable tr').length-2);
}

/*************************divid several section***************************/
var selectNewHouseid;
var selectNewMailMethod;
var selectNewMailBarcode;
function searchMailTypeCodeInput(val) {
	var method;
	var methodFormat;
	if (val === "775975465" || val === "51732505" || val === "198825586" || val === "649230692" || val === "233656899" ){
		switch (val) {
			case '775975465' :
				method = "parcel";	
				methodFormat = "包裹";
				toaddmailbarcode(method, methodFormat);	
				break;
			case '51732505' :
				method = "certified";	
				methodFormat = "掛號";
				toaddmailbarcode(method, methodFormat);	
				break;
			case '649230692' :
				method = "fresh";	
				methodFormat = "生鮮";
				toaddmailbarcode(method, methodFormat);	
				break;
			case '233656899' :
				method = "court";	
				methodFormat = "法院";
				toaddmailbarcode(method, methodFormat);	
				break;
			case '198825586' :
				method = "other";	
				methodFormat = "其他";
				toaddmailbarcode(method, methodFormat);	
				break;
				
		}
	} else {
		alert("請輸入正確郵件類別");
		$("#searchMailTypeCode").val("");
	}
}
function toaddmailbarcode(method, methodFormat) {
	selectNewMailMethod = method;
	$(".left-mail-field div.add-mail-type-setion").css("display", "none");
    $(".left-mail-field div.add-mail-number-setion").append("<div class='selectMailMethod'><input onclick='prestagemailmethod()' type='image' src='./img2/pre2.png' alt='previous' width='auto' height='75'/>"+
    "<span>郵件類別: </span><span>" + methodFormat + "</span></p></div>"+
    "<labe>郵件編號</label><input id='poststamp_number' type='text'/ style='color:#000000' class='form-control' onchange='togetmailbarcode(this.value)' placeholder='請輸入郵件編號...'/>");
	// console.log("step2: " + method);
	$("#searchMailTypeCode").blur();
	$("#poststamp_number").focus();
}
function prestagemailmethod() {
	$(".left-mail-field div.add-mail-type-setion").css("display", "block");
	$(".left-mail-field div.add-mail-number-setion").html("");
	$("#searchMailTypeCode").val("");
	
	$("#searchMailTypeCode").focus();
	$("#poststamp_number").blur();
	$("#userSearchBarInput").blur();
}
function togetmailbarcode(val) {
	selectNewHouseid = $('#mailtoHouseId').html();
	selectNewMailBarcode = val;
	var methodFormat;
	$(".left-mail-field div.add-mail-number-setion").html("");
	//$(".left-mail-field").append("<div>" + selectNewHouseid + "</div><div>" + selectNewMailMethod + "</div><div>" + selectNewMailBarcode + "</div>");
	switch (selectNewMailMethod) {
		case 'parcel' :
			methodFormat = "包裹";		
			break;
		case 'certified' :
			methodFormat = "掛號";
			break;
		case 'fresh' :
			methodFormat = "生鮮";
			break;
		case 'court' :
			methodFormat = "法院";
			break;
		case 'other' :
			methodFormat = "其他";
			break;
	}
	$("#addMailList").append("<tr>"+ 
		"<td class='col-lg-3' id='addstamp_mailDeliveryMethod'>"+ methodFormat +"</td>"+ 
		"<td class='col-lg-6' id='addstamp_number'>"+ selectNewMailBarcode +"</td>"+  
		"<td class='col-lg-3' ><img src='img2/Email-Delete-icon.png' class='btnDelete'/></td>"+ 
		"</tr>");
	$(".btnDelete").bind("click", DeleteInMailMng);
	$(".left-mail-field div.add-mail-type-setion").css("display", "block");
	$(".left-mail-field div.add-mail-type-setion").val("0");
	$("#searchMailTypeCode").val("");
	countMailAddAmount();
	$("#searchMailTypeCode").focus();
	$("#poststamp_number").blur();
}
function countMailAddAmount(){
	var amount;
	$("#mailquantity").html($('.left-mail-table table tbody tr').length);
	amount = $('.left-mail-table table tbody tr').length;
	if (amount > 0 ) {
		$('#addmailweapbtn').prop('disabled', false);
		$('#addmailweapbtn').css('opacity','1');
	} else {
		$('#addmailweapbtn').prop('disabled', true);
		$('#addmailweapbtn').css('opacity','0.4');
	}
	// console.log("amount======> " + amount);
}
function mailListPostInMailMng(){
	$('#addmailweapbtn').prop('disabled', true);
	$('#addmailweapbtn').css('opacity','0.4');
	
	var deliveryMethodList = [];
	var mailNumberList = [];
	
	$('#addMailList tr').each(function() {
		var mailNumber = $(this).find("#addstamp_number").html();
	    var deliveryMethod = $(this).find("#addstamp_mailDeliveryMethod").html(); 
	    // console.log(mailNumber);
	    // console.log(deliveryMethod);
	    mailNumberList.push(mailNumber);
	    switch(deliveryMethod){
			case '包裹':
				deliveryMethodList.push('parcel');	
			break;	
			case '掛號':
				deliveryMethodList.push('certified');
			break;		
			case '生鮮':
				deliveryMethodList.push('fresh');
			break;	
			case '法院':
				deliveryMethodList.push('court');
			break;
			case '其他':
				deliveryMethodList.push('other');
			break;	
			
		}
		// console.log(deliveryMethodList);
		// console.log(mailNumberList);
		
	});
	if(mailNumberList.length != 0 && deliveryMethodList.length != 0 ){	
		$.ajaxSetup({
			beforeSend: function (xhr){
		        xhr.setRequestHeader("Authorization",  "bearer " + window.localStorage.getItem("Authorization"));
		    }
		});			
		var fd = new FormData();    
			fd.append( 'deliveryMethod', deliveryMethodList );
			fd.append( 'mailNumber', mailNumberList );
			fd.append( 'houseid', $('#mailtoHouseId').html());

		$.ajax({
		  url: originname+'/mails',
		  data: fd,
		  processData: false,
		  contentType: false,
		  type: 'POST',
		  success: function(data){
		  	// console.log(data);
		    $("#mailReceiverTable tbody tr").remove();
		    $("#userSearchBar").val('');
		    alert("信件建檔完畢");
		    
			$('#addmailweap').prop('disabled', false);
			$('#addmailweap').css('opacity','1');
			todoclearupcreatesection();
		  }
		});

	    	
	}else{
		alert("請輸入郵件");
		$('#addmailweap').prop('disabled', false);
		$('#addmailweap').css('opacity','1');
	}
}
function todoclearupcreatesection() {
    $(".user-search-bar #userSearchBarInput").css("display", "block");
	$("#userSearchBarInput").val("");
	$("#userSearchResult").css("display", "none");
	$(".left-mail-field").html("");
	$("#addMailList").html("");
	$("#mailquantity").html("0");
	$('#addmailweapbtn').prop('disabled', false);
	$('#addmailweapbtn').css('opacity','1');
}

