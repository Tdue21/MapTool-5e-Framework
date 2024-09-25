[h:attributeList=getLibProperty("Attributes", function.getNamespace())]
[h:modFont=if(listcount(attributeList)>6,10,16)]
[h:atrFont=if(listcount(attributeList)>7,6,8)]
[h:spacing=if(listcount(attributeList)>7,3,5)]

[h:output= function.getOutput())]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:profBonus=getStrProp(macro.args,"profBonus")]

[h:id=findToken(tokenName)]

[h,if(id==""):"";switchToken(id)]

[h:AtrProps=""]
[h,count(listcount(attributeList),""),code:{
	[h:attribute=listget(attributeList,roll.count)]
	[h:value=getLibProperty(attribute,"Lib:"+tokenName)]
	[h:value=getStrProp(value,"value")]
	[h:value=if(value=="",0,value)]
	[h,if(isNumber(value)==0):value=eval(value);value]
	[h:mod=floor(number(eval(string(value)))/2-5)]
	[h:AtrProps=setStrProp(AtrProps,substring(lower(attribute),0,3),mod)]
}]
[h:varsFromStrProp(AtrProps)]


<!-----------------Attributes------------------->

[r,count(listcount(attributeList),""),code:{

	[h:attribute=listget(attributeList,roll.count)]
	[h:str=substring(lower(attribute),0,3)]


	<table width=67 style="border-style: double; border-width:3px; margin-top:[r:if(roll.count==0,5,0)]px; margin-bottom:[r:spacing]px;" bgcolor=white>
	<tr>
	<td style="margin:0px; padding:0px; font-size:6px" align=center>
	


	[h:prop=getLibProperty(attribute,"Lib:"+tokenName)]
	
	[h:propValue=getStrProp(string(prop),"value")]
	[h:text=getStrProp(string(prop),"text")]
	[h:prof=getStrProp(string(prop),"prof")]
	[h:other=getStrProp(string(prop),"bonus")]

	[h,if(isNumber(other)==1):"";other=0]

	[h,switch(prof):
	case "0":bonus=0;
	case "1":bonus=floor(profBonus/2);
	case "2":bonus=ceil(profBonus/2);
	case "3":bonus=profBonus;
	case "4":bonus=profBonus*2;
	default:bonus=0]

	[h:bonus=bonus+other]
	
	[h:propValue=if(propValue=="",0,propValue)]
	
	[h:evalAtr=number(eval(string(propValue)))]

	[h:mod=getStrProp(AtrProps,str)]

	[h:bonusDisplay=mod+bonus]
	
	[h:modlink=macroLink(if(mod<0,mod,"+"+mod),"character/d20 Roller@this","","text="+attribute+" check;value=+"+if(bonusDisplay<0,bonusDisplay,"+"+bonusDisplay)+";tokenName="+tokenName+";color=0099cc")]


	[r:macrolink("<span title='Edit "+attribute+"'>"+upper(attribute)+"</span>", "character/Change Attribute@this", "","value="+encode(prop)+";name="+attribute+";id="+id+";tokenName="+tokenName)]
	
	<tr>
	<td style="margin:0px; padding:0px;font-size:[r:modFont]px" align=center>
	
	[r:"<span title='"+if(bonus==0,"Roll "+attribute,upper(str,1)+" check bonus: "+bonus)+"'>"+modlink+"</span>"]

	<tr>
	<td style="border-style: solid; border-width:1px; margin:0px; padding:0px;font-size:[r:atrFont]px" align=center>

	[h:text=if(text==0,"",text)]
	[r:if(text=="" && isNumber(propValue)==1,evalAtr,"<span title='"+if(isNumber(propValue)==1,"",propValue+if(text=="",""," | "))+if(text=="","",text)+"'>"+evalAtr+"</span>")]


	
	</table>





}]