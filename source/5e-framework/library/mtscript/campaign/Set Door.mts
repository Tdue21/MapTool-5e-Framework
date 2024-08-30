[h:id=getSelected()]
[h:id=listget(id,0)]
[h,if(id==""):abort(0)]
[h:tokenName=getName(id)]
[h:switchToken(id)]

<!-----------------CONFIRM------------------->
[h:res=input("var|Set "+tokenName+"'s token as a door?||label|span=true")]
[h:abort(res)]

<!-----------------MACROS------------------->
[h:setPropertyType("Object")]
[h:setProperty("Rotation",90)]
[h:setProperty("Direction","CW")]
[h:setProperty("Status","Closed")]
[h:macroList=getMacros()]

[h:setTokenFacing(270)]

[h,if(listfind(macroList,"Interact")<0):createMacro("Interact",
'
	[h,if(macro.args==""):doorId=findToken(token.name);doorId=macro.args]
	[h:angle=getTokenFacing()]
	[h:stat=getProperty("Status")]
	[h:dir=getProperty("Direction")]
	[h:Rotation=getProperty("Rotation")]
	[h:dir=if(dir=="CW",Rotation*-1,Rotation)]
	[h:angle=if(stat=="Closed",angle+dir,angle-dir)]
	[h:bDoor=matches(getName(doorId),".*_b")]
	[h,if(stat=="Locked" && bDoor!=1),code:{
		[h:doorClipURL=getLibProperty("Door","Lib:Campaign")]
		[h:audioByte=macroLinkText("campaign/playClip@this","self",doorClipURL)]
		[h:execLink(audioByte,0,"all")]
		[h:broadcast("Locked.","self")]
	};{}]
	[h,if(stat=="Locked"):"";setProperty("Status",if(stat=="Closed","Open","Closed"),doorId)]
	[h,if(stat=="Locked"):"";setTokenFacing(angle,doorId)]
'
, "minWidth=120;color=teal;fontColor=white;playerEditable=0")]

[h,if(listfind(macroList,"Direction")<0):createMacro("Direction",
'
	[h:dir=getProperty("Direction")]
	[h:setProperty("Direction",if(dir=="CW","CCW","CW"))]
	[h:broadcast(token.name+" now opens "+if(dir=="CW","counterclockwise.","clockwise."),"self")]
'
, "minWidth=120;group=Setup;playerEditable=0")]

[h,if(listfind(macroList,"LockUnlock")<0):createMacro("LockUnlock",
'
	[h:stat=getProperty("Status")]
	[h:setProperty("Status",if(stat=="Locked","Closed","Locked"))]
	[h:broadcast(token.name+" is now "+if(stat=="Closed","locked.","unlocked."),"self")]
'
, "minWidth=120;group=Setup;playerEditable=0")]

[h,if(listfind(macroList,"OpenClose")<0):createMacro("OpenClose",
'
	[h:angle=getTokenFacing()]
	[h:stat=getProperty("Status")]
	[h:dir=getProperty("Direction")]
	[h:Rotation=getProperty("Rotation")]
	[h:dir=if(dir=="CW",Rotation*-1,Rotation)]
	[h:angle=if(stat=="Closed",angle+dir,angle-dir)]
	[h:setProperty("Status",if(stat=="Closed","Open","Closed"))]
	[h:setTokenFacing(angle)]
	[h:broadcast(token.name+" is now "+if(stat=="Closed","open.","closed."),"self")]
'
, "minWidth=120;group=Setup;playerEditable=0")]

[h,if(listfind(macroList,"OpeningAngle")<0):createMacro("OpeningAngle",
'
	[h:Rotation=getProperty("Rotation")]
	[h:res=input("Rotation|"+Rotation)]
	[h:abort(res)]
	[h:setProperty("Rotation",Rotation)]
'
, "minWidth=120;group=Setup;playerEditable=0")]

[h,if(listfind(macroList,"Selected as Pair")<0):createMacro("Selected as Pair",
'
	[h:list=getSelected()]
	[h:res=input("name|"+getName(listget(list,0))+"|Pair Name")]
	[h:abort(res)]
	[h:setName(name+"_a",listget(list,0))]
	[h:setName(name+"_b",listget(list,1))]

'
, "minWidth=120;group=Setup;playerEditable=0")]


[h:setLayer("Object")]