[h:attributeList=getLibProperty("Attributes", function.getNamespace())]
[h:skillList=getLibProperty("Skills", function.getNamespace())]
[h:passiveSkillList=getLibProperty("Passive Checks", function.getNamespace())]



[h:tokenName=getStrProp(macro.args,"tokenName")]


[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

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

	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:class=json.get(object,"name")]
	[h:level=json.get(object,"level")]
	[h:subclass=json.get(object,"subclass")]

	[h:totalLevel=totalLevel+level]
	

}]


[h:profBonus=if(totalLevel>16,6,if(totalLevel>12,5,if(totalLevel>8,4,if(totalLevel>4,3,2))))]

<!-----------------Set Skills if empty------------------->
[h:SkillObject=getLibProperty("Skills","Lib:"+tokenName)]
[h:array=json.fromList(skillList,";")]
[h:object=""]
[h,if(json.type(SkillObject)=="UNKNOWN"),count(countStrProp(skillList),"<br><br>"),code:{

	[h:skillName=indexKeyStrProp(skillList,roll.count)]
	[h:skillAttribute=indexValueStrProp(skillList,roll.count)]
	[h:object=json.set(object,"name",skillName)]
	[h:object=json.set(object,"prof",0)]
	[h:object=json.set(object,"attribute",skillAttribute)]
	[h:object=json.set(object,"other",0)]
	[r:array=json.set(array,roll.count,object)]

	

};{}]

[h,if(json.type(SkillObject)=="UNKNOWN"),code:{

	[h:setLibProperty("Skills",array,"Lib:"+tokenName)]
	[h:SkillObject=array]

};{}]


<!-----------------Skills------------------->

[h:modList=""]
[h:repeat=listcount(json.fields(SkillObject))]
[h,count(repeat,""),code:{

	[h:object=json.get(SkillObject,roll.count)]
	[h:skillName=json.get(object,"name")]
	[h:prof=json.get(object,"prof")]
	[h:other=json.get(object,"other")]
	[h:half=json.get(object,"half")]
	[h:skillAttribute=json.get(object,"attribute")]
	[h:atrValue=getStrProp(getLibProperty(skillAttribute,"Lib:"+tokenName),"value")]
	[h:atrValue=if(atrValue=="",0,atrValue)]
	[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
	[h:mod=if(isNumber(atrValue)==0,0,atrValue)]
	[h:mod=floor(mod/2-5)]
	
	[h:bonus=if(prof==0,if(half==1,floor(profBonus/2),if(half==2,ceil(profBonus/2),profBonus*prof)),profBonus*prof)]
	
	[h:skillBonus=mod+bonus]
	[h:atr=upper(substring(skillAttribute,0,3),1)]
	[h:bonusDisplay=number(skillBonus+other)]
	[h:profDisplay=if(prof==0,"O",if(prof==1,"X","E"))]




	[h:modList=listappend(modList,bonusDisplay)]
}]


[h:passiveIndex=""]
[h,count(listcount(passiveSkillList),""),code:{
	[h:passiveCheckName=listget(passiveSkillList,roll.count)]
	[h,count(countStrProp(skillList),""),code:{	
		[h:currentProp=indexKeyStrProp(skillList,roll.count)]
		[h,if(currentProp==passiveCheckName):passIveIndex=listappend(passIveIndex,roll.count);""]
	}]
}] 

[r,count(listcount(passiveIndex),""),code:{

	[h:index=listget(passiveIndex,roll.count)]
	[h:object=json.get(SkillObject,index)]

	<table width=100%>
	<tr>
	<td width=28 align=center style="border-style: solid; border-width:2px;font-size:10px">


	[r:mod=10+listget(modList,index)]

	<td align=center valign=middle style="border-style: solid; border-width:1px; margin:0px; padding:0px;font-size:6px">
	
	PASSIVE	[r:upper(json.get(object,"attribute"))]	([r:name=upper(json.get(object,"name"))])

	[h:setLibProperty("Passive "+name,mod,"Lib:"+tokenName)]
	[h,if(id!=""):setProperty("Passive "+name,mod)]

	</table>
}] 
