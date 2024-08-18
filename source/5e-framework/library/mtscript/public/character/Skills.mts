<table style="border-style: solid; border-width:2px 1px 2px 1px; margin-top:5">


[h:attributeList=getLibProperty("Attributes", "Lib:Character")]
[h:skillList=getLibProperty("Skills", "Lib:Character")]
[h:passiveSkillList=getLibProperty("Passive Checks", "Lib:Character")]

[h:outputPC=getLibProperty("PC Output", "Lib:Character")]
[h:outputGM=getLibProperty("GM Output", "Lib:Character")]


[h:output=if(isGM()==1,outputGM,outputPC)]

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
[r,count(repeat,"<br>"),code:{

	[h:object=json.get(SkillObject,roll.count)]
	[h:skillName=json.get(object,"name")]
	[h:prof=json.get(object,"prof")]
	[h:other=json.get(object,"other")]
	[h:half=json.get(object,"half")]
	[h:half=if(half=="",0,half)]
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
	[h:profDisplay=if(prof==0,if(half==0,"<span title='not proficient'>O</span>","<span title='half proficient'>J</span>"),if(prof==1,"<span title='proficient'><b>X</span>","<span title='expert'><b>E</span>"))]
[h:"<span title=''></span>"]

	<tr>
	<td width=0% align=center style="margin:0px; padding:0px; font-size:8px">


	[r:macroLink(profDisplay,"Change Skill@Lib:Character","","skill="+roll.count+";default="+encode(skillList)+";attributeList="+attributeList+";id="+id+";tokenName="+tokenName)]
	

	<td width=18 align=center style="margin:0px; padding:0px; font-size:8px; border-bottom: 1px solid gray;">
	
	<span title='Roll [r:skillName]'>
	[r:macroLink(if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay),"d20 Roller@Lib:Character","","text="+atr+" ("+skillName+");value=+"+if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay)+";id="+id+";tokenName="+tokenName+";color=0099cc")]


	<td style="margin:0px; padding:0px; font-size:8px">

	
	[r:skillName]

	[h:atr=if(skillAttribute==getStrProp(skillList,skillName),atr,"<font color=red>"+atr+"</font>")]
	
	([r:macroLink("<span title='Edit "+skillName+"'>"+atr+"</span>","Change Skill@Lib:Character","","skill="+roll.count+";default="+encode(skillList)+";attributeList="+attributeList+";id="+id+";tokenName="+tokenName)])
	

	[r:if(other==0,"",if(other>0,"+","-"))]


	[h:modList=listappend(modList,bonusDisplay)]


}]

<tr>

<td colspan=3 align=center style="margin:0px; padding:0px; margin-top:5; font-size:6px">

<b>[r:macroLink("SKILLS","Global Mod@Lib:Character","","tokenName="+tokenName+";value=Skill")]

</table>