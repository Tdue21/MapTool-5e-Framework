[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:submit=json.get(macro.args,"submit")]
[h,if(submit=="Skip"),code:{};{

	[h:str=json.get(macro.args,"Str")]
	[h:props=setStrProp("","value",str)]
	[h:setProperty("Strength",props,id)]
	
	[h:dex=json.get(macro.args,"Dex")]
	[h:props=setStrProp("","value",dex)]
	[h:setProperty("Dexterity",props,id)]
	
	[h:con=json.get(macro.args,"Con")]
	[h:props=setStrProp("","value",con)]
	[h:setProperty("Constitution",props,id)]
	
	[h:int=json.get(macro.args,"Int")]
	[h:props=setStrProp("","value",int)]
	[h:setProperty("Intelligence",props,id)]
	
	[h:wis=json.get(macro.args,"Wis")]
	[h:props=setStrProp("","value",wis)]
	[h:setProperty("Wisdom",props,id)]
	
	[h:cha=json.get(macro.args,"Cha")]
	[h:props=setStrProp("","value",cha)]
	[h:setProperty("Charisma",props,id)]

}]
[h:races=getLibProperty("Races", function.getNamespace())]

<div class="content">
	<h1>Race</h1>

	<p>Select a <b>race</b>, <b>subrace</b> or <b>variant race</b> from the following list.</p>

	<select name="race" size="15">
		[r,count(listcount(races),""),code:{
			<option[r:if(roll.count==0," selected='selected'","")]>[r:listget(races,roll.count)]</option>
		}]
		<option>Custom Race</option>
	</select>

	<p>Click <b>Next</b> to continue.</p>
</div>

<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Race">

<div class="buttons">
	<button type="submit" name="submit" value="Back">&lt; Back</button>
	<button type="submit" name="submit" value="Skip">Skip</button>
	<button type="submit" name="submit" value="Next">Next &gt;</button>
</div>


