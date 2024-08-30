[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:res=input("var|Delete "+name+" ("+group+") from "+tokenName+"?||label|span=true")]
[h:abort(res)]


[h:id=findToken(tokenName)]

[h:switchToken(id)]

[h:Output=getLibProperty("PC Output", "Lib:Character")]

[h:currentProp=getProperty(group)]
[h:newProp=json.remove(currentProp,name)]
[h:setProperty(group,newProp)]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

[h:closeDialog(tokenName+" - "+CapitalName)]


}]


[h,if(isDialogVisible("Manage")==1),code:{
[macro("character/Pin Notes@this"):"tokenName="+tokenName]
};{}]