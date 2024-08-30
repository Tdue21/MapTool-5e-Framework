[r:cancel=json.get(macro.args,"cancel")]
[r:cancel=if(cancel=="cancel",0,1)]
[h:abort(cancel)]

[r:title=json.get(macro.args,"title")]
[r:value=json.get(macro.args,"value")]
[r:group=json.get(macro.args,"prop")]
[r:featName=json.get(macro.args,"name")]
[r:tokenName=json.get(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:value=replace(value,";","SEMICOLONPLACEHOLDER")]

[h:value=replace(value,"\\s*\$","")]

[h:name=getProperty("CreatureName")]

[h,if(name==""):"";BestiaryObj=getLibProperty("Bestiary","Lib:Compendium")]

[h,if(name==""):object=getProperty("Stats");object=json.get(BestiaryObj,name)]

[h,if(json.type(object)=="UNKNOWN"):object="{}"]

[h:CurrentObject=json.get(object,group)]
[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]


[r:delete=json.get(macro.args,"delete")]
[r,if(delete=="Delete"),code:{


	[h:CurrentObject=json.remove(CurrentObject,title)]
	

};{



	[h,if(group!="GMNotes"):CurrentObject=json.set(CurrentObject,title,value)]
	


}]

[h,if(group=="GMNotes"):setGMNotes(value);""]

[h:object=json.set(object,group,CurrentObject)]

[h,if(name==""):setProperty("Stats",object);setLibProperty("Bestiary",json.set(BestiaryObj,name,object),"Lib:Compendium")]

[macro("bestiary/Macro Frame@this"):tokenName]

[h:CapitalName=function.Capitalize(tokenName)]

[h,if(isDialogVisible(CapitalName+" - Info")==1),code:{
[macro("bestiary/Info@this"):"name="+name+";tokenName="+tokenName]
};{}]