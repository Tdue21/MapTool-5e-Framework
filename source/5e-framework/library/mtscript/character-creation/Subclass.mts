[h:tokenName=json.get(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:ClassObj=getProperty("Class&Level")]
[h,if(json.fields(ClassObj)==""):setProperty("Class&Level","");""]

[h:submit=json.get(macro.args,"submit")]
[h,if(submit=="Skip"),code:{
	[h:level=""]
	[h:class=""]
	[h:hasClassMacro=""]
	};{
	[h:class=lower(json.get(macro.args,"CaracterClass"))]
	[h:Equip=json.get(macro.args,"Equipment")]

	<!-----------------Feats------------------->
	[macro("character-creation/Add Class Features@this"):"tokenName="+tokenName+";class="+class]

	[h:macroList=getLibProperty("macroList", function.getNamespace())]
	[h:hasClassMacro=listfind(macroList,class)]

	[h,if(hasClassMacro==-1),code:{};{
		<!-----------------Class------------------->	
		[macro("compendium/class_" + class + "/" + class + "@this"):"Equipment="+Equip+";tokenName="+tokenName+";class="+class]
	}]

	[h:classes=getLibProperty("Classes", function.getNamespace())]
	[h:subclassobj=json.get(classes,class)]
	[h:subclassList=json.get(subclassobj,"subclass")]
	[h:subclassList=json.toList(subclassList)]
	[h:level=json.get(subclassobj,"level")]
}]

<div class="content">
	<h1>Subclass</h1>
	
	[r,if(hasClassMacro==-1),code:{
		<p>
			The <b>[r:class]</b> macro on <b>Lib:Compendium</b> is missing, class features like saving throws, proficiencies, starting equipment and resources need to be added manually.
		</p>
	};{}]

	[r,if(level==1),code:{
		<p>	Select a <b>[r:class] subclass</b> from the following list.</p>
	};{
		<p>
		[r,if(submit=="Skip"):"You did not choose a class.";"The <b>"+class+"</b> class only gets a subclass at level "+level+"."]
		</p>

		<p>	Click <b>Next</b> to continue[r,if(submit=="Skip"):", or <b>Back</b> if you want to choose a class.";""].</p>	
	}]

	[r,if(level==1),code:{
		<select name="subclass" size="[r:if(hasClassMacro==-1,12,15)]">
			[r,count(listcount(subclassList),""),code:{
				[h:currentSubclass=listget(subclassList,roll.count)]

				<!---------------------------CAPITALIZE----------------------------->
				[h:CapitalName=capitalize(currentSubclass)]
				[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
				[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
				[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
				[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]
	
				<option[r:if(roll.count==0," selected='selected'","")]>[r:CapitalName]</option>
	
			}]
		</select>

		<p>Click <b>Next</b> to continue.</p>
	};{}]

	<input type="hidden" name="tokenName" value="[r:tokenName]">
	<input type="hidden" name="window" value="Subclass">
	<input type="hidden" name="class" value="[r:class]">

<div class="buttons">
	<button type="submit" name="submit" value="Back">&lt; Back</button>
	<button type="submit" name="submit" value="Skip">Skip</button>
	<button type="submit" name="submit" value="Next">Next &gt;</button>
</div>


