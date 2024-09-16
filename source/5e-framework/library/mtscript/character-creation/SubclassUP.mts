[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]


[h:class=json.get(macro.args,"CaracterClass")]
[h:class=lower(replace(class,"\\*|\\s\\(Level Up\\)",""))]

<!-----------------Feats------------------->
[macro("character-creation/Add Class Features@this"):"tokenName="+tokenName+";class="+class]

[h:macroList=getLibProperty("macroList", function.getNamespace())]
[h:hasClassMacro=listfind(macroList,class)]

[h,if(hasClassMacro==-1),code:{};{
	<!-----------------Class------------------->	
	[macro(class+"compendium/@this"):"tokenName="+tokenName+";class="+class]
}]


[h:classes=getLibProperty("Classes", function.getNamespace())]
[h:subclassobj=json.get(classes,class)]
[h:subclassList=json.get(subclassobj,"subclass")]
[h:subclassList=json.toList(subclassList)]
[h:level=json.get(subclassobj,"level")]

[h:ClassObj=getProperty("Class&Level")]
[h,if(json.type(ClassObj)=="UNKNOWN"),code:{};{

	[h:classList=json.fields(ClassObj)]
	[h:match=listFind(classList,class)]
	[h:currentClassObj=json.get(ClassObj,class)]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):charLevel=0;charLevel=json.get(currentClassObj,"level")]

}]

[h:subclass=json.get(json.get(ClassObj,class),"subclass")]

<h1>Subclass</h1>

<p style="margin-top: 10px; margin-bottom: 10px">

[r,if(hasClassMacro==-1),code:{

	The <b>[r:class]</b> macro on <b>Lib:Compendium</b> is missing, class features like saving throws, proficiencies, starting equipment and resources need to be added manually.
	<br>
	<br>

};{}]

[r,if(level==charLevel),code:{

	Select a <b>[r:class] subclass</b> from the following list.

};{

	[r,if(level>charlevel),code:{
	
		The <b>[r:class]</b> class only gets a subclass at level [r:level].
	
	};{
	
		[r:tokenName] is a <b>[r:subclass]</b> [r:class] level <b>[r:charLevel]</b>.
	
	}]
	
	

	<br>
	<br>

	Click <b>Next</b> to continue.
	

}]


</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px">


[h: processorLink=macroLinkText("character-creation/CharacterCreationWizard@this","")]
<form action="[r:processorLink]" method="json">





[r,if(level==charLevel),code:{

	<select name="subclass" size="[r:if(hasClassMacro==-1,12,15)]">
	
	[r,count(listcount(subclassList),""),code:{

[h:currentSubclass=listget(subclassList,roll.count)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(currentSubclass)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

	<option[r:if(roll.count==0," selected='selected'","")]>[r:CapitalName]</option>
	
	}]
	</select>


	
	<p style="margin-top: 10px;margin-bottom: 10px;margin-left:10px">
	
	Click <b>Next</b> to continue.
	
	</p>

};{
	
	<input type="hidden" name="subclass" value="[r:subclass]">

}]

[h:dice=json.get(json.get(ClassObj,class),"hitDice")]
<input type="hidden" name="HitDice" value="[r:dice]">

<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="SubclassUP">
<input type="hidden" name="route" value="Level Up">
<input type="hidden" name="class" value="[r:class]">

<div class="div" style="padding-left: 250px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value="Next >">
</div>


