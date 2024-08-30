[h:entry=decode(getStrProp(macro.args,"description"))]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:source=getStrProp(macro.args,"source")]
[h:name=getStrProp(macro.args,"name")]
[h:customName=getStrProp(macro.args,"customName")]
[h:jsonGroup=getStrProp(macro.args,"group")]


[h:output= function.getOutput())]
[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

<!-------------- FUNCTION ---------------->
[h:FunctionId=strfind(entry,"\\[(\\w*?):(.*?)\\]")]
[h,count(getFindCount(FunctionId)),code:{
	[h:entry=replace(entry,"\\[(\\w*?):(.*?)\\]","FUNCTIONPLACEHOLDER"+roll.count+1,1)]
}]

<!---------Fenced Code Block---------->
[h:CodeId=strfind(entry,"(?<=\\n\\n)```code([\\s\\S]*?)```(?=\\n\\n)")]
[h,count(getFindCount(CodeId)),code:{
	[h:group=getGroup(CodeId,roll.count+1,1)]
	[h:entry=replace(entry,"(?<=\\n\\n)```code([\\s\\S]*?)```(?=\\n\\n)","CODEBLOCKPLACEHOLDER"+roll.count+1,1)]
}]

<!---------Replace Pipe---------->
[h:entry=replace(entry,"\\\\\\|","&#124;")]

<!---------Underline---------->
[h:id=strfind(entry,"_(.*?)_")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"_(.*?)_","<u>"+group+"</u>",1)]
}]
<!---------Striketrough---------->
[h:id=strfind(entry,"~~(.*?)~~")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"~~(.*?)~~","<s>"+group+"</s>",1)]
}]

<!---------horizontal ruler---------->
[h:entry=replace(entry,"(?<=\\n|^)([-_*]{3,})(?=\\n|\$)","<hr noshade>")]

<!---------Code Block---------->
[h:id=strfind(entry,"(?<=\\n\\n|^)```([\\s\\S]*?)```(?=\\n\\n|\$)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(?<=\\n\\n|^)```([\\s\\S]*?)```(?=\\n\\n|\$)","<div>"+group+"</div>",1)]
}]


<!-------------- TABLE---------------->
[h:id=strfind(entry,"(\\|{1}[\\s\\S]*?\\|{1})(?=\\n{2}|\$)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,1)]
	
	[h:find=replace(find,"\\[","OPENBRACKETPLACEHOLDER")]
	[h:find=replace(find,"\\]","CLOSEBRACKETPLACEHOLDER")]
	
	[h:ColCount=strfind(find,"(\\|[\\s:]*-{3,}[\\s:]*)")]
	[h:Col=getFindCount(ColCount)]
	
	[h:alignStr=""]
	[h,count(Col),code:{
		[h:alignMD=getGroup(ColCount,roll.count+1,1)]
		[h:left=matches(alignMD,"\\|:.*")]
		[h:right=matches(alignMD,".*:")]
		[h:align=if(right==1,if(left==1,"center","right"),"left")]
		[h:alignStr=listAppend(alignStr,align)]
	}]


	[h:RowCount=strfind(find,"(\\|\\n\\s*\\|)")]
	
	[h:find=replace(find,"(\\|.*-{3,}:*)","")]
	[h,count(Col):find=replace(find,"(\\|)","<th align="+listget(alignStr,roll.count)+">",1)]
	[h:find=replace(find,"(\\|)","",1)]
	
	
	
	
	[h:class="odd"]
	[h:colalign=0]
	[h,count(getFindCount(RowCount),"<br><br>"),code:{
	
		[h:find=replace(find,"(\\|\\n\\s*\\|)","<tr"+if(class=="even",""," class=bg")+">
	<td align="+listget(alignStr,0)+">"
		,1)]
		[h:class=if(class=="odd","even","odd")]
		[h:colCount=if(Col<=0,0,Col-1))]
		[h,count(colCount):find=replace(find,"(\\|)","<td align="+listget(alignStr,roll.count+1)+">
",
		1)]
	}]
	

	
	[h:find="<table><tr>
"+find+"</table>"]
	[h:find=replace(find,"<td align=\\w*?>
</table>","</table>")]
	
	[h:find=replace(find,"OPENBRACKETPLACEHOLDER","&#91;")]
	[h:find=replace(find,"CLOSEBRACKETPLACEHOLDER","&#93;")]
	
	[h:entry=replace(entry,"(\\|{1}[\\s\\S]*?\\|{1})(?=\\n{2}|\$)",find,1)]
}]

[h:entry=replace(entry,"&#91;","[")]
[h:entry=replace(entry,"&#93;","]")]
[h:entry=replace(entry,"&#40;","\\(")]
[h:entry=replace(entry,"&#41;","\\)")]
<!---------Roll---------->
[h:rollId=strfind(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+'\\([Rr][Oo][Ll]{2}\\s"(.*?)"\\)')]
[h,count(getFindCount(rollId)),code:{
	
	[h:entry=replace(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+'\\([Rr][Oo][Ll]{2}\\s"(.*?)"\\)',"ROLLPLACEHOLDER"+roll.count+1,1)]
}]


[h:entry=replace(entry,"\\+","PLUSPLACEHOLDER")]
<!---------To Hit---------->	
[h:hitId=strfind(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+'\\([Tt][Oo]\\s*[Hh][Ii][Tt]\\s"(.*?)"\\)')]
[h,count(getFindCount(hitId)),code:{
	
	[h:entry=replace(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+'\\([Tt][Oo]\\s*[Hh][Ii][Tt]\\s"(.*?)"\\)',"TOHITPLACEHOLDER"+roll.count+1,1)]
}]

<!---------Internal Links---------->
[h:entry=function.internalLink(entry,TokenName)]


<!---------Image---------->

[h:id=strfind(entry,"!\\[(.*?)\\]\\((.*?)=?(\\d*)\\)")]
[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group2=if(matches(group2,"image:.*")==0,group2,getImage(group2))]


	
	[h:entry=replace(entry,"!\\[(.*?)\\]\\((.*?)=?(\\d*)\\)","<img src='"+group2+"' "+if(group1=="","","alt='"+group1+"'")+" width='"+group3+"'>",1)]
}]
<!---------Link---------->

[h:id=strfind(entry,"(?<!!)\\[(.*?)\\]\\((.*?)\\)")]
[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group2=replace(group2,"<u>","_")]
	[h:group2=replace(group2,"</u>","_")]

	[h,if(matches(group2,".*share=?\\d*\$")==1),code:{
		[h:size=replace(group2,"share","")]
		[h:imgSize=replace(group1,"width='?\\d*'","width"+size)]
		[h:group2=macroLinkText("character/Share@this","","share=1;description="+imgSize)]
	}]
	
	[h:entry=replace(entry,"(?<!!)\\[(.*?)\\]\\((.*?)\\)","<a href='"+group2+"' >"+group1+"</a>",1)]
}]


<!-------------- Task List ---------------->
[h:id=strfind(entry,"-\\s\\[([\\sx])\\]\\s(.*)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	
	[h:checked=if(matches(group1,".*x.*")==1," checked","")]
	
	[h:entry=replace(entry,"-\\s\\[([\\sx])\\]\\s(.*)","<br><input type=checkbox"+checked+"> "+group2,1)]
}]



[h:id=strfind(entry,"((?:\\n\\n|^|(?<=\\n)>\\n)(?!<h\\d>|<[ou]l>|<div|<hr|<blockquote|<table|CODEBLOCKPLACEHOLDER)[\\s\\S]*?)(?=\\n\\n|\$|\\n>)")]
[h,count(getFindCount(id),"<hr>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
}]


[h:display=getLibProperty("Display","Lib:Campaign")]
[h:replaceDiceRoll=getStrProp(display,"replaceDiceRoll")]
[h,if(replaceDiceRoll==1),code:{
[h:entry=function.DiceRoll(entry,tokenName,output,"character",jsonGroup,name,customName)]
};{}]

<!---------Replace Roll---------->

[h:id=findToken(tokenName)]
[h,if(id==""):owners="";owners=getOwners()]

[h:classes=getLibProperty("Class&Level","Lib:"+tokenName)]
[h,if(owners==""):totalLevel=0;totalLevel=getLibProperty("TotalLevel","Lib:"+tokenName)]

[h,if(isNumber(totalLevel)==0):totalLevel=0]

[h:profBonus=ceil(totalLevel/4)+1]

[h,if(json.type(classes)=="UNKNOWN"):class="";class=json.get(classes,source)]
[h,if(json.type(class)=="UNKNOWN"):spell="spell";spell=json.get(class,"spellcasting")]


[h,if(spell=="spell" || spell=="" || spell=="-"),code:{
	[h:spell="spell"]
	[h:spellbonus=""]

};{

	[h:spell=lower(substring(spell,0,3))]
	[h:spells=getLibProperty("Spells","Lib:"+tokenName)]
	[h:currentSpell=json.get(spells,name)]
	[h:customAtr=json.get(currentSpell,"customAtr")]
	[h:spellbonus=json.get(currentSpell,"bonusDmg")]
	[h:json.get(currentSpell,"level")]

	[h,if(customAtr==0 || customAtr==""):"";spell=lower(substring(customAtr,0,3))]

}]

[h,if(jsonGroup=="Equipment" || jsonGroup=="Cantrips" || jsonGroup=="Spells" || matches(jsonGroup,"Level.*")==1):obj=getLibProperty(jsonGroup,"Lib:"+tokenName);obj=""]



[h,if(json.type(obj)!="UNKNOWN" || jsonGroup=="Equipment" || jsonGroup=="Cantrips" || jsonGroup=="Spells" || matches(jsonGroup,"Level.*")==1),code:{

	[h,if(tokenName!="Lib:Character" && json.type(obj)!="UNKNOWN"):object=json.get(obj,name);object=""]
	[h,if(tokenName!="Lib:Character" && json.type(object)!="UNKNOWN"):bonusDmg=json.get(object,"bonusDmg");bonusDmg=""]
	[h,if(tokenName!="Lib:Character"):bonusDmg=if(bonusDmg=="",0,bonusDmg);bonusDmg=""]

	[h,if(tokenName!="Lib:Character" && json.type(object)!="UNKNOWN"):customAtr=json.get(object,"customAtr");customAtr=""]
	[h,if(customAtr==0 || customAtr==""):"";spell=lower(substring(customAtr,0,3))]
	
};{

	[h:bonusDmg=""]

}]



[h:id=strfind(entry,"ROLLPLACEHOLDER\\d+")]

[h:levelId=strfind(entry,"(?<=[Aa]t [Hh]igher [Ll]evels.*)ROLLPLACEHOLDER\\d+")]
[h:allRolls=getFindCount(id)]
[h:levelRolls=getFindCount(levelId)]
[h:levelRolls=allRolls-levelRolls]

[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(rollId,roll.count+1,1)]
	[h:group2=getGroup(rollId,roll.count+1,2)]

	[h:group2=replace(group2,"\\s","")]

	[h:group2=replace(group2,"prof",profBonus)]
	
	[h:group2=replace(group2,"spell",spell)+if(bonusDmg=="" || bonusDmg==0,"","+"+bonusDmg)]
	[h:entry=replace(entry,"ROLLPLACEHOLDER\\d+","<span title='roll: "+group2+"'>"+macroLink(group1,"character/Dice Roller@this","","text="+group1+";value="+group2+";tokenName="+tokenName+";group="+jsonGroup+";name="+name+";customName="+customName)+"</span>",1)]
}]


<!---------Replace To Hit---------->

[h:id=strfind(entry,"TOHITPLACEHOLDER\\d+")]

[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(hitId,roll.count+1,1)]
	[h:group2=getGroup(hitId,roll.count+1,2)]

	[h:group2=replace(group2,"\\s","")]

	[h:text=replace(tokenName,"<a.*?>","")]
	[h:text=replace(text,".</a>","")]

	[h:entry=replace(entry,"TOHITPLACEHOLDER\\d+","<span title='to hit: "+group2+"'>"+macroLink(group1,"character/d20 Roller@this","","text="+text+";value=("+if(group2<0,group2,"+"+group2)+");tokenName="+tokenName+";color=red")+"</span>",1)]
}]
[h:entry=replace(entry,"PLUSPLACEHOLDER","+")]

[h:entry=markdownToHTML(entry)]

<!---------Fenced Code Block---------->
[h:id=strfind(entry,"..CODEBLOCKPLACEHOLDER\\d+")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(CodeId,roll.count+1,1)]
	[h:entry=replace(entry,"..CODEBLOCKPLACEHOLDER\\d+","<pre><code>"+group+"</code></pre>",1)]
}]

[h:id=strfind(entry,"FUNCTIONPLACEHOLDER\\d+")]
[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(FunctionId,roll.count+1,1)]
	[h:group2=getGroup(FunctionId,roll.count+1,2)]
	[h:group2=eval(group2)]
	[h:entry=replace(entry,"FUNCTIONPLACEHOLDER\\d+",if(group1=="r",group2,""),1)]
}]


[r:entry]
