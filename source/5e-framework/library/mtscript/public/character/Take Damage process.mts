[h:dmg=macro.args]

[h:outputPC=getLibProperty("PC Output", "Lib:Character")]
[h:outputGM=getLibProperty("GM Output", "Lib:Character")]

[h:output=if(isGM()==1,outputGM,outputPC)]

[h:idList=getSelected()]
[h:nameList=getSelectedNames()]

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:applyDMG=getStrProp(permissions,"applyDMG")]
[h,if(isGM()==0 && applyDMG==0):applyDMG=0;applyDMG=1]

[h,if(listcount(nameList)==0 || applyDMG==0),code:{


	[h,if(isGM()==0):idList=getTokens(",","{'pc':1,'owned':'self'}");idList=getTokens(",","{'propertyType':'NPC'}")]
	[h:names=""]
	[h,count(listcount(idList)):names=listappend(names,getName(listget(idList,roll.count)))]
	
	[h:inputValue="select|"+names+"|Target|list|value=string"]


};{
	[h:inputValue="var|Apply damage to "+nameList+"?||Label|span=true"]
}]

[h:res=input(inputValue,"dmg|"+dmg+"|Value|text|width=10","heal|Damage,Heal|Effect|radio","multiplier|normal damage,x2 damage,1/2 damage,1/4 damage|Multiplier|radio")]
[h:abort(res)]

[h,if(listcount(nameList)==0):idList=findToken(select)]
[h,if(listcount(nameList)==0):nameList=select]

[h:multiplier=if(multiplier==0,1,if(multiplier==1,2,if(multiplier==2,0.5,0.25)))]

[h:heal=if(heal==0,1,-1)]

[h:dmg=dmg*heal]

[h:dmgvalue=floor(dmg*multiplier)]

[r,count(listcount(idList),"<br>"),code:{
	[h:id=listget(idList,roll.count)]
	[h:tokenName=listget(nameList,roll.count)]
	[h:switchToken(id)]
	
	[r,if(isPC()==0),code:{

		
		
		[h:value=getProperty("Hit Points")]
		
		
		[h:current=listget(value,0,"/")]
		[h:total=listget(value,1,"/")]
		
		[h:current=if(current=="",0,current)]
		
		
		[h,if(current-dmgvalue<0):new=0;new=current-dmgvalue]
		[h,if(new>total):new=total]
		
		[h:value=new+"/"+total]
		
		
		
		[h:dmg=new-current]

		
		
		[r:if(dmg<0,"<font color=red><b>"+tokenName+"</b> received <b>"+number(dmg*-1)+"</b> damage",if(dmg==0,"<b>"+tokenName+"</b>","<font color=green><b>"+tokenName+"</b> recovered <b>"+dmg+"</b> HP"))]
		<br>
		[r,if(outputGM=="all" || isGM()==1):"Current HP: <b>"+new+"</b>/<b>"+total+"</b> ";""]
		
		
		[if(outputGM=="all" || isGM()==1),macro("HP Bar@Lib:Character"):"MaxLen=65;MaxValue="+total+";Value="+new+";Color=Green";"MaxLen=0;MaxValue="+total+";Value="+new+";Color=Green"]


		[r,if(getState("Concentration")==1 && dmg<0):"<font size=2>Concentration DC: <font color=red><b>"+if(floor(number((dmg*-1)/2))>10,floor(number((dmg*-1)/2)),10)+"</b> <font color=gray style='text-decoration:none'>"+macroLink("[roll con]","Maintain Concentration@Lib:Bestiary","","tokenName="+tokenName+";dmg="+number(dmg*-1))+"</font>";""]

		[h,if(new/total==1):barNPC=1]
		[h,if(new/total<1):barNPC=0.9]
		[h,if(new/total<0.5):barNPC=0.5]
		[h,if(new/total<0.1):barNPC=0.1]
		[h,if(new/total==0):barNPC=0]
		[h:setBar("Health",barNPC)]
		[h,if(new==total):setBarVisible("Health",0),setBarVisible("Health",1)]
		
		[h:setProperty("Hit Points",value)]
		
		
		[h,if(isFrameVisible(tokenName+" - Statblock")==1):evalMacro("[macro('Macro Frame@Lib:Bestiary'):tokenName]");""]
	
	};{
		
		[h:current=getLibProperty("Current Hit Points","Lib:"+tokenName)]
		[h:total=getLibProperty("Total Hit Points","Lib:"+tokenName)]
		[h:temp=getLibProperty("Temporary Hit Points","Lib:"+tokenName)]
		
		
		[h:tempInput=temp]
		[h:maxInput=total]
		[h:currentInput=current]

		[h,if(isNumber(tempInput)==0):tempInput=0;""]
		[h,if(isNumber(dmgvalue)==0):dmgvalue=0;""]
		[h,if(isNumber(maxInput)==0):maxInput=1;""]
		
		[h,if(dmgvalue<0):tempInput=tempInput;tempInput=tempInput-dmgvalue]
		
		[h,if(dmgvalue<0):effectiveDmg=dmgvalue*-1;effectiveDmg=if(tempInput>0,0,tempInput)]
		
		[h,if(dmgvalue<0):currentInput=currentInput+effectiveDmg;currentInput=if(tempInput<0,currentInput+tempInput,currentInput)]
		
		
		[h,if(dmgvalue<0):"";tempInput=if(tempInput<0,0,tempInput)]
		
		[h:currentInput=if(currentInput<0,0,currentInput)]
		[h:currentInput=if(currentInput>maxInput,maxInput,currentInput)]
		
		
		
		[r:if(effectiveDmg<0,"<font color=red><b>"+tokenName+"</b> received <b>"+number(effectiveDmg*-1)+"</b> damage",if(effectiveDmg==0,"<b>"+tokenName+"</b>","<font color=green><b>"+tokenName+"</b> recovered <b>"+effectiveDmg+"</b> HP"))]
		<br>
		Current HP: <b>[r:currentInput]</b>/<b>[r:maxInput]</b> [r:if(tempInput==0,"","(<b>"+tempInput+"</b>)")]
		
		
		[macro("HP Bar@Lib:Character"):"MaxLen=65;MaxValue="+maxInput+";Value="+currentInput+";Color=Green"]

		[r,if(getState("Concentration")==1 && effectiveDmg<0):"<font size=2>Concentration DC: <font color=red><b>"+if(floor(number((effectiveDmg*-1)/2))>10,floor(number((effectiveDmg*-1)/2)),10)+"</b> <font color=gray style='text-decoration:none'>"+macroLink("[roll con]","Maintain Concentration@Lib:Character","","tokenName="+tokenName+";dmg="+number(effectiveDmg*-1))+"</font>";""]
		
		

			[h:setBar("Health", currentInput/maxInput)]
			[h,if(currentInput==maxInput):setBarVisible("Health",0),setBarVisible("Health",1)]
		
		[h:setLibProperty("Current Hit Points",currentInput,"Lib:"+tokenName)]
		
		[h:setLibProperty("Temporary Hit Points",tempInput,"Lib:"+tokenName)]
		
		[h:setLibProperty("Total Hit Points",maxInput,"Lib:"+tokenName)]

		[h:setLibProperty("HP",currentInput+"/"+maxInput+if(tempInput<0," ("+tempInput+")",""),"Lib:"+tokenName)]

		[h:findId=findToken(tokenName)]

		[h,if(findId==""):"";setProperty("HP",currentInput+"/"+maxInput)]
		
		
		[h,if(isFrameVisible(tokenName+" - Character Sheet")==1):evalmacro("[macro('Macro Frame@Lib:Character'):'macro=Character Sheet;tokenName='+tokenName]");""]
		[h,if(isFrameVisible(tokenName+" - Statblock")==1):evalmacro("[macro('Macro Frame@Lib:Character'):'macro=Statblock;tokenName='+tokenName]");""]
	
	
	}]



}]



[h,if(isOverlayRegistered("Initiative")==1),code:{
[macro("Initiative Overlay@Lib:Overlay"):"output=all"]
};{}]