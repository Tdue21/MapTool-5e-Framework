[h:output=getStrProp(macro.args,"output")]
[h:class=getStrProp(macro.args,"class")]
[h,if(output=="change"),code:{

	[h:spellLists=getLibProperty("Spell Lists","Lib:Character Creation")]

	[h:spellLists=listsort(spellLists,"A")]
	
	[h:res=input("macro.args|"+spellLists+"|Choose Class|List|value=string select="+listfind(spellLists,class))]
	[h:abort(res)]

};{


}]

[dialog("Spells", "width=780; height=600; temporary=1; noframe=0; input=1"):{

	<link rel="stylesheet" type="text/css" href="D&D@Lib:Campaign">
	
	[r,if(isGM()==1),code:{
	
		<p bgcolor=white style="border-bottom: 1px solid gray;padding:0px;margin:0px;font-family:sans;font-size:10px">
		
		[r:macroLink("Spells by level","Change Spells@Lib:Character Creation","",macro.args)+" &nbsp;"]
		[r:macroLink("Spellcasting classes","Settings@Lib:Campaign","","Spells")+" &nbsp;"]
		[r:macroLink("Class","Spells Window@Lib:Tables","","output=change;class="+macro.args)+" &nbsp;"]

		</p>
	};{}]


	
	[macro("Spell Lists@Lib:Tables"):macro.args]
	
	


}]