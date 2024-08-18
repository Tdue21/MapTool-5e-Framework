[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:class=getStrProp(macro.args,"class")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:classes=getLibProperty("Classes","Lib:Character Creation")]

[h:AllClassObj=json.get(classes,class)]
[h:spellcasting=json.get(AllClassObj,"spellcasting")]
[h:hitdice=json.get(AllClassObj,"hitDice")]



[h:subclass=0]
[h:level=""]
[h:note="-"]

[h:ClassObj=getProperty("Class&Level")]

[h,if(json.type(ClassObj)=="UNKNOWN" || json.fields(ClassObj)==""),code:{};{
	
	[h:classList=json.fields(ClassObj)]
	[h:match=listFind(classList,class)]
	[h:currentClassObj=json.get(ClassObj,class)]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):level=0;level=json.get(currentClassObj,"level")]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):subclass=0;subclass=json.get(currentClassObj,"subclass")]
	[h,if(json.type(currentClassObj)=="UNKNOWN"):note="-";note=json.get(currentClassObj,"note")]
}]

[h:level1=json.get(AllClassObj,"level1")]
[h:level2=json.get(AllClassObj,"level2")]
[h:level3=json.get(AllClassObj,"level3")]
[h:level4=json.get(AllClassObj,"level4")]
[h:level5=json.get(AllClassObj,"level5")]
[h:level6=json.get(AllClassObj,"level6")]
[h:level7=json.get(AllClassObj,"level7")]
[h:level8=json.get(AllClassObj,"level8")]
[h:level9=json.get(AllClassObj,"level9")]
[h:level10=json.get(AllClassObj,"level10")]
[h:level11=json.get(AllClassObj,"level11")]
[h:level12=json.get(AllClassObj,"level12")]
[h:level13=json.get(AllClassObj,"level13")]
[h:level14=json.get(AllClassObj,"level14")]
[h:level15=json.get(AllClassObj,"level15")]
[h:level16=json.get(AllClassObj,"level16")]
[h:level17=json.get(AllClassObj,"level17")]
[h:level18=json.get(AllClassObj,"level18")]
[h:level19=json.get(AllClassObj,"level19")]
[h:level20=json.get(AllClassObj,"level20")]

[h:featList=getLibProperty("Feats", "Lib:Character Creation")]
[h:addFeatList=getLibProperty("AdditionalFeats", "Lib:Character Creation")]


[h,if(json.type(ClassObj)=="UNKNOWN" || json.fields(ClassObj)==""),code:{
		[h:ClassObj=json.set(ClassObj,class,'{"level":1,"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]

	
	[h:currentLevel=level1]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]

[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]

[h:level=if(level=="",0,level+1)]
<!-----------------LEVEL 1 (MULTICLASSING)------------------->
[r,if(level==1),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
	
	[h:currentLevel=level1]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]


};{}]





<!-----------------LEVEL 2------------------->
[r,if(level==2),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
	
	[h:currentLevel=level2]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]





<!-----------------LEVEL 3------------------->
[r,if(level==3),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	
	[h:currentLevel=level3]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]



};{}]





<!-----------------LEVEL 4------------------->
[r,if(level==4),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
		
	[h:currentLevel=level4]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]


};{}]


<!-----------------LEVEL 5------------------->
[r,if(level==5),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	[h:currentLevel=level5]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]



};{}]


<!-----------------LEVEL 6------------------->
[r,if(level==6),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	[h:currentLevel=level6]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]


<!-----------------LEVEL 7------------------->
[r,if(level==7),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	[h:currentLevel=level7]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]


};{}]


<!-----------------LEVEL 8------------------->
[r,if(level==8),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	[h:currentLevel=level8]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]


<!-----------------LEVEL 9------------------->
[r,if(level==9),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	[h:currentLevel=level9]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]



};{}]

<!-----------------LEVEL 10------------------->
[r,if(level==10),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	[h:currentLevel=level10]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]


};{}]

<!-----------------LEVEL 11------------------->
[r,if(level==11),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	[h:currentLevel=level11]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]




};{}]


<!-----------------LEVEL 12------------------->
[r,if(level==12),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
	
	
	[h:currentLevel=level12]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]

<!-----------------LEVEL 13------------------->
[r,if(level==13),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
	
	[h:currentLevel=level13]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]

<!-----------------LEVEL 14------------------->
[r,if(level==14),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
	
	[h:currentLevel=level14]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]

<!-----------------LEVEL 15------------------->
[r,if(level==15),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
	
	
	[h:currentLevel=level15]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]



};{}]


<!-----------------LEVEL 16------------------->
[r,if(level==16),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	[h:currentLevel=level16]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]


<!-----------------LEVEL 17------------------->
[r,if(level==17),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
		
	[h:currentLevel=level17]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]

<!-----------------LEVEL 18------------------->
[r,if(level==18),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
	
	[h:currentLevel=level18]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]


<!-----------------LEVEL 19------------------->
[r,if(level==19),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
	
	[h:currentLevel=level19]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]

};{}]


<!-----------------LEVEL 20------------------->
[r,if(level==20),code:{
	[h:ClassObj=json.set(ClassObj,class,'{"level":'+level+',"hitDice":"'+hitDice+'","spellcasting":"'+spellcasting+'","subclass":"'+subclass+'","note":"'+note+'"}')]
	[h:setProperty("Class&Level",ClassObj)]
	
	
	[h:currentLevel=level20]
	
	
	[h:setProperty("Class&Level",ClassObj)]
	<!-----------------Feat------------------->
	[h:group="Feats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]

	<!-----------------------Multiple Choice Feat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),([^:]+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),([^:]+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):"";Property=json.set(Property,currentFeat,"Class")]
	}]
	[h:setProperty(group,Property)]
	
	<!-----------------Additional Feat------------------->
	[h:group="AdditionalFeats"]
	[h:inputList=getLibProperty(group,"Lib:Character")]
	[h:inputList=json.fields(inputList)]
	[h:inputList=listSort(inputList,"N")]
	[h:Property=getProperty(group)]
	
	[h,if(json.type(Property)=="UNKNOWN"):currentList="{}";currentList=json.fields(Property)]
	
	[h,count(listcount(currentList)),code:{
		[h:currentItem=listget(currentList,roll.count)]
		[h:delete=listfind(inputList,currentItem)]
		[h:inputList=listdelete(inputList,delete)]
	}]

	[h:levelFeats=currentLevel]
	<!-----------------------Multiple Choice Addfeat----------------------->
	[h:id=strfind(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)")]
	[h,count(getFindCount(id)),code:{
		[h:group1=getGroup(id,roll.count+1,1)]
		[h:group2=getGroup(id,roll.count+1,2)]
[h,switch(group1):
	case "2":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string");
	case "3":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string");
	case "4":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string");
	case "5":input("choice1|"+group2+"|Choice 1|list|value=string",
		"choice2|"+group2+"|Choice 2|list|value=string",
		"choice3|"+group2+"|Choice 3|list|value=string",
		"choice4|"+group2+"|Choice 4|list|value=string",
		"choice5|"+group2+"|Choice 5|list|value=string");		
	default:input("choice1|"+group2+"|Choice 1|list|value=string")
]

		[h:Property=json.set(Property,choice1,"Class")]
		[h,if(group1>1):Property=json.set(Property,choice2,"Class");""]
		[h,if(group1>2):Property=json.set(Property,choice3,"Class");""]
		[h,if(group1>3):Property=json.set(Property,choice4,"Class");""]
		[h,if(group1>4):Property=json.set(Property,choice5,"Class");""]
		
		[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.+?:.+?)\\)","",1)]
	}]
	[h:levelFeats=replace(levelFeats,"\\(choose (\\d+),(.*?)\\)","")]
	[h:levelFeats=replace(levelFeats,",\\s*,",",")]
	[h:levelFeats=replace(levelFeats,",\\s*\$","")]
	
	[h,count(listcount(levelFeats)),code:{
		[h:currentFeat=listget(levelFeats,roll.count)]
		
		[h,if(matches(currentFeat,".*:.*")==1):Property=json.set(Property,currentFeat,"Class");""]
	}]
	[h:setProperty(group,Property)]



};{}]


