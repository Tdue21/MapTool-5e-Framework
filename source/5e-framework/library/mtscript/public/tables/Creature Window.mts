[h,if(macro.args==""):sort="Name";sort=getStrProp(macro.args,"sort")]
[h,if(macro.args==""):dir="a";dir=getStrProp(macro.args,"dir")]

[h:gameplay=getLibProperty("Gameplay","Lib:Campaign")]
[h:rollNPC=getStrProp(gameplay,"rollNPC")]

[r,if(rollNPC==1):output=function.getOutput();output="none"]

[dialog5("Bestiary", "width=750; height=600; temporary=1; noframe=0; input=1"):{

	<link rel="stylesheet" type="text/css" href="D&D@Lib:Campaign">
	
	<p bgcolor=white style="border-bottom: 1px solid gray;padding:0px;margin:0px;font-family:sans;font-size:10px">


	[r:macroLink("Build Table","Build Bestiary Table@Lib:Tables","")]


	</p>
	
	<h1>Bestiary</h1>


	[h:jsonNPC=getLibProperty("Bestiary","Lib:Tables")]
	
	[h:jsonNPC=json.sort(jsonNPC,dir,sort)]
	[h:dir=if(getStrProp(macro.args,"dir")=="a","d","a")]

	[h:fields=json.fields(jsonNPC)]

	<table>
	<tr>
	<th>
	[r:macroLink("Name","Creature Window@Lib:Tables","","sort=Name;dir="+dir)]
	<th>
	[r:macroLink("Type","Creature Window@Lib:Tables","","sort=Type;dir="+dir)]
	<th width=10% align=center>
	[r:macroLink("CR","Creature Window@Lib:Tables","","sort=numericCR;dir="+dir)]
	<th width=10% align=center>
	[r:macroLink("Sources","Creature Window@Lib:Tables","","sort=Sources;dir="+dir)]
	
	[h:odd=1]
	[r,count(listcount(fields),"<br>"),code:{

		[h:currentObj=json.get(jsonNPC,roll.count)]

		<tr class=[r:if(odd==1,"bg","")]>
		[h:odd=if(odd==1,0,1)]
		<td>
		[h:name=json.get(currentObj,"Name")]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]


		
		[r:macroLink(CapitalName,"Viewer Frame@Lib:Bestiary","",name)]
		<td>
		[r:type=json.get(currentObj,"Type")]
		<td align=center>
		[r:challenge=json.get(currentObj,"CR")]
		<td align=center>
		[r:sources=json.get(currentObj,"Sources")]
		<td width=0%>
		[r:macroLink("Make Token","Quick Monster@Lib:Bestiary",output,name)]
	
	}]

}]