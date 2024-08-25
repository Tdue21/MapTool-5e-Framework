[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:object=getStrProp(macro.args,"object")]

[h:id=findToken(tokenName)]

[h:switchToken(id)]

[h:res=input("currentItem|Features,Actions,Reactions,Legendary Actions,Lair Actions,Regional Effects|Group|list|value=string")]
[h:abort(res)]

[h:group=if(currentItem=="Features","feats","actions")]

[h:CurrentObject=json.get(object,group)]

[h,if(json.type(CurrentObject)=="UNKNOWN"):CurrentObject="{}"]

[h:currentDescription=json.get(CurrentObject,currentItem)]

[h:currentDescription=replace(currentDescription,"\\+","PLUSPLACEHOLDER")]

[h:currentDescription=decode(currentDescription)]

[h:currentDescription=replace(currentDescription,"PLUSPLACEHOLDER","+")]

[macro("Change Form@Lib:Bestiary"):"group="+group+";name="+currentItem+";tokenName="+tokenName+";description="+currentDescription)]