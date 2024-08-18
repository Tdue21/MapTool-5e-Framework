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
	[macro("Add Class Features@Lib:Character Creation"):"tokenName="+tokenName+";class="+class]

	[h:macroList=getLibProperty("macroList","Lib:Compendium")]
	[h:hasClassMacro=listfind(macroList,class)]

	[h,if(hasClassMacro==-1),code:{};{
		<!-----------------Class------------------->	
		[macro(class+"@Lib:Compendium"):"Equipment="+Equip+";tokenName="+tokenName+";class="+class]
	}]

	[h:classes=getLibProperty("Classes","Lib:Character Creation")]
	[h:subclassobj=json.get(classes,class)]
	[h:subclassList=json.get(subclassobj,"subclass")]
	[h:subclassList=json.toList(subclassList)]
	[h:level=json.get(subclassobj,"level")]
}]

<h1>Subclass</h1>

<p style="margin-top: 10px; margin-bottom: 10px">

[r,if(hasClassMacro==-1),code:{

	The <b>[r:class]</b> macro on <b>Lib:Compendium</b> is missing, class features like saving throws, proficiencies, starting equipment and resources need to be added manually.
	<br>
	<br>

};{}]

[r,if(level==1),code:{

	Select a <b>[r:class] subclass</b> from the following list.

};{
	[r,if(submit=="Skip"):"You did not choose a class.";"The <b>"+class+"</b> class only gets a subclass at level "+level+"."]

	<br>
	<br>

	Click <b>Next</b> to continue[r,if(submit=="Skip"):", or <b>Back</b> if you want to choose a class.";""].
	

}]


</p>


<tr>
<td valign=bottom style="padding:0px;margin=0px">


[h: processorLink=macroLinkText("Character Creation Wizard@Lib:Character Creation","")]
<form action="[r:processorLink]" method="json">





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



<p style="margin-top: 10px;margin-bottom: 10px;margin-left:10px">

Click <b>Next</b> to continue.

</p>

};{}]

<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="window" value="Subclass">
<input type="hidden" name="class" value="[r:class]">


<div class="div" style="padding-left: 207px;padding-top: 13px;padding-bottom: 12px;margin:0px;" bgcolor=#D8D8D8>
<input type="submit" name="submit" value="< Back">&nbsp;
<input type="submit" name="submit" value="Skip">&nbsp;
<input type="submit" name="submit" value="Next >">
</div>


