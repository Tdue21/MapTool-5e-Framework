[h:playerlist=getAllPlayerNames()]
[h:title=getStrProp(macro.args,"key")]

[h:res=input("target|all,GM,"+playerlist+"|Share to|List|value=string",
"medium|Chat,Map,Share Window,Overlay|Share to|List",
"self|1|Copy to self|Check")]
[h:abort(res)]

[h,if(self==1 && target!="all"):target=listappend(target,"self")]

[h,switch(medium):
case 1:share=macroLinkText("notebook/Share on map@this", "none",macro.args+";target="+target);
case 2:share=macroLinkText("notebook/Content@this", "none",macro.args);
case 3:share=macroLinkText("overlay/Shared Content Overlay@this", "none",macro.args);
default:share="Notes: <a style='text-decoration:none' href='"+macroLinkText("notebook/Content@this", "none",macro.args)+"'>"+title+"</a>"]


[h,if(medium==0):broadcast(share,target);execLink(share,0,if(medium==1,"self",target))]