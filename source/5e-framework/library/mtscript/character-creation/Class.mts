[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:submit=json.get(macro.args,"submit")]
[h,if(submit=="Skip"),code:{

[h:hasClassMacro=0]

};{
	[h:background=lower(json.get(macro.args,"background"))]

[h:macroList=getLibProperty("macroList", function.getNamespace())]
[h:hasClassMacro=listfind(macroList,background)]

[h,if(hasClassMacro==-1),code:{
	
	[macro("compendium/custom background@this"):"tokenName="+tokenName+";name="+background]
	
	};{
		
	[macro(background+"compendium/@this"):tokenName]
	
}]

[h,if(macro.return==""):"";background=macro.return]
[h,if(macro.return==""):"";setProperty("Background","value="+capitalize(background)+";text=")]
<!-----------------Feat------------------->
[h:group="Feats"]
[h:inputList=getLibProperty(group,"Lib:Character")]
[h:inputList=json.fields(inputList)]
[h:inputList=listSort(inputList,"N")]
[h:Property=getProperty(group)]
[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
[h,count(listcount(currentList)),code:{
	[h:currentItem=listget(currentList,roll.count)]
	[h:delete=listfind(inputList,currentItem)]
	[h:inputList=listdelete(inputList,delete)]
}]
[h:Property=json.set(Property,lower(background),"Background")]
[h:setProperty(group,Property)]

}]

<h1>Class</h1>

<p style="margin-top: 10px; margin-bottom: 10px">

[r,if(hasClassMacro==-1),code:{

	The <b>[r:background]</b> macro on <b>Lib:Compendium</b> is missing, some background features and proficiencies need to be added manually.
	<br>
	<br>

};{}]

Select a <b>class</b> from the following, and select if you want starting equipment to choose from a list provided by the class or starting money, to buy your equipment later.

</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px">


[h: processorLink=macroLinkText("character-creation/CharacterCreationWizard@this","")]
<form action="[r:processorLink]" method="json">

[h:classes=getLibProperty("Classes", function.getNamespace())]
[h:classList=json.fields(classes)]

<select name="CaracterClass" size="[r:if(hasClassMacro==-1,9,12)]">

[r,count(listcount(classList),""),code:{

[h:currentClass=listget(classList,roll.count)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(currentClass)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

<option[r:if(roll.count==0," selected='selected'","")]>[r:CapitalName]</option>

}]
</select>
<br>
<select name="Equipment" size="1">

<option selected="selected">Starting Equipment</option>
<option>Starting Money</option>

</select>

<p style="margin-top: 10px;margin-bottom: 10px;margin-left:10px">

Click <b>Next</b> to continue.

</p>

<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Class">


<div class="div" style="padding-left: 207px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value="Skip">&nbsp;
<input type="submit" name="submit" value="Next >">
</div>

