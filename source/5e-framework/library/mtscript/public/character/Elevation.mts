[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:elev=getStrProp(macro.args,"elevation")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:currentElevation=getProperty("Elevation")]

[h:elev=currentElevation+elev*5]

[h:setProperty("Elevation",elev)]

[h:display=getLibProperty("Display","Lib:Campaign")]
[h:ElevScale=getStrProp(display,"ElevScale")]

[h:scale=ElevScale]
[h,if(elev==0),code:{

	[h:setBarVisible("Elev+",0)]
	[h:setBarVisible("Elev-",0)]


};{

	[h,if(elev>0),code:{
	
		[h:setBarVisible("Elev+",1)]
		[h:setBarVisible("Elev-",0)]
		[h:setBar("Elev+",elev/scale)]
	
	};{
	
		[h:setBarVisible("Elev+",0)]
		[h:setBarVisible("Elev-",1)]
		[h:setBar("Elev-",1-elev/scale*-1)]
	}]

}]


