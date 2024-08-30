[h:classes=getLibProperty("Classes", function.getNamespace())]

[h:class=getStrProp(macro.args,"class")]
[h:subclass=getStrProp(macro.args,"subclass")]



[h:classObj=json.get(classes,class)]

[h,if(json.type(classObj)=="UNKNOWN"):res=input("var|Save class before editing subclasses.||label|span=true");res=1]
[h:abort(res)]

[h:subclassesObj=json.get(classObj,"subclass")]

[h:hitDice=json.get(classObj,"hitDice")]

[h,if(subclass=="Add New"),code:{

	[h:res=input("subclass|Subclass Name")]
	[h:abort(res)]
	[h:subclass=lower(subclass)]
	[h:subclass=replace(subclass,"^\\s*","")]
	[h:subclass=replace(subclass,"\\s*\$","")]
	[h:subclassesObj=json.set(subclassesObj,subclass,"{}")]

	[h:classObj=json.set(classObj,"subclass",subclassesObj)]
	[h:classes=json.set(classes,class,classObj)]
	[h:setLibProperty("Classes", classes, function.getNamespace())]

};{}]

[h,if(subclass!=""):subclassObj=json.get(subclassesObj,subclass)]


[h,if(subclass==""):object=classObj;object=subclassObj]


[h:level1=json.get(object,"level1")]
[h:level2=json.get(object,"level2")]
[h:level3=json.get(object,"level3")]
[h:level4=json.get(object,"level4")]
[h:level5=json.get(object,"level5")]
[h:level6=json.get(object,"level6")]
[h:level7=json.get(object,"level7")]
[h:level8=json.get(object,"level8")]
[h:level9=json.get(object,"level9")]
[h:level10=json.get(object,"level10")]
[h:level11=json.get(object,"level11")]
[h:level12=json.get(object,"level12")]
[h:level13=json.get(object,"level13")]
[h:level14=json.get(object,"level14")]
[h:level15=json.get(object,"level15")]
[h:level16=json.get(object,"level16")]
[h:level17=json.get(object,"level17")]
[h:level18=json.get(object,"level18")]
[h:level19=json.get(object,"level19")]
[h:level20=json.get(object,"level20")]

[dialog5("Edit Class Features", "width=380; height=660; temporary=1; noframe=0; input=1"):{

	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">
	[h: processorLink = macroLinkText("character-creation/Change Class Features process@this","")]
	<form action="[r:processorLink]" method="json">
	<input type="submit" name="button" value="Save">[r,count(5,""):"&nbsp;"]
	<input type="submit" name="cancel" value="Cancel">[r,count(40,""):"&nbsp;"]
	<input type="submit" name="delete" value="Delete">


	<h5>
	[r:class+if(subclass=="",""," ("+subclass+")")]
	</h5>


	<input type="hidden" name="class" value="[r:class]">
	<input type="hidden" name="subclass" value="[r:subclass]">
	<input type="hidden" name="hitDice" value="[r:hitDice]">

	<table width=100%>
	<tr><td width=0%>
	<b>Level 1</b>
	<td>
	<input type="text" name="level1" value="[r:level1]" size="25">
	<tr><td>
	<b>Level 2</b>
	<td>
	<input type="text" name="level2" value="[r:level2]" size="25">
	<tr><td>
	<b>Level 3</b>
	<td>
	<input type="text" name="level3" value="[r:level3]" size="25">
	<tr><td>
	<b>Level 4</b>
	<td>
	<input type="text" name="level4" value="[r:level4]" size="25">
	<tr><td>
	<b>Level 5</b>
	<td>
	<input type="text" name="level5" value="[r:level5]" size="25">
	<tr><td>
	<b>Level 6</b>
	<td>
	<input type="text" name="level6" value="[r:level6]" size="25">
	<tr><td>
	<b>Level 7</b>
	<td>
	<input type="text" name="level7" value="[r:level7]" size="25">
	<tr><td>
	<b>Level 8</b>
	<td>
	<input type="text" name="level8" value="[r:level8]" size="25">
	<tr><td>
	<b>Level 9</b>
	<td>
	<input type="text" name="level9" value="[r:level9]" size="25">
	<tr><td>
	<b>Level 10</b>
	<td>
	<input type="text" name="level10" value="[r:level10]" size="25">
	<tr><td>
	<b>Level 11</b>
	<td>
	<input type="text" name="level11" value="[r:level11]" size="25">
	<tr><td>
	<b>Level 12</b>
	<td>
	<input type="text" name="level12" value="[r:level12]" size="25">
	<tr><td>
	<b>Level 13</b>
	<td>
	<input type="text" name="level13" value="[r:level13]" size="25">
	<tr><td>
	<b>Level 14</b>
	<td>
	<input type="text" name="level14" value="[r:level14]" size="25">
	<tr><td>
	<b>Level 15</b>
	<td>
	<input type="text" name="level15" value="[r:level15]" size="25">
	<tr><td>
	<b>Level 16</b>
	<td>
	<input type="text" name="level16" value="[r:level16]" size="25">
	<tr><td>
	<b>Level 17</b>
	<td>
	<input type="text" name="level17" value="[r:level17]" size="25">
	<tr><td>
	<b>Level 18</b>
	<td>
	<input type="text" name="level18" value="[r:level18]" size="25">
	<tr><td>
	<b>Level 19</b>
	<td>
	<input type="text" name="level19" value="[r:level19]" size="25">
	<tr><td>
	<b>Level 20</b>
	<td>
	<input type="text" name="level20" value="[r:level20]" size="25">


	</table>

	
}]



