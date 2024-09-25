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
[r:macrolink("Load", "character/Selector@this", "","macro=Description Sheet;tokenName="+tokenName)]
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
<td style="margin:0px; padding:0px"><span title="Edit Name">[r:macrolink("CHARACTER NAME", "character/Rename@this", "","tokenName="+tokenName)]</span>
<td bgcolor=#DCDCDC>

</table>

<td style="margin:0px; padding:0px">

<table width=100% style="border-style: double; border-width:3px; margin:0px; padding:0px">
<tr>
<td style="margin:0px; padding:0;" height=16>

<!-----------------AGE------------------->


[h:Age=getLibProperty("Age","Lib:"+tokenName)]

[h:value=getStrProp(string(Age),"value")]
[h:text=getStrProp(string(Age),"text")]

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]





<td style="margin:0px; padding:0px">



<!-----------------HEIGHT------------------->



[h:Height=getLibProperty("Height","Lib:"+tokenName)]

[h:value=getStrProp(string(Height),"value")]
[h:text=getStrProp(string(Height),"text")]

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]







<td style="margin:0px; padding:0px">

<!-----------------WEIGHT------------------->

[h:Weight=getLibProperty("Weight","Lib:"+tokenName)]

[h:value=getStrProp(string(Weight),"value")]
[h:text=getStrProp(string(Weight),"text")]

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]




<tr style="font-size:6px; border-top: 1px solid gray;">
<td style="margin:0px; padding:0px">





[r:macrolink("<span title='Edit age'>AGE</span>", "character/Change Property@this", "","name=Age;value="+encode(Age)+";id="+id+";tokenName="+tokenName)]

<td style="margin:0px; padding:0px">

[r:macrolink("<span title='Edit height'>HEIGHT</span>", "character/Change Property@this", "","name=Height;value="+encode(Height)+";id="+id+";tokenName="+tokenName)]


<td style="margin:0px; padding:0px">

[r:macrolink("<span title='Edit weight'>WEIGHT</span>", "character/Change Property@this", "","name=Weight;value="+encode(Weight)+";id="+id+";tokenName="+tokenName)]

<tr>
<td style="margin:0px; padding:0px" height=16>

<!-----------------EYES------------------->
[h:Eyes=getLibProperty("Eyes","Lib:"+tokenName)]

[h:value=getStrProp(string(Eyes),"value")]
[h:text=getStrProp(string(Eyes),"text")]

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]


<td style="margin:0px; padding:0px">

<!-----------------SKIN------------------->
[h:Skin=getLibProperty("Skin","Lib:"+tokenName)]

[h:value=getStrProp(string(Skin),"value")]
[h:text=getStrProp(string(Skin),"text")]

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]




<td style="margin:0px; padding:0px">


<!-----------------HAIR------------------->
[h:Hair=getLibProperty("Hair","Lib:"+tokenName)]

[h:value=getStrProp(string(Hair),"value")]
[h:text=getStrProp(string(Hair),"text")]

[r:if(text=="" || text==0,value,"<span title='"+text+"'>"+value+"</span>")]

<tr style="font-size:6px; border-top: 1px solid gray;">
<td style="margin:0px; padding:0px">
[r:macrolink("<span title='Edit eyes description'>EYES</span>", "character/Change Property@this", "","name=Eyes;value="+encode(Eyes)+";id="+id+";tokenName="+tokenName)]

<td style="margin:0px; padding:0px">
[r:macrolink("<span title='Edit skin description'>SKIN</span>", "character/Change Property@this", "","name=Skin;value="+encode(Skin)+";id="+id+";tokenName="+tokenName)]
<td style="margin:0px; padding:0px">

[r:macrolink("<span title='Edit hair description'>HAIR</span>", "character/Change Property@this", "","name=Hair;value="+encode(Hair)+";id="+id+";tokenName="+tokenName)]

</table>

</table>

<table width=100%>
<tr>
<td valign=top width=1% style="margin:0px; padding:0px">



<!-----------------PORTRAIT------------------->


<table width=228 style="border-style: double; border-width:3px">
<tr>
<td height=260 align=center valign=middle style="font-size:8px; margin:0px; padding:0px">


[h:value=getLibProperty("Portrait","Lib:"+tokenName)]
[h:portraitURL=getStrProp(string(value),"value")]
[h,token("Lib:"+tokenName):portraitImg=getTokenPortrait("",findToken("Lib:"+tokenName,start),start)]

[h:text=getStrProp(string(value),"text")]

[h:portrait=if(portraitURL=="" || portraitURL==0,portraitImg,portraitURL)]

[r,if(portrait=="" || portrait==0):"<font size=6 color=silver>[Portrait]</font>";"<img src="+portrait+if(text=="" || text==0,""," alt="+text)+" width=218>"]


<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Edit portrait URL'>CHARACTER APPEARANCE</span>", "character/Change Property@this", "","name=Portrait;value="+encode(value)+";id="+id+";tokenName="+tokenName)]

</table>


<!-----------------BACKGROUND------------------->


<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top: 5px">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">



[h:value=getLibProperty("OtherNotes","Lib:"+tokenName)]

[h:key="Backstory"]

[h,if(json.type(value)=="UNKNOWN"),code:{
	[h:value=json.fromStrProp("Backstory=;Personality=;Ideals=;Flaws=;Bonds=;Allies=;AditionalFeats=;Treasure=")]
	[h:setProperty("OtherNotes",value)]	
	[h:description=json.get(value,key)]
};{
	[h:description=json.get(value,key)]
}]


[macro("character/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]



<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Edit Backstory'>CHARACTER BACKSTORY</span>", "character/Change Textfield Form@this", "","prop=OtherNotes;name="+key+";description="+description+";tokenName="+tokenName)]

</table>




<td valign=top width=245 style="font-size:15px; margin:0px; padding:0px; margin-left:5px">

<!-----------------ALLIES------------------->
<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px;">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">




[h:key="Allies"]

[h:description=json.get(value,key)]


[macro("character/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]


<td width=180 style="margin:0px; padding:0px">


<table width=100%>
<tr>
<td align=center bgcolor=#DCDCDC style="font-size:6px; border-style: solid double solid double; border-width:3px; border-color:white; padding: 5px; padding-bottom: 0px">


<table bgcolor=white style="border-style: double solid double solid; border-width:3px 2px 3px 2px">
<tr>
<td style="font-size:6px; margin:0px; padding:0px">


[h:SymbolName=getLibProperty("SymbolName","Lib:"+tokenName)]

[h:SymbolValue=getStrProp(string(SymbolName),"value")]
[h:Symboltext=getStrProp(string(SymbolName),"text")]





<font color=gray>[r:macrolink("<span title='Edit symbol name'>NAME", "character/Change Property@this", "","name=SymbolName;value="+encode(SymbolName)+";id="+id+";tokenName="+tokenName)]
<tr>
<td bgcolor=#DCDCDC>


[r:if(Symboltext=="" || Symboltext==0,SymbolValue,"<span title='"+Symboltext+"'>"+SymbolValue+"</span>")]



<tr>
<td height=130 align=center valign=middle style="margin:0px; padding:0px">




[h:SymbolValue=getLibProperty("Symbol","Lib:"+tokenName)]
[h:SymbolURL=getStrProp(string(SymbolValue),"value")]
[h,token("Lib:"+tokenName):SymbolImg=getTokenHandout("",findToken("Lib:"+tokenName,start),start)]


[h:text=getStrProp(string(SymbolValue),"text")]

[h:Symbol=if(SymbolURL=="" || SymbolURL==0,SymbolImg,SymbolURL)]

[r,if(Symbol=="" || Symbol==0):"<font size=6 color=silver>[Symbol]</font>";"<img src="+Symbol+if(text=="" || text==0,""," alt="+text)+" width=140>"]








</table>

<font color=white><b>

[r:macrolink("<span title='Edit symbol URL'>SYMBOL</span>", "character/Change Property@this", "","name=Symbol;value="+encode(SymbolValue)+";id="+id+";tokenName="+tokenName)]

</table>
<br>
<tr>
<td colspan=2 align=center valign=top style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Edit Allies & Organizations'>ALLIES & ORGANIZATIONS</span>", "character/Change Textfield Form@this", "","prop=OtherNotes;name="+key+";description="+description+";tokenName="+tokenName)]

</table>

<!-----------------ADDITIONAL FEATS & TRAITS------------------->
<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top: 5px">
<tr>
<td width=50% style="font-size:8px; margin:0px; padding:0px">

[h:object="AdditionalFeats"]


[h:obj=getLibProperty(object,"Lib:"+tokenName)]
[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]


[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(json.fields(obj))]

[h:objList=listSort(objList,"a")]

[r,count(repeat,""),code:{

	[h:objName=listGet(objList,roll.count)]
	[h:source=json.get(obj,objName)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(objName)]

	
	<p style="margin:3px;padding:0px;">
	<font size=3>
	[r:macrolink(if(CapitalName=="","Untitled",CapitalName),"character/Args Dialog@this","","prop="+object+";index="+roll.count+";name="+objName+";description=;tokenName="+tokenName)]</font>
	<br>
	Source: [r:source]
	</p>
	


}]
<!---------------------------Special Defenses----------------------------->
<td align=left valign=top>

[h:rules=getLibProperty("Value", function.getNamespace())]

[h:defObj=getLibProperty("Defenses","Lib:"+tokenName)]

[h,if(json.type(defObj)=="OBJECT"),code:{

	
	[h:resistance=lower(json.get(defObj,"resistance"))]
	[h:immunity=lower(json.get(defObj,"immunity"))]
	[h:vulnerability=lower(json.get(defObj,"vulnerability"))]
	[h:condition=lower(json.get(defObj,"condition"))]

	[h,count(listcount(condition)),code:{
	
		[h:currentCondition=listget(condition,roll.count)]
		[h:ConditionText=json.get(rules,capitalize(currentCondition))]
		[h,if(ConditionText!=""):currentCondition=macroLink(currentCondition,"notebook/Content@this","","key="+capitalize(currentCondition)+";description="+encode(ConditionText)+";tokenName=Lib:Rules")]
		[h,if(ConditionText!=""):condition=listReplace(condition,roll.count,currentCondition)]
	
	}]
	

	[h:resText="<b>Damage Resistances</b> "+resistance]
	[h:immText="<b>Damage Immunities</b> "+immunity]
	[h:vulText="<b>Damage Vulnerabilities </b>"+vulnerability]
	[h:conText="<b>Condition Immunities </b>"+condition]


};{

	[h:resistance=""]
	[h:immunity=""]
	[h:vulnerability=""]
	[h:condition=""]
}]

[r,if(resistance==0 || resistance==""):"";resText+"<br>"]
[r,if(immunity==0 || immunity==""):"";immText+"<br>"]
[r,if(vulnerability==0 || vulnerability==""):"";vulText+"<br>"]
[r,if(condition==0 || condition==""):"";conText+"<br>"]





<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Add Additional Features'>ADDITIONAL FEATURES & TRAITS</span>", "character/Add@this", "","prop="+object+";tokenName="+tokenName)]

<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Edit resistances and vulnerabilities'>SPECIAL DEFENSES</span>", "character/Special Defenses@this", "","tokenName="+tokenName)]

</table>

<!-----------------TREASURE------------------->
<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top: 5px">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">



[h:key="Treasure"]

[h:description=json.get(value,key)]

[macro("character/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]

<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Edit treasures'>TREASURE</span>", "character/Change Textfield Form@this", "","prop=OtherNotes;name="+key+";description="+description+";tokenName="+tokenName)]

</table>


<!-----------------NOTES------------------->
<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top: 5px">
<tr>
<td style="font-size:8px; margin:0px; padding:0px">

[h:key="Notes"]

[h,token("Lib:"+tokenName):description=getNotes("Lib:"+tokenName,start)]


[macro("character/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]

<tr>
<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Edit Notes'>NOTES</span>", "character/Change Textfield Form@this", "","prop=Notes;name="+key+";description="+description+";tokenName="+tokenName)]
</table>


[r,if(isGM()==1),code:{
	<!-----------------NOTES------------------->
	<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top: 5px">
	<tr>
	<td style="font-size:8px; margin:0px; padding:0px">
	
	[h:key="GM Notes"]
	
	[h,token("Lib:"+tokenName):description=getGMNotes("Lib:"+tokenName,start)]
	
	
	[macro("character/Markdown@this"):"tokenName="+tokenName+";description="+encode(description)]
	
	<tr>
	<td align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
	<b>[r:macrolink("<span title='Edit GM Notes'>GM NOTES</span>", "character/Change Textfield Form@this", "","prop=GMNotes;name="+key+";description="+description+";tokenName="+tokenName)]
	</table>
};{}]


</table>




