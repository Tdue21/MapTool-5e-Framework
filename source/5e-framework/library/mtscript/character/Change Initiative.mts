[h:props=decode(getStrProp(macro.args,"value"))]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:value=getStrProp(string(props),"value")]
[h:text=getStrProp(string(props),"text")]
[h:adv=getStrProp(string(props),"adv")]

[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]


[h:res=input("value|"+value+"|"+name,
"text|"+text+"|note",
"adv|Normal Roll,Advantage,Disadvantage,Always ask|Roll with|list|select="+adv)]
[h:abort(res)]

[h:props=setStrProp(string(props),"value",value)]
[h:props=setStrProp(string(props),"text",text)]
[h:props=setStrProp(string(props),"adv",adv)]

[h:setLibProperty(name,props,"Lib:"+tokenName)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Description Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Description Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Statblock;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Pin Notes;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[macro("Manage Party@Lib:Character"):""]
};{}]