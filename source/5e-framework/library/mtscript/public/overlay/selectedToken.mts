[h:namespace = "org.maptool.dnd5e"]

[h:toggle=getStrProp(macro.args,"toggle")]
[h:macroGroups=getStrProp(macro.args,"macroGroups")]
[h:idList=getStrProp(macro.args,"id")]

[h:output= function.getOutput())]
[h:display=getLibProperty("Display",namespace)]
[h:darkMode=getStrProp(display,"darkMode")]

<style>
[r:'
.selected
	{
	position:absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%);
	}
.menu
	{
	width:80;
	text-align:center;
	visibility:'+if(toggle=="" || toggle==0,"hidden","visible")+';
	}
.menu:hover .wrapper
	{
	visibility: visible;
	}
.wrapper
	{
	position:relative;
	visibility: hidden;
	top:0;
	}
.submenu
	{
	position:absolute;
	padding-top:10;
	top:-10;
	}
#left
	{
	right:0;
	}
#right
	{
	left:0;
	}
.border
	{
	border-width: 1px;
	border-color:#'+if(darkMode==1,"000000","424242")+';
	border-style:solid;
	border-radius: 4px;
	background-color:#'+if(darkMode==1,"303030","eaeaea")+';
	padding:2px;
	color:#'+if(darkMode==1,"ffffff","000000")+';
	}
#menu:hover a
	{
	background-color: #'+if(darkMode==1,"5d5d5d","c5c5c5")+';
	}
a	{
	text-decoration:none;
	color:#'+if(darkMode==1,"ffffff","000000")+';
	display: block;
	}
#link:hover
	{
	background-color:#'+if(darkMode==1,"5d5d5d","c5c5c5")+';
	}
#link:active
	{
	background-color:#'+if(darkMode==1,"3f3f3f","aeaeae")+';
	}
table
	{
	width:120;
	}
hr	{
	border-top: 1px solid gray;
	margin:0;
	padding:0;
	}
#center
	{
	float: center;
	}
.text {
	border-radius: 4px;
	border-style: solid;
	border-color: #'+if(darkMode==1,"000000","dadada")+';
	border-width: 1px;
	background: gray;
	padding: 0px;
	background-color:rgba'+if(darkMode==1,"(0, 0, 0, 0.5)","(128, 128, 128, 0.5)")+';
}
']
</style>



<div class="selected">
[h:id=""]
[h,count(listcount(idList)),code:{

	[h:currentId=listget(idList,roll.count)]
	[h:Owner=isOwner(getPlayerName(),currentId)]
	[h,if(Owner==1):id=currentId;""]

}]
[h,if(id==""):id=listget(idList,0)]

[h,if(id==""):display=0;display=isOwner(getPlayerName(),id)]
[h,if(isGM()==1 && id!=""):display=1]

[r,if(display==0),code:{};{

	[h:switchToken(id)]
	
	
	[h:Owner=isOwner(getPlayerName())]
	[h,if(isGM()==1):Owner=1]
	
	[h:macros=getMacros()]
	[h:json=json.fromList(macros)]
	[h,count(listcount(macros)),code:{
	
		[h:currentMacro=listget(macros,roll.count)]
		[h:index=getMacroIndexes(currentMacro)]
		[h:index=listget(index,0)]
		[h:props=getMacroProps(index)]
		[h:json=json.set(json,roll.count,json.fromStrProp(props))]
	}]
	[h:json=json.sort(json,"a","group","sortBy","label")]
	
	<table id=center>
	<tr>

	<td>
	
	<div class=menu>
	<div class=border id=menu>
	
	[r:macroLink("Utility","campaign/Interact@this","",id)]
	
	</div>
		<div class=wrapper>
			<div class=submenu id=left>
				
				<div class=border>
					<table>
					
	[r,if(isGM()==1):"<tr><td id=link>"+macroLink("Request Roll","campaign/Request Roll@this")]

	[r,if(isGM()==1):"<tr><td id=link>"+macroLink("Visibility","campaign/Show Hide All@this","","idList="+idList)]

	[r,if(isGM()==1):"<hr noshade>"]
	
					<tr><td id=link>
	[r:macroLink("Initiative","bestiary/Mass Initiative@this")]
					
					<tr><td id=link>
	[r:macroLink("Conditions","character/Conditions Menu@this")]

	[r,if(isPC()==1):"<tr><td id=link>"+macroLink("Rest","character/Rest@this","",getName(id));""]
					
	
					<hr noshade>
					
					<tr><td id=link>
	[r:macroLink("Info",if(isPC()==1,"character/Info@this","bestiary/Info@this"),"","tokenName="+getName(id))]
					<tr><td id=link>
	[r:macroLink("Area Template","character/Drop Template@this","",getName(id))]
					<tr><td id=link>
	[r:macroLink("Range","character/Range@this")]
					<tr><td id=link>
	[r:macroLink("Light","character/Light@this")]

					<hr noshade>
	
					<tr><td id=link>
	[r:macroLink("Elev +","character/Elevation@this","","elevation=1;tokenName="+getName(id))]
					<tr><td id=link>
	[r:macroLink("Elev -","character/Elevation@this","","elevation=-1;tokenName="+getName(id))]
					</table>
				</div>
			</div>
		</div>
	</div>

	
	<td valign=top>
	<span title="[r:getName(id)]: Show/Hide Macros">
	[r:macrolink("<img src="+getTokenImage()+"-40>","overlay/OverlaySelected@this","","id="+id+";toggle="+if(toggle==0 || toggle=="",1,0)+";macroGroups="+if(macroGroups==0 || macroGroups=="",0,1))]

	<td>

	<div class=menu>
	<div class=border id=menu>

	[h,if(listfind(macros,"Statblock")==-1):menuName="Macros";menuName=macroLink("Statblock","Statblock@Token","","",id)]

	[h,if(listfind(macros,"Notebook")==-1):"";menuName=macroLink("Notebook","Notebook@Token","","",id)]

	[r:menuName]

	</div>
		<div class=wrapper>
			<div class=submenu id=right>
				<div class=border>
					<table>
					
	<tr><td id=link>
	[h:group=""]
	[r,count(listcount(macros),"<tr><td id=link>"),code:{
		[h:currentJson=json.get(json,roll.count)]
		[h:label=json.get(currentJson,"label")]
		[h:currentGroup=json.get(currentJson,"group")]
		[h:tooltip=json.get(currentJson,"tooltip")]
		[r,if(group==currentGroup):"";"<hr noshade>"]
		[h:group=currentGroup]
		[r:macroLink(label,label+"@Token","","",id)]
		
	
	}]

					</table>
				</div>
			</div>
		</div>
	</div>

	[h,if(toggle=="" || toggle==0):display=0]

	[r,if(listcount(idList)>1 && display!=0),code:{
		[h:id2=listget(idList,1)]
		[h,if(id2==id):id2=listget(idList,0)]
		
		[h:Elev1=getProperty("Elevation",id)][h,if(isNumber(Elev1)==0):Elev1=0]
		[h:Elev2=getProperty("Elevation",id2)][h,if(isNumber(Elev2)==0):Elev2=0]
		[h:vdistance=abs(Elev1-Elev2)]
		
		[h:hdistance=getDistance(id,1,id2)]

		[h:distance=hypot(vdistance,hdistance)]
		[h:distance=ceil(distance/5)]
		[h:distance=distance*5]

	
		
		<tr><td>
		<td class=text align=center style="margin:0px;padding:0px;">
		<font color=white size=2>
		[r:distance+" ft."]
		<td>
		<tr><td>
		<td style="margin:0px;padding:0px">
		<span title="[r:getName(id2)]">
		<img src="[r:getTokenImage(40,id2)]">
		</span>
		<td style="margin:0px;padding:0px">
	};{}]

</div>

}]