[h,if(macro.args==""):sort="Name";sort=getStrProp(macro.args,"sort")]
[h,if(macro.args==""):dir="a";dir=getStrProp(macro.args,"dir")]

[h:gameplay=getLibProperty("Gameplay", function.getNamespace())]
[h:rollNPC=getStrProp(gameplay,"rollNPC")]
[r,if(rollNPC==1):output=function.getOutput();output="none"]

[h:bestiaryJson=getLibProperty("Bestiary", function.getNamespace())]
[h:fields = json.fields(bestiaryJson, "json")]
[h:jsonNPC=""]

[h,foreach(name, fields, ""), code:{
	[h:npc=json.get(bestiaryJson, name)]
	
	[h:cr = json.get(npc, "challenge")]
	[h,if(cr==""):challenge="";challenge=substring(cr,0,indexOf(cr," "))]
	[h,if(matches(challenge,".*/.*")==1):numericCR=eval(challenge);numericCR=challenge]
	[h,if(isNumber(numericCR)==1):numericCR=numericCR+1000;numericCR=100]
	
	[h:beast = json.set("{}", 
		"Name", name, 
		"Type", json.get(npc, "type"), 
		"numericCR",numericCR,
		"CR", challenge, 
		"Sources", json.toList(json.get(npc, "sources"))
	)]
	[h:jsonNPC = json.append(jsonNPC, beast)]
}]
[h:jsonNPC=json.sort(jsonNPC,dir,sort)]
[h:dir=if(getStrProp(macro.args,"dir")=="a","d","a")]
[h:fields=json.fields(jsonNPC)]

[dialog5("Bestiary", "width=750; height=600; temporary=1; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">
	<style>
[r:'
	.col1 {
		width:40%;
		text-align:left;
	}

	.col2 {
		width: 25%;
		text-align:left;
	}

	.col3, .col4 {
		width: 10%;
		text-align:center;
	}

	.col5 {
		text-align:left;
	}

']
	</style>
</head>
<body>	
	<h1>Bestiary</h1>

	<table style="width:calc(100% - 20px);margin:5px">
	<tr>
		<th class="col1">[r:macrolink("Name",    "tables/Creature Window@this", "", "sort=Name;dir="+dir     )]</th>
		<th class="col2">[r:macrolink("Type",    "tables/Creature Window@this", "", "sort=Type;dir="+dir     )]</th>
		<th class="col3">[r:macrolink("CR",      "tables/Creature Window@this", "", "sort=numericCR;dir="+dir)]</th>
		<th class="col4">[r:macrolink("Sources", "tables/Creature Window@this", "", "sort=Sources;dir="+dir  )]</th>
		<th class="col5">&nbsp</th>
	</tr>

	[r,foreach(fieldName, fields, ""),code:{
		[h:currentObj=json.get(jsonNPC,fieldName)]
		<tr>
			<td class="col1">
				[h:name=json.get(currentObj,"Name")]
				<!---------------------------CAPITALIZE----------------------------->
				[h:CapitalName=function.Capitalize(name)]
				[r:macroLink(CapitalName,"bestiary/Viewer Frame@this","",name)]
			</td>
			
			<td class="col2">[r:type=json.get(currentObj,"Type")]</td>
			<td class="col3">[r:challenge=json.get(currentObj,"CR")]</td>
			<td class="col4">[r:sources=json.get(currentObj,"Sources")]</td>
			<td class="col5">[r:macrolink("Make Token", "bestiary/Quick Monster@this", output, name)]</td>	
		</tr>
	}]
	</table>
</body>
</html>
}]