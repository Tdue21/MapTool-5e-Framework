<table style="border-style: solid; border-width:2px 1px 2px 1px; margin-top:5;">


[h:attributeList=getLibProperty("Attributes", "Lib:Character")]
[h:skillList=getLibProperty("Skills", "Lib:Character")]

[h:output= function.getOutput())]
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


<!-----------------Set Saves if empty------------------->

[h:SaveObject=getLibProperty("SavingTrows","Lib:"+tokenName)]
[h:array=json.fromList(attributeList)]
[h:object=""]
[h,if(json.type(SaveObject)=="UNKNOWN"),count(listcount(attributeList),"<br><br>"),code:{

	[h:currentAtr=listget(attributeList,roll.count)]
	[h:object=json.set(object,"name",currentAtr)]
	[h:object=json.set(object,"prof",0)]
	[h:object=json.set(object,"other",0)]
	[h:array=json.set(array,roll.count,object)]

};{}]

[h,if(json.type(SaveObject)=="UNKNOWN"),code:{

	[h:setLibProperty("SavingTrows",array,"Lib:"+tokenName)]
	[h:SaveObject=array]

};{}]


<!-----------------Saves------------------->
[h:repeat=listcount(json.fields(SaveObject))]
[r,count(repeat,"<br>"),code:{
	
	
	[h:object=json.get(SaveObject,roll.count)]
	[h:name=json.get(object,"name")]
	[h:prof=json.get(object,"prof")]
	[h:other=json.get(object,"other")]
	[h:profDisplay=if(prof==0,"<span title='not proficient'>O</span>",if(prof==1,"<span title='proficient'><b>X</span>","<span title='expert'><b>E</span>"))]

	[h:atrValue=getStrProp(getLibProperty(name,"Lib:"+tokenName),"value")]
	[h:atrValue=if(atrValue=="",0,atrValue)]
	[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);""]
	[h:mod=if(isNumber(atrValue)==0,0,atrValue)]
	[h:mod=floor(mod/2-5)]
	[h:bonusDisplay=mod+(profBonus*prof)+other]


	<tr>
	<td width=0% align=center style="margin:0px; padding:0px; font-size:8px">


	[r:macroLink(profDisplay,"character/Change Save@this","","index="+roll.count+";id="+id+";tokenName="+tokenName)]

	
	<td width=20 align=center style="margin:0px; padding:0px; font-size:8px; border-bottom: 1px solid gray;">
	
	<span title='[r:name] Saving Throw'>
	[r:macroLink(if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay),"character/d20 Roller@this","","text="+name+" save;value=+"+if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay)+";id="+id+";tokenName="+tokenName+";color=ff9900")]
	
	<td style="margin:0px; padding:0px; font-size:8px">
	
	
	[r:name]

	[r:if(other==0,"",if(other>0,"+","-"))]


}]


<tr>
<td align=center colspan=3 style="margin:0px; padding:0px; margin-top:5; font-size:6px">

<b>[r:macrolink("SAVES", "character/Global Mod@this")"","tokenName="+tokenName+";value=Save")]

</table>