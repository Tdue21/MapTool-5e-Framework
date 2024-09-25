[h:permissions=getLibProperty("PlayerPermission", function.getNamespace())]
[h:viewMagicItems=getStrProp(permissions,"viewMagicItems")]

[h,if(macro.args==""),code:{
	
	[h:res=input("equip|Weapons,Armor,Adventuring Gear,Equipment Packs,Tools,Mounts,Other"+if(isGM()==0 && viewMagicItems==0,"",",Magic Items")+"|Class|list|value=string")]
	[h:abort(res)]
};{

	[h:equip=macro.args]

}]



[dialog5("Equipment", "width=750; height=600; temporary=1; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="[r:function.getCss('D&D')]">

<title>[r:equip]</title>

<p bgcolor=white style="border-bottom: 1px solid gray;padding:0px;margin:0px;font-family:sans;font-size:10px">

[r:macrolink("Weapons", "tables/Equipment Table@this", "","Weapons")+" &nbsp;"]
[r:macrolink("Armor", "tables/Equipment Table@this", "","Armor")+" &nbsp;"]
[r:macrolink("Adventuring Gear", "tables/Equipment Table@this", "","Adventuring Gear")+" &nbsp;"]
[r:macrolink("Equipment Packs", "tables/Equipment Table@this", "","Equipment Packs")+" &nbsp;"]
[r:macrolink("Tools", "tables/Equipment Table@this", "","Tools")+" &nbsp;"]
[r:macrolink("Mounts & Vehicles", "tables/Equipment Table@this", "","Mounts")+" &nbsp;"]
[r:macrolink("Other", "tables/Equipment Table@this", "","Other")+" &nbsp;"]
[r,if(isGM()==0 && viewMagicItems==0):"";macrolink("Magic Items", "tables/Equipment Table@this", "","Magic Items")+" &nbsp;"]

</p>




[macro(equip+"tables/@this"):""]


}]