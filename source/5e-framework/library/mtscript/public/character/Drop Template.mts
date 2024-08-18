[h:tokenName=macro.args]

[h,if(findToken("Spell "+tokenName)==""),code:{

	[h:id=findToken("Spell","00.DM")]
	[h:center=getViewCenter(0,";")]
	[h:xCoord=getStrProp(center,"centerX")]
	[h:yCoord=getStrProp(center,"centerY")]
	[h:newId=copyToken(id,1,"00.DM","{'name':'Spell "+tokenName+"','x':"+xCoord+",'y':"+yCoord+"}")]

};{


	[h:id=findToken("Spell "+tokenName)]
	[h:center=getViewCenter(0,";")]
	[h:xCoord=getStrProp(center,"centerX")]
	[h:yCoord=getStrProp(center,"centerY")]

	[h:moveToken(xCoord,yCoord,0,id)]
	
}]
