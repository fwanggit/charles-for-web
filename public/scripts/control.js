

var source_request_url;
var turn_to_url;

var responder_list=[];


function saveclick(){
	source_request_url= document.getElementById("source-request").value;
	turn_to_url= document.getElementById("turn-to").value;
	console.log("原网址:",source_request_url);
	console.log("转向为:",turn_to_url);
}

function inspectors_checked(){
	document.getElementById("autoresponder_tab").className="";
	document.getElementById("insectors_tab").className="uk-active";
	loadHTMLDoc('inspectors.html','right-content', function () {

	});
}

function responder_checked(){
	document.getElementById("autoresponder_tab").className="uk-active";
	document.getElementById("insectors_tab").className="";
	loadHTMLDoc('responder.html','right-content', function () {
		responder_refresh();
	});

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

function responder_add(){
	var responder = {"id":0,"check":false,"request":"StringToMatch","turnto":""};
	responder_list[responder_list.length]=responder;
	responder_refresh()
}

function responder_refresh(){
	var content = "";
	for(i=0;i<responder_list.length;i++){
		responder_list[i].id=
		content+="<tr ><td><label><input type=\"checkbox\"  id='"+responder_list[i].id+"' onclick=\"responder_list_click("+i+",'"+responder_list[i].id+"')\">"+responder_list[i].request+"</label></td><td><label>"+responder_list[i].turnto+"</label></td> </tr>";
console.log(responder_list[i].id);
	}
	document.getElementById('responder-msg').innerHTML=content;
	for(i=0;i<responder_list.length;i++){
		document.getElementById(responder_list[i].id).checked = responder_list[i].check;
	}
}

function responder_list_click(position,id){
	responder_list[position].check = document.getElementById(id).checked;
}

function responder_clear(){
	responder_list=[];
	responder_refresh()
}

function responder_delete(){
var tmp=[];
	for(i=0;i<responder_list.length;i++){

if(!document.getElementById(responder_list[i].id).checked){
	tmp.push(responder_list[i]);
}
	}
	responder_list=tmp;
	responder_refresh()

}



function loadHTMLDoc(url,id,end)
{
	var xmlhttp;
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
  		end();
  		
  	}
  }
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}