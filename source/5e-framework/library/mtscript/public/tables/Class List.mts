[h:classesObj=getLibProperty("Classes","Lib:Character Creation")]
[h:classlist=json.fields(classesObj)]

[h:classlist=listSort(classlist,"a")]

[r,count(listcount(classlist),""),code:{

	[h:currentClass=listget(classlist,roll.count)]

	[h:CapitalName=function.Capitalize(currentClass)]

	<li>[r:macroLink(CapitalName,"Class Window@Lib:Tables","","class="+currentClass)]</li>



}]
