[dialog5("Markdown Help", "width=260; height=550; temporary=0; input=1; noframe=0"): {
<html>
<head>
	<link rel="stylesheet" type="text/css" href="[r:function.getCss('GitHub')]"></head>
<body>
	<table style="margin: 0px; padding: 0px">
	<caption><b>Headings</b></caption>
	<tr>
		<td style="margin: 0px; padding: 0px"># Heading 1</td>
		<td style="margin: 0px; padding: 0px"><h1>Heading 1</h1></td>
	</tr>
	<tr>
		<td style="margin: 0px; padding: 0px">## Heading 2</td>
		<td style="margin: 0px; padding: 0px"><h2>Heading 2</h2></td>
	</tr>
	<tr>
		<td style="margin: 0px; padding: 0px">### Heading 3</td>
		<td style="margin: 0px; padding: 0px"><h3>Heading 3</h3></td>
	</tr>
	</table>

	<table>
	<caption><b>Formatting</b></caption>
	<tr>
		<td width=0%>**Bold**</td>
		<td><b>Bold</b></td>
	</tr>
	<tr>
		<td>*Italic*</td>
		<td><i>Italic</i></td>
	</tr>
	<tr>
		<td>~~striketrough~~</td>
		<td><s>striketrough</s></td>
	</tr>
	<tr>
		<td>_underline_</td>
		<td><u>underline</u></td>
	</tr>
	</table>

	<table>
	<caption><b>Links</b></caption>
	<tr>
		<td>[r:"[link](url)"]</td>
		<td><a href="url">link</a></td>
	</tr>
	<tr>
		<td width=0%>[r:'[1d6](roll "1d6")']</td>
		<td>[r:macroLink("1d6","notebook/Dice Roller@this","all","text=1d6;value=1d6;tokenName=")]</td>
	</tr>
	<tr>
		<td width=0%>[r:'[+1](to hit "1")']</td>
		<td>[r:macroLink("+1","notebook/d20 Roller@this","all","text=+1;value=++1;color=Red")]</td>
	</tr>
	<tr>
		<td width=0%>[r:'[spell](spell)']</td>
		<td>[r:macroLink("spell","notebook/Args Dialog@this","","prop=Spells;source=;name=spell;description=;tokenName=")]</td>
	</tr>
	<tr>
		<td width=0%>[r:'[npc](npc)']</td>
		<td>[r:macroLink("npc","bestiary/Viewer Frame@this","","npc")]</td>
	</tr>
	<tr>
		<td>[r:"![](image url)"]</td>
		<td><img src="image url" width=50></td>
	</tr>
	<tr>
		<td width=0%>[r:'[r:getPlayerName()]']</td>
		<td>[r:getPlayerName()]</td>
	</tr>
	</table>

	<table>
	<caption><b>Blocks &amp; Separators</b></caption>
	<tr>
		<td>---</td>
		<td><hr noshade></td>
	</tr>
	<tr>
		<td>> Blockquote</td>
		<td><blockquote>Blockquote</blockquote></td>
	</tr>
	<tr>
		<td>```<br>Custom Codeblock<br>```</td>
		<td><div>Custom Codeblock</div></td>
	</tr>
	</table>

	<table>
	<caption><b>Lists</b></caption>
	<tr>
		<td width=0%>- list 1<br>- list 2</td>
		<td><ul><li>list 1</li><li>list 2</li></ul></td>
	</tr>
	<tr>
		<td width=0%>1. ordered list 1<br>1. ordered list 2</td>
		<td><ol><li>ordered list</li><li>ordered list 2</li></ol></td>
	</tr>
	</table>

	<table>
	<caption><b>Tables</b></caption>
	<tr>
		<td width=0%>|Table|Header|<br>|--------|----------|<br>|table |row 1[r,count(4,""):"&nbsp;"]|<br>
			|table |row 2[r,count(4,""):"&nbsp;"]|<br>|table |row 3[r,count(4,""):"&nbsp;"]|</td>
		<td><table>
			<tr>
				<th>Table
				<th>Header
			</tr>
			<tr class="bg">
				<td>table
				<td>row 1
			</tr>
			<tr>
				<td>table
				<td>row 2
			</tr>
			<tr class="bg">
				<td>table
				<td>row 3
			</tr>
			</table>
		</td>
	</tr>
	</table>
}]