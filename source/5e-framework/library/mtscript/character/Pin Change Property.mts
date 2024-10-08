[h:props=decode(getStrProp(macro.args,"value"))]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:value=getStrProp(string(props),"value")]
[h:text=getStrProp(string(props),"text")]

[h:id=findToken(tokenName)]

[h:switchToken(id)]


[h:res=input("value|"+value+"|"+name,
"text|"+text+"|note")]
[h:abort(res)]

[h:props=setStrProp(string(props),"value",value)]
[h:props=setStrProp(string(props),"text",text)]

[h:setProperty(name,props,tokenName)]


[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("character/Macro Frame@this"):"macro=Pin Notes;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[macro("character/Manage Party@this"):""]
};{}]
[h,if(isDialogVisible("Manage")==1),code:{
[macro("character/Pin Notes@this"):"tokenName="+tokenName]
};{}]