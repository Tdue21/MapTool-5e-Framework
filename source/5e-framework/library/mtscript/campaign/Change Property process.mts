[h:delete=json.get(macro.args,"delete")]
[h:cancel=json.get(macro.args,"cancel")]
[h:cancel=if(cancel=="cancel",0,1)]
[h:abort(cancel)]

[h:prop=json.get(macro.args,"prop")]
[h:value=json.get(macro.args,"value")]
[h:tokenName=json.get(macro.args,"tokenName")]

[h:value=replace(value,"\\s*\$","")]

[h:setLibProperty(prop,encode(value),tokenName)]




[h,if(isDialogVisible("Settings")==1),code:{
[macro("campaign/Campaign Settings@this"):""]
};{}]