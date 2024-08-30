[h:group=getStrProp(macro.args,"group")]
[h:name=getStrProp(macro.args,"name")]


[name=lower(name)]

[h,if(group=="Spells"),code:{

	[h:PropertyObj=getLibProperty("Spells", function.getNamespace())]
	[h:spellObj=json.get(PropertyObj,name)]
	[h:description=json.get(spellObj,"description")]

	[h:description=substring(description,0,if(length(description)<25,length(description),25))]

	[h:id=strfind(description,"(\\d)\\w{2}-level|([Cc]antrip)")]
	[h,if(getFindCount(id)>=1),code:{
		[h:group1=getGroup(id,1,1)]
		[h:group2=getGroup(id,1,2)]
		[h,if(matches(group2,"[Cc]antrip")==1):level=0;level=group1]
	};{}]

};{
	[h:level=""]
}]
[h:macro.return=level]