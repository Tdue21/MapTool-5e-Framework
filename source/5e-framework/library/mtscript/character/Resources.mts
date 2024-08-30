[h:tokenName=getStrProp(macro.args,"tokenName")]


[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:output= function.getOutput())]
[h:resourcesObj=getLibProperty("Resources","Lib:"+tokenName)]


[h,if(json.type(resourcesObj)=="UNKNOWN"):resourcesObj="{}";""]

[h:resourceList=json.fields(resourcesObj)]

<table style="border-style: solid double solid double; border-width:2px 3px 2px 3px; margin-top:3px;  margin-bottom:3px">
<tr>

<td width=40% style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>NAME


<td width=30% style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>VALUE


<td width=30% style="margin:0px; padding:0px">
<font size=1 color=gray>
<b>RESET



[h:resetList="Short Rest,Long Rest,Other"]
[r,count(listcount(resourceList),""),code:{


[h:name=listget(resourceList,roll.count)]
[h:currentObj=json.get(resourcesObj,name)]
[h:value=json.get(currentObj,"value")]
[h:total=json.get(currentObj,"total")]
[h:reset=json.get(currentObj,"reset")]



<tr>
<td bgcolor=#DCDCDC valign=middle style="margin:0px; padding:0px; font-size:8px">


[r:macrolink("<span title='Change "+function.Capitalize(name)+"'>"+function.Capitalize(name)+"</span>", "character/Change Resource@this")"","name="+name+";tokenName="+tokenName)]

<td align=center bgcolor=#DCDCDC valign=middle style="margin:0px; padding:0px; font-size:10px">

[r:value][r:if(total==0 || total=="","","/"+total)]



<td bgcolor=#DCDCDC align=center valign=middle style="margin:0px; padding:0px; font-size:8px">

[r:if(reset==0,"Short",if(reset==1,"Long",""))]




}]
[r:if(listcount(resourceList)==0,"<tr><td width=33% bgcolor=#DCDCDC valign=middle style='margin:0px; padding:0px'><td width=33% bgcolor=#DCDCDC valign=middle style='margin:0px; padding:0px'><td width=33% bgcolor=#DCDCDC valign=middle style='margin:0px; padding:0px'>","")]


<tr>
<td colspan=3 style="font-size:10px;font-size:8px; margin:0px; padding:0px">


<!-----------------BUFFS------------------->

[r:macrolink("<span title='Edit temporary effects'>Buffs</span>", "character/Buffs@this")Output,tokenName,tokenName)]:

[h:buffs=getLibProperty("Buffs","Lib:"+tokenName)]

[r,if(json.type(buffs)=="UNKNOWN"),code:{};{


[h:buffsList=json.fields(buffs)]

[h:concentration=json.get(buffs,"concentration")]

[h,if(json.type(concentration)=="UNKNOWN"):concentration="";concentration=json.get(concentration,"name")]

[r:listreplace(buffsList,listfind(buffsList,"concentration"),concentration+"*")]

}]
<br>

<!-----------------CONDITIONS------------------->
[r:macrolink("<span title='Edit Conditions'>Conditions</span>", "character/Conditions Menu@this")"","tokenName="+tokenName)]:

[r,if(id==""),code:{};{


[r:function.GetConditions()]


}]

<br>
[r:macrolink("<span title='Use Reaction'>Reaction", "character/Reaction@this")Output,"tokenName="+tokenName)]:
[r,if(id==""):"";if(getState("Reaction Used")==0,"Available","Used")]

<br>
[h:concentrationSpell=getLibProperty("Concentration","Lib:"+tokenName)]
[r:macrolink("<span title='Set Concentration Spell'>Concentration", "character/Concentration@this")Output,"tokenName="+tokenName)]:
[r,if(id==""):"";if(getState("Concentration")==0,"Not concentrating",concentrationSpell)]

<tr>
<td colspan=3 align=center style="font-size:10px;font-size:6px; margin:0px; padding:0px">
<b>[r:macrolink("<span title='Add Resources'>RESOURCES</span>", "character/Change Resource@this")"","name=NEW RESOURCE;tokenName="+tokenName)]











</table>
