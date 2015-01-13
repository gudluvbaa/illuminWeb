var keyStr = "ABCDEFGHIJKLMNOP" +
           	 "QRSTUVWXYZabcdef" +
           	 "ghijklmnopqrstuv" +
          	 "wxyz0123456789+/" +
             "=";
function userlogin() {
	//alert ("user login");
	var userID = "user1:1234";	
	encode64(userID);
}

function encode64(userID) {
	input = userID;
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
           enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
           enc4 = 64;
        }

        output = output +
           keyStr.charAt(enc1) +
           keyStr.charAt(enc2) +
           keyStr.charAt(enc3) +
           keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
     } while (i < input.length);

     //return output;
     console.log(output);
     getUserToken (output)
}            


function getUserToken (output) {
	$.ajaxSetup({
		beforeSend: function (xhr){
	        xhr.setRequestHeader("Authorization",  "Basic dXNlcjE6MTIzNA==");
	   }
	});
	var fd = new FormData();    
			fd.append( 'password', '1234' );
			fd.append( 'username', 'user1' );
			fd.append( 'grant_type', 'password' );
			fd.append( 'scope', 'read write' );
			fd.append( 'client_secret', '1234' );
			fd.append( 'client_id', 'user1' );
	$.ajax({
        url: originname + "/oauth/token",
		data: fd,
		processData: false,
		contentType: false,
        type: 'POST',
        success: function(data)
        {
        	console.log("success...");
			console.log(data);
        },
        error: function(error)
        {
        	console.log("error...");
			console.log(error);
        }
  	});
	/*$.ajaxSetup({
		beforeSend: function (xhr){
	        xhr.setRequestHeader("Authorization",  "bearer aa8fa09d-bfb5-4fee-8e32-b29a945493ee");
	    }
	});
	var fd = new FormData();    
			fd.append( 'title', 'decoration' );
	$.ajax({
        url: originname + "/decoration/household/3",
        data: fd,
		processData: false,
		contentType: false,
        type: 'POST',
        success: function(data)
        {	
        	console.log(data);
			console.log("success!!!!!!");
        },
        error: function(error)
        {
			console.log(error);
			console.log("error!!!!!!");
        }
   });*/

}
