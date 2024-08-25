[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:currentClass=getStrProp(macro.args,"class")]
[h:atrList="-,"+getLibProperty("Attributes","Lib:Character")]

[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]


<!-----------------Character------------------->
[h:delete=0]
[h:deleteObject=""]
[h:object=""]
[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]


[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]






[h,count(repeat,""),code:{

	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:level=json.get(object,"level")]
	[h:subclass=json.get(object,"subclass")]
	[h:note=json.get(object,"note")]
	[h:hitDice=json.get(object,"hitDice")]
	[h:spellcasting=json.get(object,"spellcasting")]
	[h:spellSelect=listfind(atrList,spellcasting)]

	[h:oldName=name]

	[h,if(name==currentClass):res=input(
		"name|"+name+"|Class",
		"level|"+level+"|Level",
		"subclass|"+subclass+"|Archetype",
		"note|"+note+"|Note",
		"hitDice|"+hitDice+"|Hit Dice",
		"spellcasting|"+atrList+"|Spellcasting Ability|list|value=string select="+spellSelect,
		"delete|0|Remove Class|Check");res=1]
	

	[h:hitDice=if(isNumber(hitDice)==1,"d"+hitDice,hitDice)]
	[h:hitDice=if(matches(hitDice,"\\d+d\\d+")==1,replace(hitDice,"\\d+","",1),hitDice)]
	
	[h:object=json.set(object,"level",level)]
	[h:object=json.set(object,"subclass",subclass)]
	[h:object=json.set(object,"hitDice",hitDice)]
	[h:object=json.set(object,"spellcasting",spellcasting)]

	[h,if(name!=oldName):deleteObject=oldName;""]
	[h,if(delete==1):deleteObject=name;""]
	
	[h:delete=0]
	
	[h:classes=json.set(classes,name,object)]


}]

[h,if(currentClass=="New Class"),code:{
	
	[h:res=input("name||Class","level||Level","subclass||Archetype","hitDice||Hit Dice","spellcasting|"+atrList+"|Spellcasting Ability|list|value=string")]
	[h:abort(res)]
	[h:res=if(name=="",0,1)]
	[h:abort(res)]
	[h:res=if(name==0,0,1)]
	[h:abort(res)]

	[h:hitDice=if(isNumber(hitDice)==1,"d"+hitDice,hitDice)]
	[h:hitDice=if(matches(hitDice,"\\d+d\\d+")==1,replace(hitDice,"\\d+","",1),hitDice)]
	

	[h:object=json.set(object,"level",level)]
	[h:object=json.set(object,"subclass",subclass)]
	[h:object=json.set(object,"hitDice",hitDice)]
	[h:object=json.set(object,"spellcasting",spellcasting)]
	[h:classes=json.set(classes,name,object)]

};{}]



[h,if(deleteObject==""):"";classes=json.remove(classes,deleteObject)]

[h:setLibProperty("Class&Level",classes,"Lib:"+tokenName)]

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