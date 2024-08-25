[h:value=getStrProp(macro.args,"value")]

[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:current=listget(value,0,"/")]
[h:total=listget(value,1,"/")]

[h:current=if(current=="",0,current)]

[h:res=input(
	"label|<html><table width=140><tr><td align=center><h3>NPC Hit Points</h3><hr noshade>||label|span=true",
	"damage||Damage|text|width=6",
	"label|<html><table width=140><tr><td align=center><hr noshade>||label|span=true",
	"new|"+current+"|Current|text|width=6",
	"total|"+total+"|Total|text|width=6")]
[h:abort(res)]

[h,if(new-damage<0):new=0;new=new-damage]
[h,if(new>total):new=total]

[h:value=new+"/"+total]



[h:dmg=new-current]


[r:if(dmg<0,"<font color=red><b>"+tokenName+"</b> received <b>"+number(dmg*-1)+"</b> damage",if(dmg==0,"<b>"+tokenName+"</b>","<font color=green><b>"+tokenName+"</b> recovered <b>"+dmg+"</b> HP"))]
<br>
Current HP: <b>[r:new]</b>/<b>[r:total]</b> 


[macro("HP Bar@Lib:Character"):"MaxLen=65;MaxValue="+total+";Value="+new+";Color=Green"]


[h,if(new/total==1):barNPC=1]
[h,if(new/total<1):barNPC=0.9]
[h,if(new/total<0.5):barNPC=0.5]
[h,if(new/total<0.1):barNPC=0.1]
[h,if(new/total==0):barNPC=0]
[h:setBar("Health",barNPC)]
[h,if(new==total):setBarVisible("Health",0),setBarVisible("Health",1)]


[h:setProperty("Hit Points",value)]

[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("Macro Frame@Lib:Bestiary"):tokenName]
};{}]

[h,if(isOverlayRegistered("Initiative")==1),code:{
[macro("Initiative Overlay@Lib:Overlay"):"output=all"]
};{}]

[h,if(isDialogVisible("Manage")==1),code:{
[h:pinName=getStrProp(macro.args,"pinName")]
[macro("Manage Encounter@Lib:Bestiary"):"tokenName="+pinName]
};{}]