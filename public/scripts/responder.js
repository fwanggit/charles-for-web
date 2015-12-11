/**
 * Created by tzc on 2015/12/11.
 */
var responder_list=[];
var checked=-1

function saveclick(){
    if(checked!=-1){
        responder_list[checked].request = document.getElementById("source-request").value;
        responder_list[checked].turnto = document.getElementById("turn-to").value;
    }
    responder_refresh()
}

function responder_add(){
    var responder = {"id":0,"position":0,"check":false,"request":"StringToMatch","turnto":""};
    responder_list[responder_list.length]=responder;
    responder_refresh()
}

function responder_refresh(){
    var content = "";
    for(i=0;i<responder_list.length;i++){
        if(checked==responder_list[i].position){
            checked=i;
        }
        responder_list[i].position=i;
        responder_list[i].id="respinder_list_"+i;
        content+="<tr onclick=\"responder_list_click("+i+")\" id=\"responder_list__tr"+i+"\"><td><label><input type=\"checkbox\"  id='"+responder_list[i].id+"' onclick=\"responder_list_check("+i+")\"></label></td><td>"+responder_list[i].request+"</td><td><label>"+responder_list[i].turnto+"</label></td> </tr>";

    }

    document.getElementById('responder-msg').innerHTML=content;
    for(i=0;i<responder_list.length;i++){
        document.getElementById(responder_list[i].id).checked = responder_list[i].check;
    }
    if(checked!=-1){
        document.getElementById('responder_list__tr'+checked).style.backgroundColor="#6495ED";
    }
}

function responder_list_click(position){
    if(checked==position){
        checked=-1
    }else{
        checked=position;

    }
    refresh_form()
    responder_refresh()

}

function refresh_form(){
    if(checked==-1){
        document.getElementById("source-request").value = '';
        document.getElementById("turn-to").value= '';
    }else{
        document.getElementById("source-request").value = responder_list[checked].request;
        document.getElementById("turn-to").value= responder_list[checked].turnto;
    }

}

function responder_list_check(position){
    responder_list[position].check = document.getElementById("respinder_list_"+position).checked;
}

function responder_clear(){
    responder_list=[];
    checked=-1;
    responder_refresh()
}

function responder_delete(){
    var tmp=[];
    if(checked!=-1&&document.getElementById(responder_list[checked].id).checked){
        checked=-1;
    }
    for(i=0;i<responder_list.length;i++){

        if(!document.getElementById(responder_list[i].id).checked){
            tmp.push(responder_list[i]);
        }
    }
    responder_list=tmp;
    responder_refresh()

}
