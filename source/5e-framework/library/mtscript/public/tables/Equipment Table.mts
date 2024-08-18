[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:viewMagicItems=getStrProp(permissions,"viewMagicItems")]

[h,if(macro.args==""),code:{
	
	[h:res=input("equip|Weapons,Armor,Adventuring Gear,Equipment Packs,Tools,Mounts,Other"+if(isGM()==0 && viewMagicItems==0,"",",Magic Items")+"|Class|list|value=string")]
	[h:abort(res)]
};{

	[h:equip=macro.args]

}]



[dialog("Equipment", "width=750; height=600; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="D&D@Lib:Campaign">

<title>[r:equip]</title>

<p bgcolor=white style="border-bottom: 1px solid gray;padding:0px;margin:0px;font-family:sans;font-size:10px">

[r:macroLink("Weapons","Equipment Table@Lib:Tables","","Weapons")+" &nbsp;"]
[r:macroLink("Armor","Equipment Table@Lib:Tables","","Armor")+" &nbsp;"]
[r:macroLink("Adventuring Gear","Equipment Table@Lib:Tables","","Adventuring Gear")+" &nbsp;"]
[r:macroLink("Equipment Packs","Equipment Table@Lib:Tables","","Equipment Packs")+" &nbsp;"]
[r:macroLink("Tools","Equipment Table@Lib:Tables","","Tools")+" &nbsp;"]
[r:macroLink("Mounts & Vehicles","Equipment Table@Lib:Tables","","Mounts")+" &nbsp;"]
[r:macroLink("Other","Equipment Table@Lib:Tables","","Other")+" &nbsp;"]
[r,if(isGM()==0 && viewMagicItems==0):"";macroLink("Magic Items","Equipment Table@Lib:Tables","","Magic Items")+" &nbsp;"]

</p>




[macro(equip+"@Lib:Tables"):""]


}]