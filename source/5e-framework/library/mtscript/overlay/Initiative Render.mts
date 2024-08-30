[h:command=getStrProp(macro.args,"command")]

[h:focus=0]

[overlay("Initiative"):{

[h:display=getLibProperty("Display","Lib:Campaign")]
[h:InitSize=getStrProp(display,"InitSize")]
[h:darkMode=getStrProp(display,"darkMode")]

[h:size=InitSize]


[r:'

<style>
.footer	{
	position: absolute;
	text-align: right;


    top: 100%;
    left: 100%;
    margin-right: -50%;
    transform: translate(-100%, -100%)

	}
#init	{
	border-radius: 50%;
	border-style: solid;
	border-color: orange;
	border-width: 5px;
	padding: 0;
	text-align:center;
	}

#wait	{
	border-radius: 50%;
	border-style: solid;
	border-color: gray;
	border-width: 0px;
	padding: 5;
	text-align:center;
	}

.out{
	filter: grayscale(100%) contrast(80%) brightness(150%);
	}

.bg {

	border-style: solid;
	border-color: #'+if(darkMode==1,"000000","dadada")+';
	border-width: 1px;
	background: gray;
	padding: 0px;
	background-color:rgba'+if(darkMode==1,"(0, 0, 0, 0.5)","(128, 128, 128, 0.5)")+';
}

a	{
	color: #'+if(darkMode==1,"ffffff","ffffff")+';
	text-decoration:none;
	}
body	{
	color: #'+if(darkMode==1,"ffffff","ffffff")+';
	}

#hidden {
  opacity: 0.4;
}

.emptyBar {
	width:'+number(size-2)+'px;
	height:2px;
	background:#333333;
	border-style: solid;
	border-color: #333333;
	border-width: 2px;
	text-align: left;
	}
.fillBar	{
	background:#20B420;
	height:2px;
	}

</style>
']


<div class="footer">





[h:initiativeList=getInitiativeList()]

[h:round=json.get(initiativeList,"round")]
[h:current=json.get(initiativeList,"current")]

[h:tokens=json.get(initiativeList,"tokens")]
[h:tokens=replace(tokens,"null",0)]



[h,if(round==-1):current=-1]
[h,if(round==-1):round=0]

[h:fields=json.fields(tokens)]


<table>
<tr>

<td align=right valign=bottom>


<table>
<tr>
<td align=left valign=bottom class="bg" style="border-radius: 5px;">
	
	<table width=100%>
		<tr><td valign=top>
		<span title="Refresh">[r:macrolink("<img style='filter:invert(100%);' src='asset://db583448ed08a5abc19f514310294ee4-15' >", "overlay/Initiative Overlay@this")"","output=all")]</span>

		<span title="Roll Initiative">[r:macrolink("<img style='filter:invert(100%);' src='asset://274cb2ad110af815ee7c7d5b47989b0b-19' >", "bestiary/Mass Initiative@this")"","output=all")]</span>

		
		[r,if(isGM()==1):macroLink("<span title='Clear initiative Tracker'>Clear","overlay/Remove Initiative@this")+"</span>"]

		<td align=right><span title="Close">
		[r:macrolink("<b>X</b>", "overlay/closeOverlay@this")"","Initiative")]

		<tr><td colspan=2 align=center>
		
		[r,if(isGM()==1):"<span title='Previous'>"+macrolink("<img style='filter:invert(100%);transform:rotate(180deg)' src=asset://8ccc215a396b748332ddc89046fb9fd7-17>", "overlay/Initiative Overlay@this")"","command=Previous;output=all")+"</span>"]
		
		<b>[r,if(isGM()==1):macrolink("<span title='Reset Round'>Round:", "overlay/Initiative Overlay@this")"","command=Reset;output=all")+"</span>";"Round:"]</b> [r:round]
		
		[r,if(isGM()==1):"<span title='Next'>"+macrolink("<img style='filter:invert(100%);' src=asset://8ccc215a396b748332ddc89046fb9fd7-17>", "overlay/Initiative Overlay@this")"","command=Next;output=all")+"</span>"]
			
		
		
	</table>

</table>



<tr>
<td align=right valign=bottom>

<table style="margin-right:3px;padding-left:0px;">
<tr>
[r,count(listcount(fields),""),code:{
	[h:currentJson=json.get(tokens,roll.count)]
	[h:id=json.get(currentJson,"tokenId")]
	[r,if(getVisible(id)==1 || isGM()==1):"<td style='margin:0px;padding:0px;' align=center valign=bottom width="+number(size+14)+">";""]
	[h:switchToken(id)]
	[h:fillBar=getBar("Health")]
	[h,if(isNumber(fillBar)==0):fillBar=100;fillBar=fillBar*100]

	[r,if(getVisible(id)==1 || isGM()==1):if(isBarVisible("Health")==1 || isGM()==1,"<div class='emptyBar'><div class='fillBar' style='width:"+fillBar+"%'></div></div>","");""]
	


}]
</table>

<table>
<tr><td class="bg" style="border-radius: [r:size]px;">

<table>
<tr>

[r,count(listcount(fields),""),code:{[h:currentJson=json.get(tokens,roll.count)][h:id=json.get(currentJson,"tokenId")][r,if(getVisible(id)==1 || isGM()==1):"<td style='margin:0;padding:0'><table style='margin:0;padding:0'><tr><td align=center "+if(current==roll.count," id=init"," id=wait")+" valign=bottom width="+size+">";""][h,if(current==roll.count):setState("Initiative",1,id);setState("Initiative",0,id)][h,if(current==roll.count && command=="Next" && focus==1):goto(id)][h:name=getName(id)][h:out=if(getState("Dead",id)==1 || getState("Dying",id)==1,1,0)]<a href='[r:macroLinkText("overlay/Focus@this","","id="+id)]'><span title="[r:name]: [r:json.get(currentJson,"initiative")]">[r,if(current==roll.count):if(getVisible(id)==1 || isGM()==1,"<img"+if(getVisible(id)==0," id='hidden'","")+if(out==1," class='out'","")+" src="+getImage(name)+"-"+size+">","");"<img"+if(getVisible(id)==0," id='hidden'","")+if(out==1," class='out'","")+" src="+getImage(name)+"-"+size+">"]</a>[r,if(getVisible(id)==1 || isGM()==1):"</table>";""]}]

</table>


</table>


</div>
}]