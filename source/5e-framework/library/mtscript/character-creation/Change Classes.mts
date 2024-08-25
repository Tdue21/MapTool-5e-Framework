[h:classes=getLibProperty("Classes","Lib:Character Creation")]
[h:fields=json.fields(classes)]

[h:fields=listsort(fields,"a")]

[h,if(macro.args==""),code:{

	[h:res=input("class|add new,"+fields+"|Choose Class|List|value=string")]
	[h:abort(res)]

	
};{

	[h:class=macro.args]

}]



[h,if(class=="add new"):classObject="{}";classObject=json.get(classes,class)]
[h:level=json.get(classObject,"level")]
[h:hitDice=json.get(classObject,"hitDice")]
[h:spellcasting=json.get(classObject,"spellcasting")]
[h:subclass=json.get(classObject,"subclass")]

[h:subclassList=json.fields(subclass)]

[h:height=280+(listcount(subclassList)*26)]

[dialog5("Edit Classes", "width=380; height="+height+"; temporary=1; noframe=0; input=1"):{

	<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">

	[h: processorLink = macroLinkText("Change Classes process@Lib:Character Creation","")]
	<form action="[r:processorLink]" method="json">
	
	<input type="submit" name="button" value="Save">[r,count(5,""):"&nbsp;"]
	<input type="submit" name="cancel" value="Cancel">[r,count(40,""):"&nbsp;"]
	<input type="submit" name="delete" value="Delete">

	<table width=100%>
	<tr><td width=0% valign=top>


	<b>Class</b>
	<td>
	<input type="text" name="class" value="[r:class]" size="20">

	<br>[r:macroLink("Change Class Features","Change Class Features@Lib:Character Creation","","class="+class)]

	<tr><td valign=top>
	<b>Subclasses</b>
	
	<td>

	[r,count(listcount(subclassList),""),code:{

		[h:currentSubclass=listget(subclassList,roll.count)]

		[r:macroLink(currentSubclass,"Change Class Features@Lib:Character Creation","","class="+class+";subclass="+currentSubclass)]
		<br>

	}]
	
	[r:macroLink("+","Change Class Features@Lib:Character Creation","","class="+class+";subclass=add new")]


	<tr><td>
	<b>Subclass at level</b>
	<td>
	<input type="text" name="level" value="[r:level]" size="5">
	<tr><td>
	<b>Hit Dice</b>
	<td>
	<select name="hitDice" size="1">
		<option [r:if(hitDice=="d4","selected='selected'","")]>d4</option>
		<option [r:if(hitDice=="d6","selected='selected'","")]>d6</option>
		<option [r:if(hitDice=="d8","selected='selected'","")]>d8</option>
		<option [r:if(hitDice=="d10","selected='selected'","")]>d10</option>
		<option [r:if(hitDice=="d12","selected='selected'","")]>d12</option>
		<option [r:if(hitDice=="d20","selected='selected'","")]>d20</option>
	</select>

	
	<tr><td valign=top>
	<b>Spellcasting</b>
	<td>
	[h:atrList=getLibProperty("Attributes","Lib:Character")]
	
	<select name="spellcasting" size="1">
		<option [r:if(spellcasting=="","selected='selected'","")]>-</option>
		[r,count(listcount(atrList),""):"<option "+if(spellcasting==listget(atrList,roll.count),"selected='selected'","")+">"+listget(atrList,roll.count)+"</option>"]
	</select>

	<br>[r:macroLink("Change Spell List","Change Spells@Lib:Character Creation","",class)]
	
	<input type="hidden" name="name" value="[r:class]">


	</table>

}]
