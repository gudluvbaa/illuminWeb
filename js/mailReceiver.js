function Add(){ 
	$("#mailReceiverTable tbody").append( 
		"<tr>"+ 
		"<td style='width:10%'><input id='stamp_number' type='text'/ style='color:#000000' ></td>"+ 
		"<td style='width:10%'><select id='stamp_mailDeliveryMethod'/ class='form-control'/ name='deliveryMethod' ><option value='parcel'>包裹</option><option value='certified'>掛號</option><option value='other'>其他</option></select></td>"+
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
		"<td style='width:10%'><select id='stamp_mailDeliveryMethod'/ class='form-control'/ name='deliveryMethod' ><option value='parcel'>包裹</option><option value='certified'>掛號</option><option value='other'>其他</option></select></td>"+
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
	opacity: 0.5;
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
	    console.log(mailNumber);
	    console.log(deliveryMethod);
	    console.log(toUser);
	    console.log(formUser);
	    console.log(psText);
	    
	    if(mailNumber != undefined && deliveryMethod != undefined && toUser != undefined && formUser != undefined && psText != undefined){    	
		mailNumberList.push(mailNumber);		
//		deliveryMethodList.push(deliveryMethod);
		switch(deliveryMethod){
			case '包裹':
				deliveryMethodList.push('parcel');		
			case '掛號':
				deliveryMethodList.push('certified');
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
	CountMailTableInMailMng();
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
	$("#mailquantity").html($('#mailReceiverTable tr').length-2);
}