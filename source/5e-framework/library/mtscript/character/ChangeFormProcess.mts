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
[r:sources=json.get(macro.args,"sources")]
[r:tokenName=json.get(macro.args,"tokenName")]
[r:id=json.get(macro.args,"id")]
[r:customName=json.get(macro.args,"customName")]

[h:name=lower(name)]
[h:title=lower(title)]

[h:value=replace(value,"\\s*\$","")]
[h:value=replace(value,"^\\s*","")]

[h:title=replace(title,"^\\s*","")]
[h:title=replace(title,"\\s*\$","")]

[r:currentProp=getLibProperty(group,function.getNamespace())]

[h:Output=function.getOutput("PC")]

[r,if(index=="new"),code:{
	[h:object=json.set("","description",value)]
	[h:object=json.set(object,"sources",json.fromList(sources))]

	[r:newProp=json.set(currentProp,title,object)]
	[h:setLibProperty(group,newProp,function.getNamespace())]

};{

	[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):"";object=json.get(currentProp,title)]

	[h:itemObj=json.set("","description",value)]
	[h:itemObj=json.set(itemObj,"sources",json.fromList(sources))]
	[r:newProp=json.set(currentProp,title,itemObj)]
	
	[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):"";setLibProperty(group,newProp,function.getNamespace())]

}]



[r,if(matches(tokenName,"^Lib:.*")==1),code:{};{

	[h,if(id==""):"";switchToken(id)]

	<!--------------------Detect Spell Level---------------------->
	[h:description=substring(value,0,if(length(value)<25,length(value),25))]
	[h:id=strfind(description,"(\\d)\\w{2}-level|([Cc]antrip)")]
	[h,if(getFindCount(id)>=1),code:{
		[h:group1=getGroup(id,1,1)]
		[h:group2=getGroup(id,1,2)]
		[h,if(matches(group2,"[Cc]antrip")==1):level=0;level=group1]
	};{
		[h:level=""]
	}]
	<!--------------------Detect Equipment Info---------------------->
	[description=value]
	[h:HRindex=indexOf(description,"---")]
	[h,if(HRindex==-1):"";description=substring(description,0,HRindex)]
	[h:isWeapon=""]
	[h:weight=""]
	[h:id=strfind(description,"(?:[Mm]artial|[Mm]elee|[Ss]imple|[Rr]anged)\\s([Ww]eapon)|(\\d*\\.?\\d+)\\slbs?\\.?")]
	[h,if(getFindCount(id)>=1),count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
		[h,if(group1==""):"";isWeapon=group1]
		[h,if(group2==""):"";weight=group2]
	};{}]
	[h:EquipInfo="isWeapon="+if(isWeapon=="",0,1)+";weight="+weight]

	[h:ListProperty=getLibProperty(group,"Lib:"+tokenName)]
	[h:hasField=if(json.type(ListProperty)=="UNKNOWN",0,1)]

	[r,if(index=="new"),code:{


		
		[h:metadata=if(group=="Equipment",json.fromStrProp(EquipInfo+";Quantity=1;Equiped=1;offHand=0;identified=1"),if(group=="Feats" || group=="AdditionalFeats","Class",json.fromStrProp("level="+level+";prep=1;Atk=0;DC=0;source=Class")))]
		[h:ListProperty=json.set(ListProperty,title,metadata)]
		[h:setLibProperty(group,ListProperty,"Lib:"+tokenName)]
	
	
	
	};{}]


	[r,if(hasField==1),code:{
	
		[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):metadata=value;metadata=json.get(ListProperty,title)]
		[h:ListProperty=json.set(ListProperty,title,metadata)]
		[h,if(oldName==title):"";ListProperty=json.remove(ListProperty,oldName)]
		[h:setLibProperty(group,ListProperty,"Lib:"+tokenName)]
	
	};{}]


	

}]



[h,if(group=="Notes"):setNotes(value);""]
[h,if(group=="GMNotes"):setGMNotes(value);""]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(oldName)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

[h,if(tokenName=="Lib:Compendium"):lib="Lib:Campaign";lib=function.getNamespace()]

[h,if(oldName!=title && isDialogVisible(tokenName+" - "+CapitalName)==1),code:{
[h:closeDialog(tokenName+" - "+oldName)]
[macro("Args Dialog@"+lib):"prop="+group+";index="+index+";source="+source+";name="+title+";customName="+customName+";description=;tokenName="+tokenName]
};{}]

[h,if(isDialogVisible(tokenName+" - "+CapitalName)==1),code:{
[macro("Args Dialog@"+lib):"prop="+group+";index="+index+";source="+source+";name="+title+";customName="+customName+";description=;tokenName="+tokenName]
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