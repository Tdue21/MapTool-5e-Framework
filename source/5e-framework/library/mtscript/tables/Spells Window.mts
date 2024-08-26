[h:output=getStrProp(macro.args,"output")]
[h:class=getStrProp(macro.args,"class")]
[h,if(output=="change"),code:{

	[h:spellLists=getLibProperty("Spell Lists",function.getNamespace())]
	[h:spellLists=listsort(spellLists,"A")]
	
	[h:res=input("macro.args|"+spellLists+"|Choose Class|List|value=string select="+listfind(spellLists,class))]
	[h:abort(res)]
};{}]

[dialog5("Spells", "width=780; height=600; temporary=1; noframe=0; input=1"):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">
</head>
<body>
	[r,if(isGM()==1),code:{
	
		<p bgcolor=white style="border-bottom: 1px solid gray;padding:0px;margin:0px;font-family:sans;font-size:10px">
		
		[r:macroLink("Spells by level","character-creation/Change Spells@this","",macro.args)+" &nbsp;"]
		[r:macroLink("Spellcasting classes","campaign/Settings@this","","Spells")+" &nbsp;"]
		[r:macroLink("Class","tables/Spells Window@this","","output=change;class="+macro.args)+" &nbsp;"]

		</p>
	};{}]
	
	[macro("tables/Spell Lists@this"):macro.args]
</body>
</html>	
}]