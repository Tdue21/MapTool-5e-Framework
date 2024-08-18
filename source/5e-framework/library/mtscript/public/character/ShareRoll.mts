[h:formula=macro.args]

[h:outputPC=getLibProperty("PC Output", "Lib:Character")]
[h:outputGM=getLibProperty("GM Output", "Lib:Character")]

[h:output=if(isGM()==1,outputGM,outputPC)]



[h,if(isGM()==1):res=input("formula|"+formula+"|Value|text|width=10");res=1]
[h:abort(res)]


<table style="border:1px solid Black;margin: 0px; padding: 0px" width=200>
<tr>
<td align=left style="margin: 0px; padding: 0px" bgcolor="Black">

<font color=White size=3>

<b>Value</b>

<tr>
<td style="margin: 0px; padding: 0px" align=center>
<font size=6 color=red style="text-decoration:none"><b>

[r:macroLink(formula,"Take Damage@Lib:Character",output,formula)]

		
</table>