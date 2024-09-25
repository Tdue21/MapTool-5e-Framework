[h,if(macro.args==""):sort="Name";sort=getStrProp(macro.args,"sort")]
[h,if(macro.args==""):dir="a";dir=getStrProp(macro.args,"dir")]

[h:gameplay=getLibProperty("Gameplay", function.getNamespace())]
[h:rollNPC=getStrProp(gameplay,"rollNPC")]

[r,if(rollNPC==1):output=function.getOutput();output="none"]

[dialog5("Bestiary", "width=750; height=600; temporary=1; noframe=0; input=1"):{

	<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">
	
	<p bgcolor=white style="border-bottom: 1px solid gray;padding:0px;margin:0px;font-family:sans;font-size:10px">


	[r:macrolink("Build Table", "tables/Build Bestiary Table@this", "")]


	</p>
	
	<h1>Bestiary</h1>


	[h:jsonNPC=getLibProperty("Bestiary", function.getNamespace())]
	
	[h:jsonNPC=json.sort(jsonNPC,dir,sort)]
	[h:dir=if(getStrProp(macro.args,"dir")=="a","d","a")]

	[h:fields=json.fields(jsonNPC)]

	<table>
	<tr>
	<th>
	[r:macrolink("Name", "tables/Creature Window@this", "","sort=Name;dir="+dir)]
	<th>
	[r:macrolink("Type", "tables/Creature Window@this", "","sort=Type;dir="+dir)]
	<th width=10% align=center>
	[r:macrolink("CR", "tables/Creature Window@this", "","sort=numericCR;dir="+dir)]
	<th width=10% align=center>
	[r:macrolink("Sources", "tables/Creature Window@this", "","sort=Sources;dir="+dir)]
	
	[h:odd=1]
	[r,count(listcount(fields),"<br>"),code:{

		[h:currentObj=json.get(jsonNPC,roll.count)]

		<tr class=[r:if(odd==1,"bg","")]>
		[h:odd=if(odd==1,0,1)]
		<td>
		[h:name=json.get(currentObj,"Name")]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]


		
		[r:macroLink(CapitalName,"bestiary/Viewer Frame@this","",name)]
		<td>
		[r:type=json.get(currentObj,"Type")]
		<td align=center>
		[r:challenge=json.get(currentObj,"CR")]
		<td align=center>
		[r:sources=json.get(currentObj,"Sources")]
		<td width=0%>
		[r:macrolink("Make Token", "bestiary/Quick Monster@this")output,name)]
	
	}]

}]