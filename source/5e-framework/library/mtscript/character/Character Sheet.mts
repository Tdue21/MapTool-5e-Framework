[h:attributeList=getLibProperty("Attributes", function.getNamespace())]
[h:skillList=getLibProperty("Skills", function.getNamespace())]

[h:output= function.getOutput())]
[h:start=getLibProperty("Start", function.getNamespace())]

[h:tokenName=getStrProp(macro.args,"tokenName")]







<table width=100%>
<tr>
<td width=240 style="margin:0px; padding:0px">

<table width=100%>
<tr bgcolor=#DCDCDC>
<td style="margin:0px; padding:0px; font-size:8px" align=left>
[r:macrolink("Load", "character/Selector@this")"","macro=Character Sheet;tokenName="+tokenName)]
<td style="margin:0px; padding:0px; font-size:8px" align=right><b>DUNGEONS & DRAGONS
<tr>
<td colspan=2 style="border-style: double none double solid; border-width:3px;font-size:15px;margin:0px; padding:0px" align=center>


<!-----------------NAME------------------->

[r,token(tokenName):tokenName=getLibProperty("LibName","Lib:"+tokenName)]


[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]

[h:setLibProperty("Attributes",attributeList,"Lib:"+tokenName)]

[h:AtrProps=""]
[h,count(listcount(attributeList),""),code:{
	[h:attribute=listget(attributeList,roll.count)]
	[h:value=getLibProperty(attribute,"Lib:"+tokenName)]
	[h:value=getStrProp(value,"value")]
	[h:value=if(value=="",0,value)]
	[h,if(isNumber(value)==0):value=eval(value);value]
	[h:mod=floor(number(eval(string(value)))/2-5)]
	[h:AtrProps=setStrProp(AtrProps,substring(lower(attribute),0,3),mod)]
}]
[h:varsFromStrProp(AtrProps)]



<tr style="font-size:6px">
<td style="margin:0px; padding:0px"><span title="Edit Name">[r:macrolink("CHARACTER NAME", "character/Rename@this")"","tokenName="+tokenName)]</span>
<td bgcolor=#DCDCDC>

</table>

<td style="margin:0px; padding:0px">

<table width=100% style="border-style: double; border-width:3px; margin:0px; padding:0px">
<tr>
<td style="margin:0px; padding:0;" height=15>

<!-----------------CLASS------------------->


[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]
[h:totalLevel=0]

[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]

[r,count(repeat,"/"),code:{

	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:level=json.get(object,"level")]
	[h:subclass=json.get(object,"subclass")]

	[h:totalLevel=totalLevel+level]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]
	
	<i>
	[h:link=macroLink(CapitalName+" "+level,"character/Change Class@this","","class="+name+";tokenName="+tokenName)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(subclass)]

	[r:if(subclass=="" || subclass==0,link,"<span title='"+CapitalName+"'>"+link+"</span>")]

	
	</i>
}]

[h:setLibProperty("TotalLevel",totalLevel,"Lib:"+tokenName)]

[h:profBonus=ceil(totalLevel/4)+1]






<td style="margin:0px; padding:0px">



<!-----------------BACKGROUND------------------->



[h:background=getLibProperty("Background","Lib:"+tokenName)]

[h:value=getStrProp(string(background),"value")]
[h:text=getStrProp(string(background),"text")]

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]









<td style="margin:0px; padding:0px">

<!-----------------PLAYER------------------->
[r:getOwners(",","Lib:"+tokenName,start)]

<tr style="font-size:6px; border-top: 1px solid gray;">
<td style="margin:0px; padding:0px">
[r:macrolink("<span title='Add Class'>CLASS & LEVEL</span>", "character/Change Class@this")"","class=New Class;tokenName="+tokenName)]
<td style="margin:0px; padding:0px">
[r:macrolink("<span title='Edit Background'>BACKGROUND</span>", "character/Change Property@this")"","name=Background;value="+encode(background)+";id="+id+";tokenName="+tokenName)]
<td style="margin:0px; padding:0px">PLAYER NAME
<tr>
<td style="margin:0px; padding:0px">

<!-----------------RACE------------------->
[h:race=getLibProperty("Race","Lib:"+tokenName)]

[h:value=getStrProp(string(race),"value")]
[h:text=getStrProp(string(race),"text")]

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]


<td style="margin:0px; padding:0px">

<!-----------------ALIGNMENT------------------->
[h:alignment=getLibProperty("Alignment","Lib:"+tokenName)]

[h:value=getStrProp(string(alignment),"value")]
[h:text=getStrProp(string(alignment),"text")]

[h:value=if(value==0,"",value)]

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]



<td style="margin:0px; padding:0px">


<!-----------------EXPERIENCE------------------->
[h:xp=getLibProperty("XP","Lib:"+tokenName)]

[h:value=getStrProp(string(xp),"value")]
[h:text=getStrProp(string(xp),"text")]



[r:if(text=="" || text==0,if(value=="",0,value),"<span title='"+text+"'>"+if(value=="",0,value)+"</span>")]

<tr style="font-size:6px; border-top: 1px solid gray;">
<td style="margin:0px; padding:0px">
[r:macrolink("<span title='Edit Race'>RACE</span>", "character/Change Property@this")"","name=Race;value="+encode(race)+";id="+id+";tokenName="+tokenName)]

<td style="margin:0px; padding:0px">
[r:macrolink("<span title='Edit Alignment'>ALIGNMENT</span>", "character/Change Property@this")"","name=Alignment;value="+encode(alignment)+";id="+id+";tokenName="+tokenName)]
<td style="margin:0px; padding:0px">

[r:macrolink("<span title='Edit Experience Points'>EXPERIENCE POINTS</span>", "character/Change Property@this")"","name=XP;value="+encode(xp)+";id="+id+";tokenName="+tokenName)]

</table>

</table>

<table width=100%>
<tr>
<td valign=top width=245 style="margin:0px; padding:0px">


<table width=100%>
<tr>
<td width=0 bgcolor=#DCDCDC align=center valign=middle style="border-style: double solid double solid; border-width:3px; border-color:white">




<!-----------------ATTRIBUTES------------------->
[macro("character/Attributes@this"):"profBonus="+profBonus+";tokenName="+tokenName]




<td width=100% style="margin:0px; padding:0px">

<table width=100%>
<tr>
<td width=28 align=center style="border-style: solid; border-width:2px;font-size:10px">

[h:inspiration=getLibProperty("Inspiration","Lib:"+tokenName)]

[r:macroLink(if(inspiration=="" || inspiration==0,"O","<b>X"),"character/Toogle Inspiration@this","",tokenName)]

<td align=center valign=middle style="border-style: double; border-width:3px; margin:0px; padding:0px;font-size:6px">
INSPIRATION
</table>

<table width=100% style=" margin-top:5">
<tr>
<td width=28 align=center style="border-style: solid; border-width:2px;font-size:10px">


[r:profBonus]


<td align=center valign=middle style="border-style: solid; border-width:2px; margin:0px; padding:0px;font-size:6px">
PROFICIENCY BONUS
</table>


<!-----------------SAVES------------------->
[macro("character/Saves@this"):"tokenName="+tokenName]



<!-----------------SKILLS------------------->
[macro("character/Skills@this"):"tokenName="+tokenName]

<tr>
<td colspan=2 style="margin:0px; padding:0px">


[macro("character/Passive Skills@this"):"tokenName="+tokenName]


<tr>
<td colspan=2 style="margin:0px; padding:0px">









<table style="border-style: solid double solid double; border-width:1px 3px 1px 3px;">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">



<!-----------------OTHER PROFICIENCIES------------------->
[h:ArmorProf=getLibProperty("Armor Proficiency","Lib:"+tokenName)]
[h:value=getStrProp(string(ArmorProf),"value")]
[h:text=getStrProp(string(ArmorProf),"text")]
[r:macrolink("<span title='Edit Armor Proficiency'>Armor</span>", "character/Change Property@this")"","name=Armor Proficiency;value="+encode(ArmorProf)+";id="+id+";tokenName="+tokenName)]: 
<!-----------------ARMOR PROFICIENCIES------------------->
[h:value=replace(value,"\\.","")]
[h:value=replace(value,"(?<![\\w\\d])and",",")]
[r,count(listcount(value)),code:{
	[h:entry=listget(value,roll.count)]
	[r:macrolink("<span title='Roll "+entry+"'>"+entry+"<span>", "character/Other Proficiencies@this")"","entry="+entry+";tokenName="+tokenName+";profBonus="+profBonus)]
}]

<br>
[h:WeaponProf=getLibProperty("Weapon Proficiency","Lib:"+tokenName)]
[h:value=getStrProp(string(WeaponProf),"value")]
[h:text=getStrProp(string(WeaponProf),"text")]
[r:macrolink("<span title='Edit Weapon Proficiency'>Weapon</span>", "character/Change Property@this")"","name=Weapon Proficiency;value="+encode(WeaponProf)+";id="+id+";tokenName="+tokenName)]:

<!-----------------WEAPON PROFICIENCIES------------------->
[h:value=replace(value,"\\.","")]
[h:value=replace(value,"(?<![\\w\\d])and",",")]
[r,count(listcount(value)),code:{
	[h:entry=listget(value,roll.count)]
	[r:macrolink("<span title='Roll "+entry+"'>"+entry+"<span>", "character/Other Proficiencies@this")"","entry="+entry+";tokenName="+tokenName+";profBonus="+profBonus)]
}]

<br>
[h:ToolProf=getLibProperty("Tool Proficiency","Lib:"+tokenName)]
[h:value=getStrProp(string(ToolProf),"value")]
[h:text=getStrProp(string(ToolProf),"text")]
[r:macrolink("<span title='Edit Tool Proficiencies'>Tools</span>", "character/Change Property@this")"","name=Tool Proficiency;value="+encode(ToolProf)+";id="+id+";tokenName="+tokenName)]:

<!-----------------TOOL PROFICIENCIES------------------->
[h:value=replace(value,"\\.","")]
[h:value=replace(value,"(?<![\\w\\d])and",",")]
[r,count(listcount(value)),code:{
	[h:entry=listget(value,roll.count)]
	[r:macrolink("<span title='Roll "+entry+"'>"+entry+"<span>", "character/Other Proficiencies@this")"","entry="+entry+";tokenName="+tokenName+";profBonus="+profBonus)]
}]

<br>
[h:LanguageProf=getLibProperty("Language Proficiency","Lib:"+tokenName)]
[h:value=getStrProp(string(LanguageProf),"value")]
[h:setLibProperty("Languages",value,"Lib:"+tokenName)]
[h:text=getStrProp(string(LanguageProf),"text")]
[r:macrolink("<span title='Edit Language Proficiencies'>Languages</span>", "character/Change Property@this")"","name=Language Proficiency;value="+encode(LanguageProf)+";id="+id+";tokenName="+tokenName)]:

<!-----------------LANGUAGE PROFICIENCIES------------------->
[h:value=replace(value,"\\.","")]
[h:value=replace(value,"(?<![\\w\\d])and",",")]
[r,count(listcount(value)),code:{
	[h:entry=listget(value,roll.count)]
	[r:macrolink("<span title='Roll "+entry+"'>"+entry+"<span>", "character/Other Proficiencies@this")"","entry="+entry+";tokenName="+tokenName+";profBonus="+profBonus)]
}]

<br>
[h:OtherProf=getLibProperty("Other Proficiency","Lib:"+tokenName)]
[h:value=getStrProp(string(OtherProf),"value")]
[h:text=getStrProp(string(OtherProf),"text")]
[r:macrolink("<span title='Edit Other Proficiencies'>Other</span>", "character/Change Property@this")"","name=Other Proficiency;value="+encode(OtherProf)+";id="+id+";tokenName="+tokenName)]: 
<!-----------------OTHER PROFICIENCIES------------------->
[h:value=replace(value,"\\.","")]
[h:value=replace(value,"(?<![\\w\\d])and",",")]
[r,count(listcount(value)),code:{
	[h:entry=listget(value,roll.count)]
	[r:macrolink("<span title='Roll "+entry+"'>"+entry+"<span>", "character/Other Proficiencies@this")"","entry="+entry+";tokenName="+tokenName+";profBonus="+profBonus)]
}]


<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>OTHER PROFICIENCIES & LANGUAGES

</table>



</table>


<td valign=top width=245 style="font-size:15px; margin:0px; padding:0px">


<table width=100%>
<tr>
<td bgcolor=#DCDCDC style="margin:0px; padding:0px; border-style: double solid double solid; border-width:3px; border-color:white">

<table>
<tr>
<td width=33%>


<table bgcolor=white style="border-style: double; border-width:3px">
<tr>
<td align=center style="font-size:14px; margin:0px; padding:0px">
<!-----------------AC------------------->
[h:AC=if(getLibProperty("AC","Lib:"+tokenName)=="",0,getLibProperty("AC","Lib:"+tokenName))]

[h:value=getStrProp(string(AC),"value")]
[h:text=getStrProp(string(AC),"text")]

[h:text=if(text==0,"",text)]

[h:value=if(value=="",0,value)]

[h:totalValue=eval(string(value))]

[r:if(text=="" && isNumber(value)==1,totalValue,"<span title='"+if(isNumber(value)==1,"",value+if(text=="",""," | "))+if(text=="","",text)+"'>"+totalValue+"</span>")]




<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>
[r:macrolink("<span title='Edit Armor Class'>ARMOR<br>CLASS</span>", "character/Change Property@this")"","value="+encode(AC)+";name=AC;id="+id+";tokenName="+tokenName)]
</table>
[h,if(id==""):"";setProperty("Armor Class",totalValue+if(text=="" || text==0,""," ("+text+")"))]


<td width=33%>


<table bgcolor=white style="border-style: double; border-width:3px">
<tr>
<td align=center style="font-size:14px; margin:0px; padding:0px">

<!-----------------INITIATIVE------------------->
[h:value=getLibProperty("Initiative","Lib:"+tokenName)]

[h:init=dex+getStrProp(string(value),"value")]
[h:text=getStrProp(string(value),"text")]

[h:dexValue=getLibProperty("Dexterity","Lib:"+tokenName)]
[h:prof=getStrProp(string(dexValue),"prof")]

[h,switch(prof):
case "0":bonus=0;
case "1":bonus=floor(profBonus/2);
case "2":bonus=ceil(profBonus/2);
case "3":bonus=profBonus;
case "4":bonus=profBonus*2;
default:bonus=0]

[h:init=init+bonus]

[h:link=macroLink(if(init>0,"+"+init,init),"character/d20 Roller@this","","text=Initiative"+if(text=="" || text==0,""," | "+text)+";value=+"+if(init<0,init,"+"+init)+";tokenName="+tokenName+";color=blue")]

[h:numberValue=getStrProp(string(value),"value")]
[h:numberValue=if(numberValue==0,"",numberValue)]
[h:text=if(text==0,"",text)]

[r:"<span title='Roll Initiative'>"+link+"</span>")]

<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">

<br>
<b>[r:macroLink(if(text=="" && isNumber(numberValue)==0,"<span title='Edit Initiative Bonus'>INITIATIVE</span>","<span title='"+if(isNumber(numberValue)==0,"",numberValue)+if(text=="","",if(isNumber(numberValue)==0,""," | ")+text)+"'>INITIATIVE</span>"),"character/Change Initiative@this","","value="+encode(value)+";name=Initiative;id="+id+";tokenName="+tokenName)]

</table>





<td width=34%>


<table bgcolor=white style="border-style: double; border-width:3px">
<tr>
<td align=center style="margin:0px; padding:0px">

<!-----------------SPEED------------------->
[h:Spd=if(getLibProperty("Speed","Lib:"+tokenName)=="","+",getLibProperty("Speed","Lib:"+tokenName))]

[h:value=getStrProp(string(Spd),"value")]
[h:text=getStrProp(string(Spd),"text")]

[h:value=if(value=="","+",value)]

<font size=[r:if(length(value)>10,2,5)]>

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]
<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">

<br>
<b>[r:macrolink("<span title='Edit Movement Speed'>SPEED</span>", "character/Change Property@this")"","value="+encode(Spd)+";name=Speed;id="+id+";tokenName="+tokenName)]

</table>


<tr>
<td colspan=3>










<table bgcolor=white style="border-style: solid double solid double; border-width:2px 3px 2px 3px;">
<tr>
<td width=100 style="font-size:8px; margin:0px; padding:0px">

<font color=gray>Hit Point Maximum

<td style="font-size:8px; margin:0px; padding:0px; border-bottom: 1px solid gray;">


<!-----------------HP------------------->
[h:CurrentHP=getLibProperty("Current Hit Points","Lib:"+tokenName)]
[h:TotalHP=getLibProperty("Total Hit Points","Lib:"+tokenName)]
[h:TempHP=getLibProperty("Temporary Hit Points","Lib:"+tokenName)]



[h:CurrentHP=if(CurrentHP=="",TotalHP,CurrentHP)]

[r,if(TotalHP==""),code:{

	 [r:macrolink("+", "character/Damage@this")output,"current="+CurrentHP+";total="+TotalHP+";temp="+TempHP+";id="+id+";tokenName="+tokenName)]

};{

	[h,if(id==""):"";setProperty("HP",CurrentHP+"/"+TotalHP+if(TempHP<0," ("+TempHP+")",""))]
	[h:setLibProperty("HP", CurrentHP+"/"+TotalHP+if(TempHP<0, function.getNamespace())",""),"Lib:"+tokenName)]



	 
	 [r:macroLink(TotalHP,"character/Damage@this",output,"current="+CurrentHP+";total="+TotalHP+";temp="+TempHP+";id="+id+";tokenName="+tokenName)]
	



}]


<tr>
<td colspan=2 align=center style="font-size:10px;font-size:15px; margin:0px; padding:0px">

	<table width=100% style="margin:0px; padding:0px">
		<tr>
			<td style="font-size:10px;font-size:15px; margin:0px; padding:0px">

			[r:macrolink("-", "character/Quick HP@this")output,"heal=-1;current="+CurrentHP+";total="+TotalHP+";temp="+TempHP+";id="+id+";tokenName="+tokenName)]

			<td align=center style="font-size:10px;font-size:15px; margin:0px; padding:0px">
		
			[r:macroLink(CurrentHP,"character/Damage@this",output,"current="+CurrentHP+";total="+TotalHP+";temp="+TempHP+";id="+id+";tokenName="+tokenName)]
		
			<td align=right style="font-size:10px;font-size:15px; margin:0px; padding:0px">
			[r:macrolink("+", "character/Quick HP@this")output,"heal=1;current="+CurrentHP+";total="+TotalHP+";temp="+TempHP+";id="+id+";tokenName="+tokenName)]

	</table>

<tr>
<td colspan=2 align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("CURRENT HIT POINTS", "character/Damage@this")output,"current="+CurrentHP+";total="+TotalHP+";temp="+TempHP+";id="+id+";tokenName="+tokenName)]

</table>



<table bgcolor=white style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top:5px;">
<tr>
<td align=center style="font-size:15px; margin:0px; padding:0px">


<!-----------------TEMP HP------------------->
[r:if(TempHP=="" || TempHP==0,"<br>",macroLink(TempHP,"character/Damage@this",output,"current="+CurrentHP+";total="+TotalHP+";temp="+TempHP+";id="+id+";tokenName="+tokenName))]




<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("TEMPORARY HIT POINTS", "character/Damage@this")output,"current="+CurrentHP+";total="+TotalHP+";temp="+TempHP+";id="+id+";tokenName="+tokenName)]

</table>



</table>




<table>
<tr>
<td width=50%>

<table bgcolor=white style="border-style: solid double solid double; border-width:2px 3px 2px 3px;">
<tr>
<td width=0 align=left style="font-size:8px; margin:0px; padding:0px">
<font color=gray>Total
<td style="font-size:8px; margin:0px; padding:0px; border-bottom: 1px solid gray;">
<!-----------------HIT DICE------------------->
[h:totalHitDice=""]
[h,if(json.type(classes)=="UNKNOWN"),code:{
	[h:classList=setLibProperty("Class&Level","{}","Lib:"+tokenName)]
	[h:repeat=0]
};{
	[h:classList=json.fields(classes)]	
	[h:repeat=listcount(classList)]
}]
[h,count(repeat),code:{


	[h:name=listget(classList,roll.count)]
	[h:object=json.get(classes,name)]
	[h:level=json.get(object,"level")]
	[h:hitDice=json.get(object,"hitDice")]

	[h:currenthitDice=getStrProp(totalHitDice,hitDice)]
	[h:totalHitDice=setStrProp(totalHitDice,hitDice,currenthitDice+level)]


}]
[r,count(countStrProp(totalHitDice)," / "),code:{

	[h:dices=indexValueStrProp(totalHitDice,roll.count)]
	[h:sides=indexKeyStrProp(totalHitDice,roll.count)]
	[h:currentHitDice=dices+sides]
	
	[r:macrolink("<span title='Roll Hit Dice'>"+currentHitDice+"</span>", "character/Hit Dice Roll@this")"","dices="+dices+";sides="+replace(sides,"d","")+";tokenName="+tokenName+";output="+output+";conMod="+con)]
}]
<tr>
<td colspan=2 align=center style="font-size:11px; margin:0px; padding:0px">

[h:HitDice=getLibProperty("Hit Dice","Lib:"+tokenName)]

[h:textHitDice=""]
[r,count(countStrProp(HitDice),""),code:{

	[h:key=indexKeyStrProp(HitDice,roll.count)]
	[h:value=getStrProp(HitDice,key)]
	[h:textHitDice=if(value=="" || value==0,textHitDice,listAppend(textHitDice,value+key," /"))]

}]


[r:textHitDice]


<tr>
<td colspan=2 align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>
[r:macrolink("<span title='Edit Hit Dice'>HIT DICE</span>", "character/Change Hit Die@this")"","totalHitDice="+encode(totalHitDice)+";tokenName="+tokenName)]


</table>


<td>

<table bgcolor=white style="border-style: solid double solid double; border-width:2px 3px 2px 3px;">
<tr>


<!-----------------DEATH SAVES------------------->
[h:death=getLibProperty("Death Saves","Lib:"+tokenName)]
[h:successes=getStrProp(death,"successes")]
[h:failures=getStrProp(death,"failures")]
[h:successes=if(isNumber(successes)==1,successes,0)]
[h:failures=if(isNumber(failures)==1,failures,0)]


<td align=right valign=middle style="font-size:6px; margin:0px; padding:0px">
SUCCESSES

<td width=55 align=center style="font-size:9px; margin:0px; padding:0px; margin-bottom:1px">
[r:macroLink(if(successes>0,"X","O"),"character/Death Saves@this","","successes="+if(successes>0,successes-1,successes+1)+";tokenName="+tokenName)]
[r:macroLink(if(successes>1,"X","O"),"character/Death Saves@this","","successes="+if(successes>1,successes-1,successes+1)+";tokenName="+tokenName)]
[r:macroLink(if(successes>2,"X","O"),"character/Death Saves@this","","successes="+if(successes>2,successes-1,successes+1)+";tokenName="+tokenName)]

<tr>
<td align=right valign=middle style="font-size:6px; margin:0px; padding:0px">
FAILURES

<td align=center style="font-size:9px; margin:0px; padding:0px margin-bottom:1px">
[r:macroLink(if(failures>0,"X","O"),"character/Death Saves@this","","failures="+if(failures>0,failures-1,failures+1)+";tokenName="+tokenName)]
[r:macroLink(if(failures>1,"X","O"),"character/Death Saves@this","","failures="+if(failures>1,failures-1,failures+1)+";tokenName="+tokenName)]
[r:macroLink(if(failures>2,"X","O"),"character/Death Saves@this","","failures="+if(failures>2,failures-1,failures+1)+";tokenName="+tokenName)]

<tr>
<td colspan=2 align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>

[r:macrolink("<span title='Roll Death Saving Throw'>DEATH SAVES</span>", "character/d20 Roller@this")"","text=Death Save;value=;tokenName="+tokenName+";color=death")]


</table>


</table>







<tr>
<td style="font-size:15px; margin:0px; padding:0px">


<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px;">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">


<!-----------------ATTACKS------------------->

[macro("character/Attacks@this"):"profBonus="+profBonus+";tokenName="+tokenName]
<br>


<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Add Custom Attacks'>ATTACKS & SPELLCASTING</span>", "character/Custom Attack@this")"","profBonus="+profBonus+";tokenName="+tokenName)]

</table>




<tr>
<td style="font-size:15px; margin:0px; padding:0px">

<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px;">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">
<!-----------------CURRENCY------------------->

[h:currency=getLibProperty("Currency","Lib:"+tokenName)]


<table>
<tr>
<td width=20% align=center style="border-style:solid double solid double; border-width:2px 3px 2px 3px; margin:0px; padding:0px">
[h:PP=getStrProp(currency,"PP")]
[r:if(PP==0,"",PP)]
<td width=20% align=center style="border-style:solid double solid double; border-width:2px 3px 2px 3px; margin:0px; padding:0px">
[h:GP=getStrProp(currency,"GP")]
[r:if(GP==0,"",GP)]
<td width=20% align=center style="border-style:solid double solid double; border-width:2px 3px 2px 3px; margin:0px; padding:0px">
[h:EP=getStrProp(currency,"EP")]
[r:if(EP==0,"",EP)]
<td width=20% align=center style="border-style:solid double solid double; border-width:2px 3px 2px 3px; margin:0px; padding:0px">
[h:SP=getStrProp(currency,"SP")]
[r:if(SP==0,"",SP)]
<td width=20% align=center style="border-style:solid double solid double; border-width:2px 3px 2px 3px; margin:0px; padding:0px">
[h:CP=getStrProp(currency,"CP")]
[r:if(CP==0,"",CP)]

<td rowspan=2 valign=middle style="margin:0px; padding:0px">
[r:macrolink("<span title='Send to other Token'>Trade</span>", "character/Trade Currency@this")output,"tokenName="+tokenName)]

<tr>
<td align=center style="font-size:8px; border-style: solid; border-width:1px; margin:0px; padding:0px">
[r:macrolink("PP", "character/Change Currency@this")output,"tokenName="+tokenName)]
<td align=center style="font-size:8px; border-style: solid; border-width:1px; margin:0px; padding:0px">
[r:macrolink("GP", "character/Change Currency@this")output,"tokenName="+tokenName)]
<td align=center style="font-size:8px; border-style: solid; border-width:1px; margin:0px; padding:0px">
[r:macrolink("EP", "character/Change Currency@this")output,"tokenName="+tokenName)]
<td align=center style="font-size:8px; border-style: solid; border-width:1px; margin:0px; padding:0px">
[r:macrolink("SP", "character/Change Currency@this")output,"tokenName="+tokenName)]
<td align=center style="font-size:8px; border-style: solid; border-width:1px; margin:0px; padding:0px">
[r:macrolink("CP", "character/Change Currency@this")output,"tokenName="+tokenName)]

</table>



<!-----------------EQUIPMENT------------------->


<table style="margin:0px; padding:0px">
<tr>
<td width=18 style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>EQ
<td style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>NAME
<td width=25 style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>#
<td width=25 style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>lb.

[h:totalWeight=0]

[h:object="Equipment"]

[h:obj=getLibProperty(object,"Lib:"+tokenName)]
[h,if(json.type(obj)=="UNKNOWN"):list="";list=json.fields(obj)]

[h:list=listSort(list,"N")]

[h:repeat=listcount(list)]

[r,count(repeat,""),code:{

	[h:objName=listGet(list,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:Quantity=json.get(currentObj,"Quantity")]
	[h:Equiped=json.get(currentObj,"Equiped")]
	[h:customName=json.get(currentObj,"customName")]
	[h:identified=json.get(currentObj,"identified")]
	[h:weight=json.get(currentObj,"weight")]


<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(objName)]

	[h:name=if(customName=="" || customName==0,CapitalName,customName)]


	
	[h:equipIcon=if(Equiped==1,"X","O")]
	
	<tr>
	<td style="font-size:8px; margin:0px; padding:0px">
	
	[r:macrolink(equipIcon,"character/Quick Equip@this","","object="+currentObj+";name="+objName+";tokenName="+tokenName)]
	
	<td style="font-size:8px; margin:0px; padding:0px">
	
	[r:macrolink(if(name=="","Untitled",name),"character/Args Dialog@this","","prop="+object+";index="+roll.count+";name="+objName+";customName="+customName+";identified="+identified+";description=;tokenName="+tokenName)]
	
	
	[h,if(isNumber(weight)==1 && isNumber(Quantity)==1),code:{
		[h:weight=weight*Quantity]
	};{
		[h,if(weight==""):weight=0]
		[h,if(Quantity==""):Quantity=0]
	}]
	
	<td style="font-size:8px; margin:0px; padding:0px">
	
	
	[r:"x "+macroLink(Quantity,"character/Quick Quantity@this","","tokenName="+tokenName+";item="+objName+";name="+name)]
	
	<td align=right style="font-size:8px; margin:0px; padding:0px">
	
	[r:weight+" lb."]
	
	

[h:totalWeight=totalWeight+(weight*Equiped)]

}]




</table>

<tr>
<td align=left style="font-size:10px;font-size:8px; margin:0px; padding:0px">

[h:StrengthValue=getLibProperty("Strength","Lib:"+tokenName)]
[h:StrengthValue=getStrProp(StrengthValue,"value")]
[h:StrengthValue=if(StrengthValue=="",0,StrengthValue)]
[h:StrengthValue=eval(string(StrengthValue))]

[h,switch(getLibProperty("sizeMod","Lib:"+tokenName)):
case "Tiny":sizemod=0.5;
case "Small":sizemod=1;
case "Medium":sizemod=1;
case "Large":sizemod=2;
case "Huge":sizemod=4;
default:sizemod=1]

[h:obj=getLibProperty("Feats","Lib:"+tokenName)]
[h,if(json.type(obj)=="UNKNOWN"),code:{};{

	[h:objlist=json.fields(obj)]
	[h:find=listfind(objlist,"Powerful Build")]
	[h:sizemod=if(find==-1,sizemod,sizemod*2)]

}]

[h:coinWeight=if(isNumber(PP)==1,PP,0)+if(isNumber(GP)==1,GP,0)+if(isNumber(EP)==1,EP,0)+if(isNumber(SP)==1,SP,0)+if(isNumber(CP)==1,CP,0)]

[h:currencyValue=getLibProperty("Currency", function.getNamespace())]
[h:currencyWeight=getStrProp(currencyValue,"weight")]
[h:totalWeight=totalWeight+floor(coinWeight*currencyWeight)]

[h:carryMod=StrengthValue*sizemod]

[r:macrolink("Total weight", "character/Carry Capacity Calculation@this")"","tokenName="+tokenName)]: [r:totalWeight]/[r:carryMod*15)]

[r:if(totalWeight>carryMod*15,"(<span title='You can not carry that much weight'>Can't carry)",if(totalWeight>carryMod*10,"(<span title='speed drops by 20 ft., disadvantage on ability checks, attack rolls, and saving throws that use STR, DEX, or CON'>Heavily encumbered</span>)",if(totalWeight>carryMod*5,"(<span title='speed drops by 10 ft.'>Encumbered</span>)","")))]

<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Add Equipment'>EQUIPMENT</span>", "character/Add@this")"","prop="+object+";tokenName="+tokenName)]


</table>




</table>


<td valign=top style="margin:0px; padding:0px">


<table width=100%>
<tr>
<td bgcolor=#DCDCDC style="border-style: double solid double solid; border-width:3px; border-color:white">


<!-----------------Personality------------------->
<table bgcolor=white style="border-style: solid double solid double; border-width:2px 3px 2px 3px;">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">

[h:value=getLibProperty("OtherNotes","Lib:"+tokenName)]

[h:key="Personality"]

[h,if(json.type(value)=="UNKNOWN"),code:{
	[h:value=json.fromStrProp("Backstory=;Personality=;Ideals=;Flaws=;Bonds=;Allies=;AditionalFeats=;Treasure=")]
	[h:setLibProperty("OtherNotes",value,"Lib:"+tokenName)]	
	[h:description=json.get(value,key)]
};{
	[h:description=json.get(value,key)]
}]

[macro("character/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]


<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>

[r:macrolink("<span title='Edit Personality Traits'>PERSONALITY TRAITS</span>", "character/Change Textfield Form@this")"","prop=OtherNotes;name="+key+";description="+description+";tokenName="+tokenName)]
</table>


<!-----------------Ideals------------------->
<table bgcolor=white style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top:3px">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">

[h:key="Ideals"]

[h:description=json.get(value,key)]

[macro("character/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]



<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>
[r:macrolink("<span title='Edit Ideals'>IDEALS</span>", "character/Change Textfield Form@this")"","prop=OtherNotes;name="+key+";description="+description+";tokenName="+tokenName)]

</table>

<!-----------------Bonds------------------->
<table bgcolor=white style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top:3px">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">

[h:key="Bonds"]

[h:description=json.get(value,key)]

[macro("character/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]


<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>
[r:macrolink("<span title='Edit Bonds'>BONDS</span>", "character/Change Textfield Form@this")"","prop=OtherNotes;name="+key+";description="+description+";tokenName="+tokenName)]

</table>


<!-----------------Flaws------------------->
<table bgcolor=white style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top:3px">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">

[h:key="Flaws"]

[h:description=json.get(value,key)]

[macro("character/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]



<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>

[r:macrolink("<span title='Edit Flaws'>FLAWS</span>", "character/Change Textfield Form@this")"","prop=OtherNotes;name="+key+";description="+description+";tokenName="+tokenName)]

</table>


<tr>
<td style="margin:0px; padding:0px">


[macro("character/Resources@this"):"tokenName="+tokenName]

<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px;">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">

<!-----------------FEATS------------------->
[h:object="Feats"]



[h:obj=getLibProperty(object,"Lib:"+tokenName)]
[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]


[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]

[h:RaceFeat=""]
[h:BgFeat=""]
[h:ClassFeat=""]
[h:FeatsFeat=""]
[h:OtherFeat=""]
[h,count(repeat),code:{

	[h:objName=listGet(objList,roll.count)]
	[h:source=json.get(obj,objName)]
	[h,switch(source):
	case "Race":RaceFeat=listAppend(RaceFeat,objName);
	case "Background":BgFeat=listAppend(BgFeat,objName);
	case "Feat":FeatsFeat=listAppend(FeatsFeat,objName);
	case "Other":OtherFeat=listAppend(OtherFeat,objName);
	default:ClassFeat=listAppend(ClassFeat,objName)]

}]
[h:objList=listAppend("",RaceFeat)]
[h:objList=listAppend(objList,BgFeat)]
[h:objList=listAppend(objList,FeatsFeat)]
[h:objList=listAppend(objList,OtherFeat)]
[h:objList=listAppend(objList,ClassFeat)]
[h:objList=replace(objList,", ",",")]
[h:objList=replace(objList,",+",",")]

[r,count(repeat,""),code:{

	[h:objName=listGet(objList,roll.count)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(objName)]

	[h:source=json.get(obj,objName)]
	<p style="margin:0px;padding:0px;margin-bottom:2px">
	<font size=3>
	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"character/Args Dialog@this","","prop="+object+";index="+roll.count+";name="+objName+";description=;tokenName="+tokenName)]</font>
 [r:source]
	
	</p>

}]




<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Add Features'>FEATURES & TRAITS</span>", "character/Add@this")"","prop="+object+";tokenName="+tokenName)]


</table>



</table>

</table>





