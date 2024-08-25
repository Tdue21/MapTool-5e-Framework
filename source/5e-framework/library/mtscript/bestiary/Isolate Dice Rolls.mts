[h:entry=decode(getStrProp(macro.args,"value"))]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:entry=markdownToHtml(entry)]

[h:entry=replace(entry,'"',"")]
[h:entry=replace(entry,"'","")]



[h:value=""]

[h:id=strfind(entry,"([\\w\\s]*?)\\..*?([+-]\\d+).*? to hit.*?(?<!\\w)(\\d+d+[d0-9+\\- ]*).*?\\s(\\w*)\\sdamage")]
[h:repeat=if(getFindCount(id)>1,1,getFindCount(id))]
[h,count(repeat),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group4=getGroup(id,roll.count+1,4)]
	[h:group2=replace(group2,"d","DICEPLACEHOLDER")]
	[h:group3=replace(group3," ","")]


	
	[h,if(group1==""):"";value=value+"<span title='<html><table width=500><tr><td>"+entry+"</table></html>'>"+macroLink(if(group2>0,"PLUSPLACEHOLDER","")+group2,"d20 Roller@Lib:Bestiary","","text="+tokenName+";value=("+group2+");tokenName="+tokenName+";color=red")+"</span>"]

	[h,if(group3==""):"";value=value+"<td align=center><span title='"+group1+": "+group3+" "+group4+"'>"+
	macroLink(group3,"Dice Roller@Lib:Bestiary","","text="+tokenName+" "+group3+";value="+group3+";tokenName="+tokenName)+"</span> "]
	

		[h,if(roll.count==getFindCount(id)-1):"";value=value+"<br>"]
	
}]
[h:value=replace(value,"DICEPLACEHOLDER","d")]
[h:value=replace(value,"PLUSPLACEHOLDER","+")]
[r:value]