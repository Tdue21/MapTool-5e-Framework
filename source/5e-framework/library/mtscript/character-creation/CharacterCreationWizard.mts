[h:route=json.get(macro.args,"route")]

[h,if(route=="Level Up")
	:ItemList="WelcomeUP,CharacterUP,ClassUP,SubclassUP,DetailsUP,ReviewUP"
	;ItemList="Welcome,Setup,Abilities,Race,Background,Class,Subclass,Details,Review"]

[h,if(json.get(macro.args,"window")==""),code:{
	[h:window=if(route=="Level Up","WelcomeUP","Welcome")]
	[h:next=0]
	[h:window=listget(ItemList,(listfind(ItemList,window)+next))]
};{
	[h:window=json.get(macro.args,"window")]
	[h:submit=json.get(macro.args,"submit")]
	[h:next=if(submit=="Next" || submit=="Skip",1,-1)]
	[h:abort(if(submit=="Close",0,1))]
	[h:abort(if(submit=="Finish",0,1))]
	[h:window=listget(ItemList,(listfind(ItemList,window)+next))]
}]

[dialog5("Character Creation Wizard","width=700; height=600; temporary=1; input=1; noframe=0"): {
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('wizard')]">
</head>
<body>

	<div class="menu">
		[r, foreach(currentItem, ItemList, ""), code: {
		<span>
			[r:if(currentItem == window, "<b>", "")]
			[r:replace(currentItem,"UP\$","")]
			[r:if(currentItem == window, "</b>", "")]
		</span>
		}]
	</div>
    
	<div class="body">
		[h: processorLink=macroLinkText("character-creation/CharacterCreationWizard@this","")]
		<form action="[r:processorLink]" method="json">
			[macro("character-creation/" + window + "@this"):macro.args]
		</form>
	</div>

</body>
</html>
}]


