[h:playerlist=getAllPlayerNames()]

[h:res=input("target|all,GM,"+playerlist+"|Share to|List|value=string",
"medium|Chat,Share Window,Overlay|Share to|List",
"self|1|Copy to self|Check")]
[h:abort(res)]

[h,if(self==1 && target!="all"):target=listappend(target,"self")]

[h,switch(medium):
case 1:share=macroLinkText("Shared Frame@Lib:Bestiary", "none", macro.args);
case 2:share=macroLinkText("Shared NPC Overlay@Lib:Overlay", "none", macro.args);
default:share="NPCs: <a style='text-decoration:none' href='"+macroLinkText("Shared Frame@Lib:Bestiary", "none", macro.args)+"'>"+macro.args+"</a>"]

[h,if(medium==0):broadcast(share,target);execLink(share,0,target)]