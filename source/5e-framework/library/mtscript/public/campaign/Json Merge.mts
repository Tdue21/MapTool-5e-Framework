[h:lib=getStrProp(macro.args,"lib")]
[h:value=getStrProp(macro.args,"value")]
[h:macroName=getStrProp(macro.args,"macroName")]

[h:json1=getLibProperty(value,lib)]
[h,if(json.type(json1)=="UNKNOWN"):json1="{}";""]


[h:res=input("var|Paste the content from an exported JSON file||label|span=true",
	"json2||Merge "+value+" with")]
[h:abort(res)]

[h,if(json.type(json2)=="OBJECT"),code:{

	[h:jsonMerged=json.merge(json1,json2)]
	[h:setLibProperty(value,jsonMerged,lib)]

};{

	[h:abort(0)]

}]

[macro(macroName+"@Lib:Character"):""]

[h,if(isDialogVisible("Settings")==1),code:{
[macro("Campaign Settings@Lib:Campaign"):""]
};{}]