


var requestlist=[];
//var netmsg = {"host":"www.baidu.com","url":"/haha","requestHeader":"a","responseHeader":"b","body":"hahaha","ip":"127.0.0.1","id":"123456"}
//var hostmsg = {"host":"www.baidu.com","isshow":false,"netmsgs":[netmsg,netmsg]};

var host=-1;
var url=-1

var inspector_request = 0;
var inspector_response = 0;

var ipfilter = "";
var domainfilter = "";

function addRule(){
	ipfilter=$("#ipfilter").val();
	domainfilter=$("#domainfilter").val();
}

function request_netlist(){
	var socket = io();
	//socket.emit('proxy', $('#m').val());
	//$('#m').val('');
	socket.on('proxy', function(msg){
		var json = $.parseJSON(msg);

		if(ipfilter!=""&&json.ip!=ipfilter){
			return;
		}
		if(json.request){
			var url = json.request.url;
			var fdStart = url.indexOf("http://");
			if(fdStart == 0){
				var endurl = url.split("http://")[1];
				var host =  endurl.split("/")[0];
				if(domainfilter==""||host.indexOf(domainfilter)>0){

					var theurl = endurl.split("/")[1];
					if(!theurl){
						theurl = "<UNKNOWN>";
					}
					var headers = json.request.headers;
					headers = headers.substr(1,headers.length-2);
					headers = $.parseJSON(headers);
					var header = "";
					for(var key in headers){

						header+=key+":" + headers[key]+"<br>";
					}


					addrequest({"host":"http://"+host,"url":theurl,"requestHeader":header,
						"responseHeader":"","body":"","id":json.id,"ip":json.ip})
				}


			}else if(fdStart == -1){

			}

        }else if(json.data){
var has = false;
			for(i=0;i<requestlist.length;i++){

				for(j=0;j<requestlist[i].netmsgs.length;j++){
					if(requestlist[i].netmsgs[j].id==json.id){
						requestlist[i].netmsgs[j].body=json.data;
						listrefresh();
						has = true;
						break;
					}
				}
				if(has){
					break;
				}

			}
		}

	});
}


function inspectors_checked(end){
	document.getElementById("autoresponder_tab").className="";
	document.getElementById("insectors_tab").className="uk-active";
	loadHTMLDoc('inspectors.html','right-content', function () {
		if(end){end()}

	});
}

function responder_checked(end){
	document.getElementById("autoresponder_tab").className="uk-active";
	document.getElementById("insectors_tab").className="";
	loadHTMLDoc('responder.html','right-content', function () {
		responder_refresh()
		if(end){end()}
	});

}

function request_text_tab_click(){
	inspector_request = 1;
	document.getElementById("request-msg-text-tab").className="uk-active";
	document.getElementById("request-msg-json-tab").className="";
	document.getElementById("request-msg-headers-tab").className="";
if(host!=-1&&url!=-1){
	document.getElementById('request-msg-panel').innerHTML= requestlist[host].netmsgs[url].url;
}

}

function request_json_tab_click(){
	inspector_request = 2;
	document.getElementById("request-msg-text-tab").className="";
	document.getElementById("request-msg-json-tab").className="uk-active";
	document.getElementById("request-msg-headers-tab").className="";

	if(host!=-1&&url!=-1){
		document.getElementById('request-msg-panel').innerHTML= "";
	}
}

function request_headers_tab_click(){
	inspector_request = 0;
	document.getElementById("request-msg-text-tab").className="";
	document.getElementById("request-msg-json-tab").className="";
	document.getElementById("request-msg-headers-tab").className="uk-active";

	if(host!=-1&&url!=-1){
		document.getElementById('request-msg-panel').innerHTML= requestlist[host].netmsgs[url].requestHeader;
	}
}

function response_headers_tab_click(){
	inspector_response=0;
	document.getElementById("response-msg-headers-tab").className="uk-active";
	document.getElementById("response-msg-json-tab").className="";
	document.getElementById("response-msg-text-tab").className="";

	if(host!=-1&&url!=-1){
		document.getElementById('response-msg-panel').innerHTML=requestlist[host].netmsgs[url].responseHeader;
	}


}

function response_text_tab_click(){
	inspector_response=1;
	document.getElementById("response-msg-headers-tab").className="";
	document.getElementById("response-msg-json-tab").className="";
	document.getElementById("response-msg-text-tab").className="uk-active";

	if(host!=-1&&url!=-1){
		document.getElementById('response-msg-panel').innerHTML=requestlist[host].netmsgs[url].body;
	}
}

function response_json_tab_click(){
	inspector_response=2;
	document.getElementById("response-msg-headers-tab").className="";
	document.getElementById("response-msg-json-tab").className="uk-active";
	document.getElementById("response-msg-text-tab").className="";

	if(host!=-1&&url!=-1){
		document.getElementById('response-msg-panel').innerHTML="";
	}
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






function addrequest(netmsg){
	var has = false;
	for(i=0;i<requestlist.length;i++){
		if(requestlist[i].host==netmsg.host){
			has=true;
			requestlist[i].netmsgs[requestlist[i].netmsgs.length]=netmsg;
		}
	}
	if(!has){
		requestlist[requestlist.length] =  {"host":netmsg.host,"isshow":false,"netmsgs":[netmsg]};
	}
	listrefresh()

}

function hostclick(postion){
	requestlist[postion].isshow = !requestlist[postion].isshow;
	if(requestlist[postion].isshow&&host==postion){
		host=-1;
		url=-1;
	}
	listrefresh()
}

function urlclick(host,postion){
	this.host = host;
url=postion;
	inspectors_checked(function (){
	switch (inspector_request){
				case 0:
						request_headers_tab_click();
					break;
				case 1:
					request_text_tab_click();
					break;
				case 2:
						request_json_tab_click()
					break;

			}
			switch (inspector_response){
				case 0:
						response_headers_tab_click()
					break;
				case 1:
						response_text_tab_click()
					break;
				case 2:
						response_json_tab_click()
					break;
			}
	});
		//点击一条信息,改变背景色
			//document.getElementById('request_list__'+host+"_"+postion).style.backgroundColor="#6495ED";
}

function listrefresh(){
	var content = "";
	for(i=0;i<requestlist.length;i++){
		content+="<li style=\"font-size:18px;margin-left: 10px\" onclick='hostclick("+i+")' > <b>"+requestlist[i].host+"</b></li>";
		if(requestlist[i].isshow){
			for(j=0;j<requestlist[i].netmsgs.length;j++){
				content+="<li style=\"font-size:14px;margin-left: 10px;height:14px\" id='request_list__"+i+"_"+j+"'' onclick='urlclick("+i+","+j+")' ><p style=\"margin-left: 30px\">"+requestlist[i].netmsgs[j].url+"</p> </li>";
			}
		}
	}
	document.getElementById('request_list').innerHTML=content;
}

function clearclick(){
	requestlist.length=0;
	listrefresh();
}