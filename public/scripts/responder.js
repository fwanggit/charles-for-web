

var source_request_url;
var turn_to_url;



function saveclick(){
	
	source_request_url= document.getElementById("source-request").value;
	turn_to_url= document.getElementById("turn-to").value;
	console.log("原网址:",source_request_url);
	console.log("转向为:",turn_to_url);
}