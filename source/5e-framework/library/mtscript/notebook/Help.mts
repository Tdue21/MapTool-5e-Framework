[dialog5("Markdown Help", "width=260; height=550; temporary=0; input=1; noframe=0"): {


<link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">


<table style="margin: 0px; padding: 0px">
<tr>
<td style="margin: 0px; padding: 0px">
# Heading 1
<td style="margin: 0px; padding: 0px">
<h1><font size=6>Heading 1</h1>
<tr>
<td style="margin: 0px; padding: 0px">
## Heading 2
<td style="margin: 0px; padding: 0px">
<h2><font size=5>Heading 2</h2>
<tr>
<td style="margin: 0px; padding: 0px">
### Heading 3
<td style="margin: 0px; padding: 0px">
<h3><font size=4>Heading 3</h3>
</table>



<table>
<tr>
<td width=0%>
**Bold**
<td>
<b>Bold</b>
<tr>
<td>
*Italic*
<td>
<i>Italic</i>
<tr>
<td>
~~striketrough~~
<td>
<s>striketrough</s>
<tr>
<td>
_underline_
<td>
<u>underline</u>
</table>

<table>
<tr>
<td>
[r:"[link](url)"]
<td>
<a href="url">link</a>
<tr>
<td width=0%>
[r:'[1d6](roll "1d6")']
<td>
[r:macroLink("1d6","Dice Roller@Lib:Notebook","all","text=1d6;value=1d6;tokenName=")]
<tr>
<td width=0%>
[r:'[+1](to hit "1")']
<td>
[r:macroLink("+1","d20 Roller@Lib:Notebook","all","text=+1;value=++1;color=Red")]
<tr>
<td width=0%>
[r:'[spell](spell)']
<td>
[r:macroLink("spell","notebook/Args Dialog@this","","prop=Spells;source=;name=spell;description=;tokenName=")]
<tr>
<td width=0%>
[r:'[npc](npc)']
<td>
[r:macroLink("npc","Viewer Frame@Lib:Bestiary","","npc")]
<tr>
<td>
[r:"![](image url)"]
<td>
<img src="image url" width=50>
<tr>
<td width=0%>
[r:'[r:getPlayerName()]']
<td>
[r:getPlayerName()]
</table>

<table>
<tr>
<td>
---
<td>
<hr noshade>
<tr>
<td>
> Blockquote
<td>
<blockquote>Blockquote</blockquote>
<tr>
<td>
```<br>
Custom Codeblock
<br>
```
<td>
<div>Custom Codeblock</div>
</table>

<table>
<tr>
<td width=0%>
- list 1<br>
- list 2
<td>
<ul>
<li>list 1</li>
<li>list 2</li>
</ul>
<tr>
<td width=0%>
1. ordered list 1<br>
1. ordered list 2
<td>
<ol>
<li>ordered list</li>
<li>ordered list 2</li>
</ol>
</table>

<table>
<tr>
<td width=0%>
|Table|Header|<br>
|--------|----------|<br>
|table |row 1[r,count(4,""):"&nbsp;"]|<br>
|table |row 2[r,count(4,""):"&nbsp;"]|<br>
|table |row 3[r,count(4,""):"&nbsp;"]|
<td>

	<table>
	<tr>
	<th>
	Table
	<th>
	Header
	<tr class="bg">
	<td>
	table
	<td>
	row 1
	<tr>
	<td>
	table
	<td>
	row 2
	<tr class="bg">
	<td>
	table
	<td>
	row 3
	</table>

</table>
}]