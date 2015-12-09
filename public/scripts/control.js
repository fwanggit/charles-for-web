

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
	loadHTMLDoc('inspectors.html','right-content');
}

function responder_checked(){
	document.getElementById("autoresponder_tab").className="uk-active";
	document.getElementById("insectors_tab").className="";
	loadHTMLDoc('responder.html','right-content');
}

function request_text_tab_click(){
	document.getElementById("request-msg-text-tab").className="uk-active";
	document.getElementById("request-msg-json-tab").className="";
	document.getElementById("request-msg-headers-tab").className="";
}

function request_json_tab_click(){
	document.getElementById("request-msg-text-tab").className="";
	document.getElementById("request-msg-json-tab").className="uk-active";
	document.getElementById("request-msg-headers-tab").className="";
}

function request_headers_tab_click(){
	document.getElementById("request-msg-text-tab").className="";
	document.getElementById("request-msg-json-tab").className="";
	document.getElementById("request-msg-headers-tab").className="uk-active";
}

function response_headers_tab_click(){
	document.getElementById("response-msg-headers-tab").className="uk-active";
	document.getElementById("response-msg-json-tab").className="";
	document.getElementById("response-msg-text-tab").className="";


}

function response_text_tab_click(){
	document.getElementById("response-msg-headers-tab").className="";
	document.getElementById("response-msg-json-tab").className="";
	document.getElementById("response-msg-text-tab").className="uk-active";
}

function response_json_tab_click(){
	document.getElementById("response-msg-headers-tab").className="";
	document.getElementById("response-msg-json-tab").className="uk-active";
	document.getElementById("response-msg-text-tab").className="";
}

function loadHTMLDoc(url,id)
{
	var xmlhttp;
	var txt,x,xx,i;
	if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  	xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
  	{
  		document.getElementById(id).innerHTML=xmlhttp.responseText;
  		
  		
  	}
  }
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}