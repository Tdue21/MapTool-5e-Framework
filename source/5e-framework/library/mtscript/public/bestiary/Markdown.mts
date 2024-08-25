[h:entry=decode(getStrProp(macro.args,"description"))]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:link=getStrProp(macro.args,"link")]
[h:name=getStrProp(macro.args,"name")]
[h:jsonGroup=getStrProp(macro.args,"group")]

[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:output= function.getOutput())]

[h:entry=replace(entry,"SEMICOLONPLACEHOLDER",";")]

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
	

	
	[h:entry=replace(entry,"(\\|{1}[\\s\\S]*?\\|{1})(?=\\n{2}|\$)",find,1)]
}]


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
		[h:group2=macroLinkText("Share@Lib:Character","","share=1;description="+imgSize)]
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


[h:display=getLibProperty("Display","Lib:Campaign")]
[h:replaceDiceRoll=getStrProp(display,"replaceDiceRoll")]
[h,if(replaceDiceRoll==1),code:{
[h:entry=function.DiceRoll(entry,tokenName,output,"campaign")]
};{}]


[h:replaceSpellList=getStrProp(display,"replaceSpellList")]

[h,if(replaceSpellList==1):entry=replace(entry,"\\(","&#40;")]
[h,if(replaceSpellList==1):entry=replace(entry,"\\)","&#41;")]

<!---------Automatic Replace NPC Spells---------->
[h:id=strfind(entry,"(?<=[Aa]t\\s[Ww]ill:|[Ee]ach:|[Ss]lots?&#41;:|[Aa]t\\s[Ww]ill&#41;:)(.*)")]
[h:countValue=0]
[h,if(replaceSpellList==1),count(getFindCount(id)),code:{
	[h:group1=getGroup(id,countValue+1,1)]
	[h:ReplaceGroup=group1]
	[h:countValue=countValue+1]
	
	[h,count(listcount(group1)),code:{
		[h:currentSpell=listget(group1,roll.count)]
		[h:idSpell=strfind(currentSpell,"(.*)(&#40;.*)|(.*)")]
		[h,if(getGroup(idSpell,1,1)==""):name=getGroup(idSpell,1,3);name=getGroup(idSpell,1,1)]
		[h:text=getGroup(idSpell,1,2)]
		
		[h:objLink='<span title="Spell: '+lower(name)+'">' +macroLink(name,"Args Dialog@Lib:Bestiary","","prop=Spells;source=;name="+lower(name)+";description=;tokenName="+tokenName)+"</span>"+text]
		[h:entry=replace(entry,currentSpell,objLink,1)]
	}]
	
	
};{}]
[h,if(replaceSpellList==1):entry=replace(entry,"&#40;","\\(")]
[h,if(replaceSpellList==1):entry=replace(entry,"&#41;","\\)")]

[h:id=strfind(entry,"((?:\\n\\n|^|(?<=\\n)>\\n)(?!<h\\d>|<[ou]l>|<div|<hr|<blockquote|<table|CODEBLOCKPLACEHOLDER)[\\s\\S]*?)(?=\\n\\n|\$|\\n>)")]
[h,count(getFindCount(id),"<hr>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
}]



[h,if(currentToken()==""):object=json.get(getLibProperty("Bestiary","Lib:Compendium"),lower(tokenName));object=getProperty("Stats")]
[h:settings=json.get(object,"settings")]
[h:settings=decode(settings))]
[h:spell=getStrProp(settings,"spellcasting")]

[h:spell=json.get(object,spell)]
[h,if(isNumber(spell)==1):spell=floor(spell/2-5);spell=-5]

<!---------Replace Roll---------->

[h:id=strfind(entry,"ROLLPLACEHOLDER\\d+")]


[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(rollId,roll.count+1,1)]
	[h:group2=getGroup(rollId,roll.count+1,2)]

	[h:group2=replace(group2,"\\s","")]
	[h:group2=replace(group2,"spell",spell)]

	[h:entry=replace(entry,"ROLLPLACEHOLDER\\d+","<span title='roll: "+group2+"'>"+macroLink(group1,"Dice Roller@Lib:Bestiary","","text="+group1+";value="+group2+";tokenName="+tokenName+";group="+jsonGroup+";name="+name)+"</span>",1)]
}]



<!---------Replace To Hit---------->

[h:id=strfind(entry,"TOHITPLACEHOLDER\\d+")]

[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(hitId,roll.count+1,1)]
	[h:group2=getGroup(hitId,roll.count+1,2)]

	[h:group2=replace(group2,"\\s","")]

	[h:text=replace(tokenName,"<a.*?>","")]
	[h:text=replace(text,".</a>","")]

	[h:entry=replace(entry,"TOHITPLACEHOLDER\\d+","<span title='to hit: "+group2+"'>"+macroLink(group1,"d20 Roller@Lib:Bestiary","","text="+text+";value=("+if(group2<0,group2,"+"+group2)+");tokenName="+tokenName+";color=red")+"</span>",1)]
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

