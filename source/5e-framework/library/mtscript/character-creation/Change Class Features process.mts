[h:class=json.get(macro.args,"class")]
[h:subclass=json.get(macro.args,"subclass")]
[h:hitDice=json.get(macro.args,"hitDice")]
[h:level1=json.get(macro.args,"level1")]
[h:level2=json.get(macro.args,"level2")]
[h:level3=json.get(macro.args,"level3")]
[h:level4=json.get(macro.args,"level4")]
[h:level5=json.get(macro.args,"level5")]
[h:level6=json.get(macro.args,"level6")]
[h:level7=json.get(macro.args,"level7")]
[h:level8=json.get(macro.args,"level8")]
[h:level9=json.get(macro.args,"level9")]
[h:level10=json.get(macro.args,"level10")]
[h:level11=json.get(macro.args,"level11")]
[h:level12=json.get(macro.args,"level12")]
[h:level13=json.get(macro.args,"level13")]
[h:level14=json.get(macro.args,"level14")]
[h:level15=json.get(macro.args,"level15")]
[h:level16=json.get(macro.args,"level16")]
[h:level17=json.get(macro.args,"level17")]
[h:level18=json.get(macro.args,"level18")]
[h:level19=json.get(macro.args,"level19")]
[h:level20=json.get(macro.args,"level20")]
[h:delete=json.get(macro.args,"delete")]
[h:cancel=json.get(macro.args,"cancel")]
[h:cancel=if(cancel=="cancel",0,1)]
[h:abort(cancel)]

[h:classes=getLibProperty("Classes", function.getNamespace())]
[h:classObj=json.get(classes,class)]
[h:subclassesObj=json.get(classObj,"subclass")]
[h,if(subclass!=""):subclassObj=json.get(subclassesObj,subclass)]

[h,if(subclass==""):object=classObj;object=subclassObj]


[h:object=json.set(object,"level1",level1)]
[h:object=json.set(object,"level2",level2)]
[h:object=json.set(object,"level3",level3)]
[h:object=json.set(object,"level4",level4)]
[h:object=json.set(object,"level5",level5)]
[h:object=json.set(object,"level6",level6)]
[h:object=json.set(object,"level7",level7)]
[h:object=json.set(object,"level8",level8)]
[h:object=json.set(object,"level9",level9)]
[h:object=json.set(object,"level10",level10)]
[h:object=json.set(object,"level11",level11)]
[h:object=json.set(object,"level12",level12)]
[h:object=json.set(object,"level13",level13)]
[h:object=json.set(object,"level14",level14)]
[h:object=json.set(object,"level15",level15)]
[h:object=json.set(object,"level16",level16)]
[h:object=json.set(object,"level17",level17)]
[h:object=json.set(object,"level18",level18)]
[h:object=json.set(object,"level19",level19)]
[h:object=json.set(object,"level20",level20)]

[h:object=lower(object)]

[h,if(subclass==""),code:{

	[h:classes=json.set(classes,class,object)]

};{

	[h:subclassesObj=json.set(subclassesObj,subclass,object)]
	[h:classObj=json.set(classObj,"subclass",subclassesObj)]
	[h:classes=json.set(classes,class,classObj)]

}]

[h,if(delete==""),code:{};{

	[h:subclassesObj=json.remove(subclassesObj,subclass)]
	[h:classObj=json.set(classObj,"subclass",subclassesObj)]
	[h:classes=json.set(classes,class,classObj)]

}]
[h:classObj=json.get(classes,class)]
[h:classObj=json.set(classObj,"hitDice",hitDice)]
[h:classes=json.set(classes,class,classObj)]
[h:setLibProperty("Classes", classes, function.getNamespace())]

[macro("character-creation/Change Classes@this"):class]