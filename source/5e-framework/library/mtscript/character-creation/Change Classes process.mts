[h:class=json.get(macro.args,"class")]
[h:name=json.get(macro.args,"name")]
[h:level=json.get(macro.args,"level")]
[h:hitDice=json.get(macro.args,"hitDice")]
[h:spellcasting=json.get(macro.args,"spellcasting")]
[h:button=json.get(macro.args,"button")]
[h:delete=json.get(macro.args,"delete")]
[h:cancel=json.get(macro.args,"cancel")]
[h:cancel=if(cancel=="cancel",0,1)]
[h:abort(cancel)]

[h:class=lower(class)]
[h:class=replace(class,"^\\s*","")]
[h:class=replace(class,"\\s*\$","")]


[h:classesObj=getLibProperty("Classes","Lib:Character Creation")]

[h:classObj=json.get(classesObj,class)]

[h,if(json.type(classObj)=="UNKNOWN"),code:{

[h:classObj='{"level":"","hitDice":"","spellcasting":"","subclass":""}']

};{}]

[h:classObj=json.set(classObj,"level",level)]
[h:classObj=json.set(classObj,"hitDice",hitDice)]

[h:spellcasting=if(spellcasting=="-","",spellcasting)]
[h:classObj=json.set(classObj,"spellcasting",spellcasting)]


[h:CurrentClassObj=json.get(classesObj,class)]

[h,if(json.type(CurrentClassObj)=="UNKNOWN"),code:{};{
	
	[h:subclassesObj=json.get(CurrentClassObj,"subclass")]
	[h:classObj=json.set(classObj,"subclass",subclassesObj)]

}]

[h:classesObj=json.set(classesObj,class,classObj)]

[h,if(class!=name || delete=="Delete"):classesObj=json.remove(classesObj,name);""]

[h:setLibProperty("Classes",classesObj,"Lib:Character Creation")]


[h,if(isDialogVisible("Settings")==1),code:{
[macro("campaign/Campaign Settings@this"):""]
};{}]