[h:initiativeList=getInitiativeList()]

[h:tokens=json.get(initiativeList,"tokens")]

[h:fields=json.fields(tokens)]
[r,count(listcount(fields),""),code:{
	[h:currentJson=json.get(tokens,roll.count)]
	[h:id=json.get(currentJson,"tokenId")]

	[h:switchToken(id)]

	[h:initiative=json.get(currentJson,"initiative")]

	[r,if(isPC()==1),code:{
		[h:dex=getProperty("Dexterity")]
		[h:value=getStrProp(dex,"value")]
		[h,if(isNumber(value)==1 || value==""):value;value=eval(value)]
		[h,if(value==""):mod=0;mod=floor(number(eval(string(value)))/2-5)]
	};{
		[h:object=getProperty("stats")]
		[h:dex=json.get(object,"dex")]
		[h,if(isNumber(dex)==1):mod=floor(dex/2-5);mod=-5]
	}]

	[h:roll=1d20]
	[h:roll=roll+mod]

	[h:setInitiative(roll)]
	[h:sortInitiative()]

}]

