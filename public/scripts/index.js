


var requestlist=[];
//var netmsg = {"host":"www.baidu.com","url":"/haha","requestHeader":"a","responseHeader":"b","body":"hahaha"}
//var hostmsg = {"host":"www.baidu.com","isshow":false,"netmsgs":[netmsg,netmsg]};

var host=-1;
var url=-1

var inspector_request = 0;
var inspector_response = 0;

function start_requsst(){
	setInterval('request_netlist()',1000);
}

function request_netlist(){
	$.ajax({
		url: '/charles/lists',
		type: 'get',
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		success: function(data){
			if(200 === data.code) {
				console.log("200")
			} else {
				console.log("not 200")
			}
		},
		error: function(){
			console.log("error")
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




function testlist(){
	addrequest({"host":"www.baidu.com","url":"/abcdefg","requestHeader":"header1","responseHeader":"header1","body":"今天天气真不错"})
	addrequest({"host":"www.sina.com","url":"/fdswer","requestHeader":"header2","responseHeader":"header2","body":"今天天气不好"})
	addrequest({"host":"www.baidu.com","url":"/fdwerg","requestHeader":"header3","responseHeader":"header3","body":"流量平台部"})
	addrequest({"host":"www.sina.com","url":"/gfderg","requestHeader":"header4","responseHeader":"header4","body":"深入理解java虚拟机"})
	addrequest({"host":"www.baidu.com","url":"/fdswerg","requestHeader":"header5","responseHeader":"header5","body":"redi入门指南"})
	addrequest({"host":"www.sina.com","url":"/fdsgdre","requestHeader":"header6","responseHeader":"header6","body":"html与js"})
	addrequest({"host":"www.baidu.com","url":"/fdswerg","requestHeader":"header7","responseHeader":"header7","body":"MObisage研发部"})
	addrequest({"host":"www.sina.com","url":"/fdswerg","requestHeader":"header8","responseHeader":"header8","body":"重要的事情要说三遍"})
	addrequest({"host":"www.baidu.com","url":"/fdsewrg","requestHeader":"header9","responseHeader":"header9","body":"不要回答不要回答不要回答"})
	addrequest({"host":"www.sina.com","url":"/fdsewrh","requestHeader":"header0","responseHeader":"header0","body":"道虽远,不行不至"})
	addrequest({"host":"www.baidu.com","url":"/wertgdf","requestHeader":"header43","responseHeader":"header21","body":"事虽小,不为不成"})
	addrequest({"host":"www.sina.com","url":"/bvcnhg","requestHeader":"header656","responseHeader":"header12","body":"好好学习,天天向上"})
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