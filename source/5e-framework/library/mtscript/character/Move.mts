[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:description=getStrProp(macro.args,"description")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=if(matches(tokenName,"^Lib:.*")==1,tokenName,"Lib:"+tokenName)]
[h:originalToken=tokenName]
[h:originalGroup=group]



[h:name=lower(name)]

[h:Output=function.getOutput("PC")]

<!-----------------SELF--------------------->
[h:id=findToken(tokenName)]
[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

<!----------List PC Libs----------->
[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
	[h:currentLib=listget(libList,roll.count)]
	[h:settingsProp=getLibProperty("LibName",currentLib)]
	[h,if(settingsProp==""):list=listdelete(list,listfind(list,currentLib));""]
}]
[h:tokenList=""]
[h:maps=getAllMapNames()]
[h,if(isGM()==1),count(listcount(maps)),code:{
[h:tokenList=list]
};{

	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	
	[h,count(listcount(ownedtokens)),code:{
	
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";tokenList=listappend(tokenList,currentOwned)]
	}]
}]
[h:tokenList=listsort(tokenList,"N")]


<!----------End of List PC Libs----------->


[h:find=listFind(tokenList,tokenName)]

[h:moveQuantity=0)]

[h:res=input("tokenName|"+tokenList+"|Token|list|value=string select="+find,
if(group=="Equipment","moveQuantity|1|Quantity|text|width=6",""))]
[h:abort(res)]



[h,if(matches(originalToken,"Lib:Compendium")==1):currentProp=getLibProperty(group,"Lib:Compendium");currentProp=getLibProperty(group,originalToken)]


[h:currentObject=json.get(currentProp,name)]

[h:Quantity=1]
[h:Equiped=1]
[h:offHand=0]
[h:customName=0]
[h:identified=1]

[h,if(group=="Equipment"  && matches(originalToken,"Lib:Compendium")!=1),code:{

	[h,if(json.type(currentObject)=="UNKNOWN"):"";Quantity=json.get(currentObject,"Quantity")]
	[h,if(json.type(currentObject)=="UNKNOWN"):"";Equiped=json.get(currentObject,"Equiped")]
	[h,if(json.type(currentObject)=="UNKNOWN"):"";offHand=json.get(currentObject,"offHand")]
	[h,if(json.type(currentObject)=="UNKNOWN"):"";customName=json.get(currentObject,"customName")]
	[h,if(json.type(currentObject)=="UNKNOWN"):"";identified=json.get(currentObject,"identified")]

	[macro("character/Get Equipment Info@this"):"group="+group+";name="+name]
	[h:equipInfo=macro.return]
	
	[h:newProp=json.remove(currentProp,name)]
	
	[h:Quantity=if(isNumber(Quantity)==1,Quantity,0)]
	[h:moveQuantity=if(isNumber(moveQuantity)==1,moveQuantity,0)]
	[h:moveQuantity=if(moveQuantity>Quantity,Quantity,moveQuantity)]
	[h:quantityTotal=number(Quantity-moveQuantity)]
	
	[h:object=json.fromStrProp(equipInfo+";Quantity="+quantityTotal+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";identified="+identified)]
	
	
	[h,if(quantityTotal<=0 && group=="Equipment"):"";newProp=json.set(newProp,name,currentObject)]
	[h,if(quantityTotal>0 && group=="Equipment"):newProp=json.set(newProp,name,object);""]
	
	[h:setLibProperty(group,newProp,originalToken)]

};{

[h:quantityTotal=moveQuantity]

}]

<!-----------------TARGET--------------------->


[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:currentProp=getLibProperty(group,tokenName)]

[h,if(json.type(currentProp)=="UNKNOWN"):currentProp="{}";""]

[h:objectList=json.fields(currentProp)]

[h:repeat=listcount(objectList)]


[h:alreadyHave=0]

[h,count(repeat),code:{


	[h:currentName=listget(objectList,roll.count)]

	[h:alreadyHave=matches(name,currentName)]



}]

[h,if(alreadyHave==1 && group=="Equipment"),code:{


	[h:currentObject=json.get(currentProp,currentName)]	
	[h:Quantity=json.get(currentObject,"Quantity")]
	[h:Equiped=json.get(currentObject,"Equiped")]
	[h:offHand=json.get(currentObject,"offHand")]
	[h:source=json.get(currentObject,"source")]
	[h:prereq=json.get(currentObject,"prereq")]

	[macro("character/Get Equipment Info@this"):"group="+group+";name="+name]
	[h:equipInfo=macro.return]

	[h:object=json.fromStrProp(equipInfo+";Quantity="+number(Quantity+moveQuantity)+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";identified="+identified)]

	[h:newProp=json.set(currentProp,name,if(group=="Equipment",object,currentObject))]
	[h:setLibProperty(group,newProp,tokenName)]
	
	
	
};{

	[macro("character/Get Equipment Info@this"):"group="+group+";name="+name]
	[h:equipInfo=macro.return]

	[h,if(group=="Equipment"):object=json.fromStrProp(equipInfo+";Quantity="+moveQuantity+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";identified="+identified);object=""]

	[macro("character/GetSpellLevel@this"):"group="+group+";name="+name]
	[h:level=macro.return]

[h:classes=getLibProperty("Class&Level",tokenName)]
[h:classList=json.fields(classes)]
[h:source=listget(classList,0)]
[h:source=if(source=="","Race",source)]
	
	[h,if(group=="Spells"):object=json.fromStrProp("level="+level+";source="+source+";prep=1;DC=0;Atk=0");""]

	[h:newProp=json.set(currentProp,name,object)]


	[h:setLibProperty(group,newProp,tokenName)]




}]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

[h,if(matches(originalToken,"^Lib:.*")==1 && originalToken!="Lib:Compendium"):originalToken=replace(originalToken,"^Lib:","");""]
[h,if(matches(tokenName,"^Lib:.*")==1):tokenName=replace(tokenName,"^Lib:","");""]

[h,if(quantityTotal<=0 && group=="Equipment"),code:{


	[h:closeDialog(originalToken+" - "+CapitalName)]
	
};{

	[h,if(matches(originalToken,"Lib:Compendium")==1),code:{};{

		[macro("character/Args Dialog@this"):"prop="+group+";source="+source+";name="+name+";description=;tokenName="+originalToken]

	}]
}]
[h,if(findToken(originalToken)==""):visible=0;visible=getVisible(originalToken)]

[h:link=macroLink(name,"character/Args Dialog@this","","prop="+group+";name="+name+";customName=;tokenName="+tokenName)]

[h,if(matches(originalToken,"Lib:Compendium")==1 || group!="Equipment" || json.type(currentObject)=="UNKNOWN"):"";broadcast(originalToken+" lost <b style='text-decoration:none'><font color=red>"+link+"</b>"+if(moveQuantity==0,""," x"+moveQuantity+"."),Output)]

[h:broadcast(tokenName+" got <b style='text-decoration:none'><font color=green>"+link+"</b>"+if(moveQuantity==0,""," x"+moveQuantity+if(matches(originalToken,"Lib:Compendium")==1,""," from "+originalToken))+".",Output)]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(originalToken+" - Character Sheet")==1 && originalToken!=tokenName),code:{
[macro("character/Macro Frame@this"):"macro=Character Sheet;tokenName="+originalToken]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(originalToken+" - Spellcasting Sheet")==1 && originalToken!=tokenName),code:{
[macro("character/Macro Frame@this"):"macro=Spellcasting Sheet;tokenName="+originalToken]
};{}]
[h,if(isFrameVisible(tokenName+" - Description Sheet")==1),code:{
[macro("character/Macro Frame@this"):"macro=Description Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(originalToken+" - Description Sheet")==1 && originalToken!=tokenName),code:{
[macro("character/Macro Frame@this"):"macro=Description Sheet;tokenName="+originalToken]
};{}]
[h,if(isFrameVisible(originalToken+" - Pin Notes")==1),code:{
[macro("character/Macro Frame@this"):"macro=Pin Notes;tokenName="+originalToken]
};{}]
[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("character/Macro Frame@this"):"macro=Pin Notes;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[h:closeDialog("Manage Party")]
[macro("character/Manage Party@this"):"tokenName="+if(getOwners(originalToken)=="",tokenName,originalToken)]
};{}]