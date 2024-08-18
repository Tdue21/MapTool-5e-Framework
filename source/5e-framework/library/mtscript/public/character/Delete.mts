[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:res=input("var|Delete "+name+" ("+group+") from "+tokenName+"?||label|span=true")]
[h:abort(res)]


[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]

[h:Output=getLibProperty("PC Output", "Lib:Character")]

[h:currentProp=getLibProperty(group,"Lib:"+tokenName)]
[h:newProp=json.remove(currentProp,name)]
[h:setLibProperty(group,newProp,"Lib:"+tokenName)]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

[h:closeDialog(tokenName+" - "+CapitalName)]

[h:link=macroLink(name,"Args Dialog@Lib:Character","","prop="+group+";name="+name+";customName=;tokenName="+tokenName)]

[h,if(matches(tokenName,"^Lib:.*")==1):"";broadcast(tokenName+" removed <font color=red><b style='text-decoration:none'>"+link+"</b></font>.",Output)]
}]


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

[h,if(isDialogVisible("Manage Additional Feats")==1),code:{
[macro("Manage Additional Feats@Lib:Character"):""]
};{}]
[h,if(isDialogVisible("Manage Feats")==1),code:{
[macro("Manage Feats@Lib:Character"):""]
};{}]
[h,if(isDialogVisible("Manage Equipment")==1),code:{
[macro("Manage Equipment@Lib:Character"):""]
};{}]
[h,if(isDialogVisible("Manage Spells")==1),code:{
[macro("Manage Spells@Lib:Character"):""]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[h:closeDialog("Manage Party")]
[macro("Manage Party@Lib:Character"):"tokenName="+tokenName]
};{}]