[h:maps=getAllMapNames()]

[h:maps=listsort(maps,"N")]

[h:visibleMaps=maps]

[h,count(listcount(maps)),code:{

	[h:map=listget(maps,roll.count)]

	[h,if(getMapVisible(map)==1):"";visibleMaps=listdelete(visibleMaps,listfind(visibleMaps,map))]
	

}]



[h,if(isGM()==1):height=listcount(maps)*31+80;height=listcount(visibleMaps)*31+60]


[dialog5("Select Map", "width=220; height="+height+"; temporary=1; input=1; noframe=0"):{

	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]">	
	<table>
	<tr>
	<td align=center>
	[r,if(isGM()==0):"";macroLink("Weather","Weather Select@Lib:Overlay","")]
	[h:processorLink=macroLinkText("Select Map process@Lib:Campaign","")]
	<form action="[r:processorLink]" method="json">

	[h,if(isGM()==1):repeat=listcount(maps);repeat=listcount(visibleMaps)]
	
	[r,count(repeat,"<br>"),code:{

		[h,if(isGM()==1):map=listget(maps,roll.count);map=listget(visibleMaps,roll.count)]

		[h:bgcolor=if(getMapVisible(map)==1,"","bgcolor=silver")]
		[h:fontColor=if(getCurrentMapName()==map,"<font color=blue><b>","<font color=black>")]
		
		<input type="submit" name="[r:map]" value="<html><body [r:bgcolor]><table width=150><tr><td style='margin:0px;padding:0px'>[r:fontColor][r:map]</table></body></html>">
	
	}]
	
<br>

	
	</table>

}]