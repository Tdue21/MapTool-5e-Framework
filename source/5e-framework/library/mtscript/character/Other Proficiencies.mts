[h:entry=getStrProp(macro.args,"entry")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:profBonus=getStrProp(macro.args,"profBonus")]

[h:attributeList=getLibProperty("Attributes", "Lib:Character")]

[h:output= function.getOutput())]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]

[h:expert=matches(entry,".*[Ee]xpert.*")]

[h:res=input(
"var|<html><h3>"+upper(entry,1)+" proficiency test</h3></html>||label|span=true",
"attribute|-,"+attributeList+"|Attribute|list|value=string",
"proficiency|Proficient,Expert|Proficiency|radio|select="+expert,
"bonus||Bonus|text|width=8")]
[h:abort(res)]

[h:profBonus=if(proficiency==0,profBonus,profBonus*2)]

[h:atrValue=getLibProperty(attribute,"Lib:"+tokenName)]
[h:atrValue=getStrProp(atrValue,"value")]
[h:atrValue=if(atrValue=="",0,atrValue)]
[h,if(isNumber(atrValue)==0):atrValue=eval(atrValue);atrValue]
[h:mod=floor(number(eval(string(atrValue)))/2-5)]
[h:mod=if(attribute=="-",0,mod)]

[h:mod=mod+profBonus+bonus]

[h,if(attribute=="-"):atrText="";atrText=upper(substring(attribute,0,3),1)+" - "]

[h:linkText=macroLinkText("character/d20 Roller@this","","text="+atrText+upper(entry,1)+";value=+"+mod+";tokenName="+tokenName+";color=0099cc")]

[h:execLink(linkText)]