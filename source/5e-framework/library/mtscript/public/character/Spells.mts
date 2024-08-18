[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:profBonus=getStrProp(macro.args,"profBonus")]
[h:level=getStrProp(macro.args,"level")]
[h:list=getStrProp(macro.args,"list")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:outputPC=getLibProperty("PC Output","Lib:Character")]
[h:outputGM=getLibProperty("GM Output","Lib:Character")]


[h:output=if(isGM()==1,outputGM,outputPC)]

<!-----------------Spells------------------->



[h:object="Spells"]
[h:Slots=getLibProperty("Slots","Lib:"+tokenName)]
[h:value=getStrProp(Slots,"value"+level)]
[h:total=getStrProp(Slots,"total"+level)]

<table>
<tr>
<td width=25 bgcolor=#DCDCDC align=center style="border-style: solid; border-width:2px; margin:0px; padding:0px">

<table>

<tr>
<td align=center bgcolor=white style="font-size:13px; margin:0px; padding:0px;padding-left:3px">
<b>
[r:macrolink("<span title='Add Spell'>"+level+"</span>","Add@Lib:Character","","prop="+object+";tokenName="+tokenName)]
</table>

<td width=60 align=center style="border-style: solid double solid none; border-width:2px 3px 2px 3px;font-size:13px;margin:0px; padding:0px">

<span title='Edit Spell Slots'>
[r:macroLink(if(total=="" || total==0,"+",total),"Change Slots@Lib:Character","","level="+level+";tokenName="+tokenName)]
</span>

<td align=center style="border-style: double double double none; border-width:3px;font-size:13px; margin:0px; padding:0px">

[r:macroLink(if(value=="" || value==0,"",value),"Change Slots@Lib:Character","","level="+level+";tokenName="+tokenName)]

</table>



[h:obj=getLibProperty(object,"Lib:"+tokenName)]


<table>


[h:list=listSort(list,"N")]

[h:repeat=listcount(list)]



[h:blank=if(level>=6,2,if(level>=5,3,4))]
[r,if(repeat==0),count(blank,""),code:{
	<tr style="border-style: none none solid none; border-width:1px; border-color:gray;font-size:8px;margin:0px; padding:0px">
	<td width=15>
	[r:if(level==1 && roll.count==0,macroLink("<font size=1>PREP</font>","Prepared Spells@Lib:Character","","tokenName="+tokenName)+"<br>","")]
	O
	<td align=center valign=bottom>
	[r:if(level==1 && roll.count==0,"<font color=gray size=1>SPELL NAME</font><br>","")]

};{}]



[r,count(repeat,""),code:{

	[h:objName=listGet(list,roll.count)]
	[h:objData=json.get(obj,objName)]
	[h:spellLevel=json.get(objData,"level")]
	[h:prep=json.get(objData,"prep")]
	[h:source=json.get(objData,"source")]
	[h:customAtr=json.get(objData,"customAtr")]
	[h:atrValue=getStrProp(getLibProperty(customAtr,"Lib:"+tokenName),"value")]
	[h,if(atrValue==""):"";atrValue=eval(string(atrValue))]
	[h,if(isNumber(atrValue)==1):atrMod=floor(atrValue/2-5);atrMod=-5]

	[h:match=if(spellLevel==level,1,0)]


	[r,if(match==1),code:{
	<table width=100%>
	<tr style="border-style: none none solid none; border-width:1px; border-color:gray;font-size:8px;margin:0px; padding:0px">
	<td width=15 align=left>
	
[r:if(level==1 && roll.count==0,macroLink("<font size=1>PREP</font>","Prepared Spells@Lib:Character","","tokenName="+tokenName)+"<br>","")]

	[h:prepIcon=if(prep==0,"<span title='Not Prepared'>O</span>","<span title='Prepared'>X</span>")]
	[r:macrolink(prepIcon,"Quick Prepare@Lib:Character","","level="+level+";object="+objData+";name="+objName+";tokenName="+tokenName)]
	

	<td valign=bottom align=left>

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(objName)]
	
	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"Args Dialog@Lib:Character","","prop="+object+";source="+source+";name="+objName+";description=;tokenName="+tokenName)]
	
	<td align=right valign=bottom>

	};{}]
	[r,if(customAtr==0 || customAtr=="" || match==0),code:{};{
		[h:spellMod=atrMod+profBonus]
		DC [r:macroLink("<span title='Display DC - "+customAtr+"'>"+number(8+spellMod)+"</span>","Dice Roller@Lib:Character","","text="+objName+" DC;value="+number(8+spellMod)+";tokenName="+tokenName)] -
		
		Atk [r:macroLink("<span title='Roll Spell Attack - "+customAtr+"'>"+if(spellMod<0,spellMod,"+"+spellMod)+"</span>","d20 Roller@Lib:Character","","text="+objName+";value=+"+if(spellMod<0,spellMod,"+"+spellMod)+";id="+id+";tokenName="+tokenName+";color=8a61ae")] -
	}]
	[r,if(match==1),code:{
		[r:if(source=="Class","",source)]
		
		
	};{}]
</table>
}]

[h:blank=if(blank-repeat<0,0,blank-repeat)]
[r,if(repeat>0),count(blank,""),code:{
	<table>
	<tr style="border-style: none none solid none; border-width:1px; border-color:gray;font-size:8px;margin:0px; padding:0px">
	<td width=15>
	O
	<td align=center valign=bottom>
	</table>
};{}]

</table>

