

var source_request_url;
var turn_to_url;



function saveclick(){
	
	source_request_url= document.getElementById("source-request").value;
	turn_to_url= document.getElementById("turn-to").value;
	console.log("原网址:",source_request_url);
	console.log("转向为:",turn_to_url);
}

function inspectors_checked(){
	document.getElementById("autoresponder_tab").className="";
	document.getElementById("insectors_tab").className="uk-active";
	var html = document.getElementById("inspectors-tmp").innerHTML;
	document.getElementById("right-content").innerHTML=html;
}

function responder_checked(){
	document.getElementById("autoresponder_tab").className="uk-active";
	document.getElementById("insectors_tab").className="";
	var html = document.getElementById("responder-tmp").innerHTML;
	document.getElementById("right-content").innerHTML=html;
}