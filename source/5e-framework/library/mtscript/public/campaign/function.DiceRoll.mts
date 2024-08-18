[h:args=argCount()]
[h:entry=arg(0)]
[h:tokenName=arg(1)]
[h:output=arg(2)]
[h:lib=arg(3)]


[h,if(args>4):group=arg(4);group=""]
[h,if(args>5):name=arg(5);name=""]
[h,if(args>6):customName=arg(6);customName=""]



[h:entry=replace(entry,"PLUSPLACEHOLDER","+")]
<!---------Automatic Replace Roll---------->
[h:id=strfind(entry,"(?<!\\w)(\\d+d+\\d[d0-9+\\- ]*)(?!\\w)|(([+-]\\d+) to hit)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group1=replace(group1,"d","DICEPLACEHOLDER")]
	[h:group1NoSpace=replace(group1," ","")]
	[h,if(group1==""):
	entry=replace(entry,"(([+-]\\d+) to hit)",
	"<span title='to hit: "+group3+"'>"+
	macroLink(if(group3>0,"PLUSPLACEHOLDER","")+group3,"d20 Roller@"+lib,output,"text="+tokenName+";value=("+group3+");tokenName="+tokenName+";color=red")+"</span> to hit",1)
	;
	entry=replace(entry,"(?<!\\w)(\\d+d+\\d[d0-9+\\- ]*)(?!\\w)",
	"<span title='roll: "+group1NoSpace+"'>"+
	macroLink(group1,lib + "/Dice Roller@this","","text="+tokenName+" "+group1NoSpace+";value="+group1NoSpace+";tokenName="+tokenName+";group="+group+";name="+name+";customName="+customName)+"</span>",1)]
}]

[h:entry=replace(entry,"DICEPLACEHOLDER","d")]
[r:entry]
[h:entry=replace(entry,"\\+","PLUSPLACEHOLDER")]