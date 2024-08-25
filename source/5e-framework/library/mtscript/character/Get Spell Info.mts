[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:source=getStrProp(macro.args,"source")]

[h:AllSpells=getLibProperty("Spells","Lib:Compendium")]
[h:spellObj=json.get(AllSpells,name)]
[h:description=json.get(spellObj,"description")]

[h:SaveAttribute=""]
[h:id=strfind(description,"(\\w*)\\s[Ss]aving\\s[Tt]hrow")]
[h,count(getFindCount(id)),code:{

	[h:SaveAttribute=getGroup(id,1,1)]

}]

[h:requiresAttack=matches(description,"[\\w\\W]*[Ss]pell\\s[Aa]ttack[\\w\\W]*")]
[h:area=matches(description,"[\\w\\W]*[Rr]adius[\\w\\W]*|[\\w\\W]*[Cc]ube[\\w\\W]*|[\\w\\W]*[Ss]quare[\\w\\W]*")]


[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]
[h:totalLevel=0]
[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]
[r,count(repeat,""),code:{
	[h:className=listget(classList,roll.count)]
	[h:object=json.get(classes,className)]
	[h:class=json.get(object,"name")]
	[h:level=json.get(object,"level")]
	[h:totalLevel=totalLevel+level]
}]
[h:profBonus=ceil(totalLevel/4)+1]

[h:knownSpells=getLibProperty("Spells","Lib:"+tokenName)]
[h,if(json.type(knownSpells)=="UNKNOWN"):currentKnownSpell="";currentKnownSpell=json.get(knownSpells,name)]
[h,if(json.type(currentKnownSpell)=="UNKNOWN"):attribute="";attribute=json.get(currentKnownSpell,"customAtr")]

[h,if(attribute==0 || attribute==""),code:{

	[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]
	[h:currentClass=json.get(classes,source)]
	[h,if(json.type(currentClass)=="UNKNOWN"):attribute=0;attribute=json.get(currentClass,"spellcasting")]

};{}]


[h:value=getLibProperty(attribute,"Lib:"+tokenName)]
[h:value=getStrProp(value,"value")]
[h:value=if(value=="",0,value)]
[h,if(isNumber(value)==0):value=eval(value);value]
[h:mod=floor(number(eval(string(value)))/2-5)]


[h:macro.return="mod="+mod+";profBonus="+profBonus+";attack="+requiresAttack+";save="+SaveAttribute+";template="+area]