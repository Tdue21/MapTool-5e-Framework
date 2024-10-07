[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:submit=json.get(macro.args,"submit")]
[h,if(submit=="Skip"),code:{
	[h:hasClassMacro=0]
};{
	[h:race=lower(json.get(macro.args,"race"))]
	[h:macroList=getLibProperty("macroList", function.getNamespace())]
	[h:hasClassMacro=listfind(macroList,race)]

	[h,if(hasClassMacro==-1),code:{
		[macro("compendium/race/custom race@this"):"tokenName="+tokenName+";name="+race]
	};{
		[h:macro.return=""]
		[macro("compendium/race/"+race+"@this"):tokenName]
	}]
	[h,if(macro.return==""):"";race=macro.return]
	[h,if(macro.return==""):"";setProperty("Race","value="+capitalize(race)+";text=")]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group, function.getNamespace())]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]
	[h:Property=json.set(Property,lower(race),"Race")]
	[h:setProperty(group,Property)]
}]

<div class="content">
	<h1>Background</h1>
	[r,if(hasClassMacro==-1),code:{
		<p>
		The <b>[r:race]</b> macro on <b>Lib:Compendium</b> is missing, some racial traits like size, speed and ability score bonus need to be added manually.
		</p>
	};{}]
	<p>Select a <b>background</b> from the following list.</p>

	<select name="background" size="[r:if(hasClassMacro==-1,12,15)]">
		[h:bg=getLibProperty("Backgrounds", function.getNamespace())]
		[r,count(listcount(bg),""),code:{
			<option[r:if(roll.count==0," selected='selected'","")]>[r:listget(bg,roll.count)]</option>
		}]
		<option>Custom Background</option>
	</select>

	<p>Click <b>Next</b> to continue.</p>
</div>

<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Background">


<div class="buttons">
	<button type="submit" name="submit" value="Back">&lt; Back</button>
	<button type="submit" name="submit" value="Skip">Skip</button>
	<button type="submit" name="submit" value="Next">Next &gt;</button>
</div>

