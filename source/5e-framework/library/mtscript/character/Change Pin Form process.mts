[r:cancel=json.get(macro.args,"cancel")]
[r:cancel=if(cancel=="cancel",0,1)]
[h:abort(cancel)]



[r:title=json.get(macro.args,"title")]
[r:oldName=json.get(macro.args,"oldName")]
[r:value=json.get(macro.args,"value")]
[r:group=json.get(macro.args,"prop")]
[r:name=json.get(macro.args,"name")]
[r:index=json.get(macro.args,"index")]
[r:source=json.get(macro.args,"source")]
[r:tokenName=json.get(macro.args,"tokenName")]
[r:id=json.get(macro.args,"id")]
[r:customName=json.get(macro.args,"customName")]

[h:value=replace(value,"\\s*\$","")]
[h:value=replace(value,"^\\s*","")]

[h:title=replace(title,"^\\s*","")]
[h:title=replace(title,"\\s*\$","")]

[r:currentProp=getLibProperty(group,"Lib:Compendium")]

[h:Output=getLibProperty("PC Output", "Lib:Character")]

[r,if(index=="new"),code:{
	[h:object=value]

	[r:newProp=json.set(currentProp,title,object)]
	[h:setLibProperty(group,newProp,"Lib:Compendium")]

};{

	[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):"";object=json.get(currentProp,title)]
	[r:newProp=json.set(currentProp,title,value)]
	[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):"";setLibProperty(group,newProp,"Lib:Compendium")]

}]




[h,if(id==""):"";switchToken(id)]


[r,if(index=="new"),code:{
	

	
	[h:ListProperty=getProperty(group)]
	[h:metadata=if(group=="Equipment",json.fromStrProp("Quantity=1;Equiped=1;offHand=0"),if(group=="Feats" || group=="AdditionalFeats","Class",json.fromStrProp("prep=1;Atk=0;DC=0;source=Class")))]
	[h:ListProperty=json.set(ListProperty,title,metadata)]
	[h:setProperty(group,ListProperty)]



};{

	
	[h:ListProperty=getProperty(group)]
	[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):metadata=value;metadata=json.get(ListProperty,oldName)]
	[h:ListProperty=json.set(ListProperty,title,metadata)]
	[h,if(oldName==title):"";ListProperty=json.remove(ListProperty,oldName)]
	[h:setProperty(group,ListProperty)]

}]





[h,token(tokenName),if(group=="Notes"):setNotes(value,findToken(tokenName));""]
[h,token(tokenName),if(group=="GMNotes"):setGMNotes(value,findToken(tokenName));""]
[h,if(group=="Notes" && id!=""):setNotes(value);""]
[h,if(group=="GMNotes" && id!=""):setGMNotes(value);""]




[h,if(isDialogVisible("Manage")==1),code:{
[macro("character/Pin Notes@this"):"tokenName="+tokenName]
};{}]
