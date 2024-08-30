[h:BestiaryObj=getLibProperty("Bestiary","Lib:Compendium")]
[h:BestiaryNames=json.fields(BestiaryObj)]

[h:jsonNPC=json.fromList(BestiaryNames)]
[h,count(listcount(BestiaryNames),""),code:{
	[h:sortOBJ=""]
	[h:index=roll.count]

	[h:currentNPC=listget(BestiaryNames,roll.count)]
	[h:sortOBJ=json.set(sortOBJ,"Name",currentNPC)]

	[h:object=json.get(BestiaryObj,currentNPC)]
	
	[h:type=json.get(object,"type")]
	[h:sortOBJ=json.set(sortOBJ,"Type",type)]

	[h:cr=json.get(object,"challenge")]
	[h,if(cr==""):challenge="";challenge=substring(cr,0,indexOf(cr," "))]


	[h,if(matches(challenge,".*/.*")==1):numericCR=eval(challenge);numericCR=challenge]

	[h,if(isNumber(numericCR)==1):numericCR=numericCR+1000;numericCR=100]
	
	[h:sortOBJ=json.set(sortOBJ,"numericCR",numericCR)]
	[h:sortOBJ=json.set(sortOBJ,"CR",challenge)]

	[h:sources=json.toList(json.get(object,"sources"))]
	[h:sortOBJ=json.set(sortOBJ,"Sources",sources)]


	[h:jsonNPC=json.set(jsonNPC,index,sortOBJ)]

}]

[h:setLibProperty("Bestiary",jsonNPC,"Lib:Tables")]

[h,if(isDialogVisible("Bestiary")==1),code:{
[macro("tables/Creature Window@this"):""]
};{}]