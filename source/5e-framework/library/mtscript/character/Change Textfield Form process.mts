[r:cancel=json.get(macro.args,"cancel")]
[r:cancel=if(cancel=="cancel",0,1)]
[h:abort(cancel)]

[h:start=getLibProperty("Start","Lib:Campaign")]

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



[r,if(matches(tokenName,"^Lib:.*")==1),code:{};{

	[h,if(id==""):"";switchToken(id)]


	[r,if(index=="new"),code:{
		

		
		[h:ListProperty=getLibProperty(group,"Lib:"+tokenName)]
		[h:metadata=if(group=="Equipment",json.fromStrProp("Quantity=1;Equiped=1;offHand=0"),if(group=="Feats" || group=="AdditionalFeats","Class",json.fromStrProp("prep=1;Atk=0;DC=0;source=Class")))]
		[h:ListProperty=json.set(ListProperty,title,metadata)]
		[h:setLibProperty(group,ListProperty,"Lib:"+tokenName)]
	
	
	
	};{
	
		
		[h:ListProperty=getLibProperty(group,"Lib:"+tokenName)]
		[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):metadata=value;metadata=json.get(ListProperty,oldName)]
		[h:ListProperty=json.set(ListProperty,title,metadata)]
		[h,if(oldName==title):"";ListProperty=json.remove(ListProperty,oldName)]
		[h:setLibProperty(group,ListProperty,"Lib:"+tokenName)]
	
	}]

}]



[h,token("Lib:"+tokenName),if(group=="Notes"):setNotes(value,findToken("Lib:"+tokenName,start),start);""]
[h,token("Lib:"+tokenName),if(group=="GMNotes"):setGMNotes(value,findToken("Lib:"+tokenName,start),start);""]
[h,if(group=="Notes" && id!=""):setNotes(value);""]
[h,if(group=="GMNotes" && id!=""):setGMNotes(value);""]

[h,if(oldName!=title && isDialogVisible(tokenName+" - "+oldName)==1),code:{
[h:closeDialog(tokenName+" - "+oldName)]
[macro("character/Args Dialog@this"):"prop="+group+";index="+index+";source="+source+";name="+title+";customName="+customName+";description="+encode(value)+";tokenName="+tokenName]
};{}]

[h,if(isDialogVisible(tokenName+" - "+oldName)==1),code:{
[macro("character/Args Dialog@this"):"prop="+group+";index="+index+";source="+source+";name="+title+";customName="+customName+";description="+encode(value)+";tokenName="+tokenName]
};{}]

[h,if(isDialogVisible(tokenName+" - Info")==1),code:{
[macro("character/Info@this"):"tokenName="+tokenName]
};{}]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Description Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Description Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("character/Macro Frame@this"):"macro=Statblock;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("character/Macro Frame@this"):"macro=Pin Notes;tokenName="+tokenName]
};{}]

[h,if(isDialogVisible("Manage Additional Feats")==1),code:{
[macro("character/Manage Additional Feats@this"):""]
};{}]
[h,if(isDialogVisible("Manage Feats")==1),code:{
[macro("character/Manage Feats@this"):""]
};{}]
[h,if(isDialogVisible("Manage Equipment")==1),code:{
[macro("character/Manage Equipment@this"):""]
};{}]
[h,if(isDialogVisible("Manage Spells")==1),code:{
[macro("character/Manage Spells@this"):""]
};{}]