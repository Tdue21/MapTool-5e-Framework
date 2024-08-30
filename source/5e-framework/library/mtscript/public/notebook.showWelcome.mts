[h:value=getLibProperty("Value",function.getNamespace())]
[h:descr=json.get(value,"1. Getting Started")]
[h:share=if(isGM()==1, 0, 1)] 
[macro("notebook/Content@org.maptool.dnd5e"):"key=1. Getting Started;description="+encode(descr)+";tokenName=Lib:Welcome;share="+share]