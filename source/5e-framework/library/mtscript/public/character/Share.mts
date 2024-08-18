[h:playerlist=getAllPlayerNames()]
[h:prop=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:name=function.Capitalize(name)]

[h,if(matches(macro.args,".*\\!\\[.*")==1),code:{

[h:prop="image"]

[h:description=decode(macro.args)]

[h:name="Open Image"]


}]

[h:res=input("target|all,GM,"+playerlist+"|Share to|List|value=string",
"medium|Chat,Share Window,Overlay|Share to|List",
"self|1|Copy to self|Check")]
[h:abort(res)]

[h,if(self==1 && target!="all"):target=listappend(target,"self")]

[h,switch(medium):
case 1:share=macroLinkText("Shared Frame@Lib:Character", "none", macro.args);
case 2:share=macroLinkText("Shared Overlay@Lib:Overlay", "none", macro.args);
default:share=prop+": <a style='text-decoration:none' href='"+macroLinkText("Shared Frame@Lib:Character", "none", macro.args)+"'>"+name+"</a>"]

[h,if(medium==0):broadcast(share,target);execLink(share,0,target)]