[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:submit=json.get(macro.args,"submit")]
[h,if(submit=="Skip"),code:{
	[h:hasClassMacro=0]
};{
	[h:background=lower(json.get(macro.args,"background"))]
	[h:macroList=getLibProperty("macroList", function.getNamespace())]
	[h:hasClassMacro=listfind(macroList,background)]
	[h,if(hasClassMacro==-1),code:{
		[macro("compendium/background/custom background@this"):"tokenName="+tokenName+";name="+background]
	};{	
		[macro("compendium/background/" + background+ "@this"):tokenName]
	}]

	[h,if(macro.return==""):"";background=macro.return]
	[h,if(macro.return==""):"";setProperty("Background","value="+capitalize(background)+";text=")]

	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,function.getNamespace())]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]
	[h:Property=json.set(Property,lower(background),"Background")]
	[h:setProperty(group,Property)]
}]

<div class="content">
	<h1>Class</h1>
	[r,if(hasClassMacro==-1),code:{
		<p>
			The <b>[r:background]</b> macro on <b>Lib:Compendium</b> is missing, some background features and proficiencies need to be added manually.
		</p>
	};{}]
	<p>
		Select a <b>class</b> from the following, and select if you want starting equipment to choose from a list provided by the class or starting money, to buy your equipment later.
	</p>

	<p>
	[h:classes=getLibProperty("Classes", function.getNamespace())]
	[h:classList=json.fields(classes)]
	<select name="CaracterClass" size="[r:if(hasClassMacro==-1,9,12)]">
		[r,count(listcount(classList),""),code:{
			[h:currentClass=listget(classList,roll.count)]
			<!---------------------------CAPITALIZE----------------------------->
			[h:CapitalName=capitalize(currentClass)]
			[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
			[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
			[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
			[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

			<option[r:if(roll.count==0," selected='selected'","")]>[r:CapitalName]</option>
		}]
	</select>
	</p>
	<p>
		<select name="Equipment" size="1">
			<option selected="selected">Starting Equipment</option>
			<option>Starting Money</option>
		</select>
	</p>
	<p>Click <b>Next</b> to continue.</p>

	<input type="hidden" name="tokenName" value="[r:tokenName]">
	<input type="hidden" name="window" value="Class">


<div class="buttons">
	<button type="submit" name="submit" value="Back">&lt; Back</button>
	<button type="submit" name="submit" value="Skip">Skip</button>
	<button type="submit" name="submit" value="Next">Next &gt;</button>
</div>

