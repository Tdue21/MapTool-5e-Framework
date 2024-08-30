[h:route=json.get(macro.args,"route")]

[h,if(route=="Level Up"):ItemList="WelcomeUP,CharacterUP,ClassUP,SubclassUP,DetailsUP,ReviewUP";ItemList="Welcome,Setup,Abilities,Race,Background,Class,Subclass,Details,Review"]



[h,if(json.get(macro.args,"window")==""),code:{

	[h:window=if(route=="Level Up","WelcomeUP","Welcome")]
	[h:next=0]
	[h:window=listget(ItemList,(listfind(ItemList,window)+next))]
	
};{

	[h:window=json.get(macro.args,"window")]
	[h:submit=json.get(macro.args,"submit")]
	[h:next=if(submit=="Next >" || submit=="Skip",1,-1)]
	[h:abort(if(submit==" Close ",0,1))]
	[h:abort(if(submit==" Finish ",0,1))]
	[h:window=listget(ItemList,(listfind(ItemList,window)+next))]
}]







[dialog5("Character Creation Wizard","width=650; height=525; temporary=0; input=1; noframe=0"): {

<body bgcolor=#FFFFFF>

	<table style="width: 100%;height: 100%;">
	<tr><td rowspan=2 height=472 width=140 valign=top align=right bgcolor=#7682FF style="padding:15px; color: white; font-size: 12px">
	<br>
	
[r,count(listcount(ItemList),"<br>"),code:{

	[h:currentItem=listget(ItemList,roll.count)]
	[r:if(currentItem==window,"<b>","")]
	[r:replace(currentItem,"UP\$","")]
	[r:if(currentItem==window,"</b>","")]

}]
	
	<td valign=top style="padding:0px;margin:0px;margin-left:10px">


[macro(window+"character Creation/@this"):macro.args]




	
	</table>
	



}]


