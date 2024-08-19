[h:classesObj=getLibProperty("Classes",function.getNamespace())]
[h:classlist=json.fields(classesObj)]
[h:classlist=listSort(classlist,"a")]

[r,foreach(currentClass, classlist,""),code:{
	[h:CapitalName=function.Capitalize(currentClass)]
	<li>[r:macroLink(CapitalName,"tables/Class Window@this","","class="+currentClass)]</li>
}]
