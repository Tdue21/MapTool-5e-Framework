[h:playerlist=getAllPlayerNames()]
[h:share=macroLinkText("overlay/closeOverlay@this", "none","Shared")]
[h:execLink(share,0,"all")]
[h,if(isGM()==1),code:{
    [h:res=input("var|<html><img src="+getTokenImage()+"-50>,<html><img src="+getTokenPortrait()+"-50>,<html><img src="+getTokenHandout()+"-50>|Output|radio",
"target|all,GM,"+playerlist+"|Share to|List|value=string",
"self|1|Copy to self|Check")]
    [h:abort(res)]
    [r,switch(var):
	    case 0: var = getTokenImage();
	    case 1: var = getTokenPortrait();
	    case 2: var = getTokenHandout()
    ]
    [h:share=macroLinkText("overlay/Handout Overlay@this", "none",var)]
    [h,if(self==1):target=listappend(target,"self")]
    [h:execLink(share,0,target)]
};{}]