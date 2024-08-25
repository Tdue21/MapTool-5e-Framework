[h:spellLists=getLibProperty("Spell Lists","Lib:Character Creation")]

[h:spellLists=listsort(spellLists,"A")]

[h,if(macro.args==""),code:{

	[h:res=input("class|"+spellLists+"|Choose Class|List|value=string")]
	[h:abort(res)]

};{

	[h:class=macro.args]

}]

[h:spellsObject=getLibProperty(class,"Lib:Character Creation")]

[h,if(json.type(spellsObject)=="UNKNOWN"):spellsObject="{}";""]

[h:level0=json.get(spellsObject,"Level 0")]
[h:level0=json.toList(level0)]

[h:level1=json.get(spellsObject,"Level 1")]
[h:level1=json.toList(level1)]

[h:level2=json.get(spellsObject,"Level 2")]
[h:level2=json.toList(level2)]

[h:level3=json.get(spellsObject,"Level 3")]
[h:level3=json.toList(level3)]

[h:level4=json.get(spellsObject,"Level 4")]
[h:level4=json.toList(level4)]

[h:level5=json.get(spellsObject,"Level 5")]
[h:level5=json.toList(level5)]

[h:level6=json.get(spellsObject,"Level 6")]
[h:level6=json.toList(level6)]

[h:level7=json.get(spellsObject,"Level 7")]
[h:level7=json.toList(level7)]

[h:level8=json.get(spellsObject,"Level 8")]
[h:level8=json.toList(level8)]

[h:level9=json.get(spellsObject,"Level 9")]
[h:level9=json.toList(level9)]




[dialog5("Edit Spells", "width=380; height=400; temporary=1; noframe=0; input=1"):{

	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
	[h: processorLink = macroLinkText("Change Spells process@Lib:Character Creation","")]
	<form action="[r:processorLink]" method="json">
	
	<input type="submit" name="button" value="Save">[r,count(5,""):"&nbsp;"]
	<input type="submit" name="cancel" value="Cancel">

	<input type="hidden" name="class" value="[r:class]">

	<h5>[r:class] Spells</h5>

	<table width=100%>
	<tr><td width=0%>
	<b>Cantrips</b>
	<td>
	<input type="text" name="level 0" value="[r:level0]" size="25">
	<tr><td>
	<b>Level 1</b>
	<td>
	<input type="text" name="level 1" value="[r:level1]" size="25">
	<tr><td>
	<b>Level 2</b>
	<td>
	<input type="text" name="level 2" value="[r:level2]" size="25">
	<tr><td>
	<b>Level 3</b>
	<td>
	<input type="text" name="level 3" value="[r:level3]" size="25">
	<tr><td>
	<b>Level 4</b>
	<td>
	<input type="text" name="level 4" value="[r:level4]" size="25">
	<tr><td>
	<b>Level 5</b>
	<td>
	<input type="text" name="level 5" value="[r:level5]" size="25">
	<tr><td>
	<b>Level 6</b>
	<td>
	<input type="text" name="level 6" value="[r:level6]" size="25">
	<tr><td>
	<b>Level 7</b>
	<td>
	<input type="text" name="level 7" value="[r:level7]" size="25">
	<tr><td>
	<b>Level 8</b>
	<td>
	<input type="text" name="level 8" value="[r:level8]" size="25">
	<tr><td>
	<b>Level 9</b>
	<td>
	<input type="text" name="level 9" value="[r:level9]" size="25">

	</table>

}]