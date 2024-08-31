[h:group=getStrProp(macro.args,"group")]
[h:name=getStrProp(macro.args,"name")]

[name=lower(name)]


[h,if(group=="Equipment"),code:{

	[h:PropertyObj=getLibProperty("Equipment", function.getNamespace())]
	[h:equipObj=json.get(PropertyObj,name)]
	[h,if(json.type(equipObj)=="UNKNOWN"):description="";description=json.get(equipObj,"description")]

	[h:index=indexOf(description,"---")]
	
	[h,if(index==-1):"";description=substring(description,0,index)]

	[h:isWeapon=""]
	[h:weight=""]

	[h:id=strfind(description,"(?:[Mm]artial|[Mm]elee|[Ss]imple|[Rr]anged)\\s([Ww]eapon)|(\\d*\\.?\\d+)\\slbs?\\.?")]
	[h,if(getFindCount(id)>=1),count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
		[h,if(group1==""):"";isWeapon=group1]
		[h,if(group2==""):"";weight=group2]
	};{}]

	[h:EquipInfo="isWeapon="+if(isWeapon=="",0,1)+";weight="+weight]
};{
	[h:EquipInfo=""]
}]
[h:macro.return=EquipInfo]