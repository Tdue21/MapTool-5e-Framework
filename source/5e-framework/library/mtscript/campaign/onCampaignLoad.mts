[h,macro("Loading@Lib:Overlay"):"Setting Starting Map"]

[h:start=getLibProperty("Start","Lib:Campaign")]

[h:setCurrentMap(start)]

[h:link=macroLinkText("deferredCalls@Lib:Campaign")]
[h:execLink(link,1,"self")]

[h,macro("Loading@Lib:Overlay"):"Defining Functions"]
[h:defineFunction("function.DiceRoll", "function.DiceRoll@Lib:Campaign")]
[h:defineFunction("function.Capitalize", "function.Capitalize@Lib:Campaign")]
[h:defineFunction("function.previousInitiative", "function.previousInitiative@Lib:Campaign")]
[h:defineFunction("function.internalLink", "function.internalLink@Lib:Campaign")]
[h:defineFunction("pause","function.pause@Lib:Campaign")]
[h:defineFunction("function.AskOutput","function.AskOutput@Lib:Campaign")]
[h:defineFunction("function.EvalMacro","function.EvalMacro@Lib:Campaign")]
[h:defineFunction("function.GetConditions","function.GetConditions@Lib:Campaign")]


[h:loadAudio=getLibProperty("LoadAudio","Lib:Campaign")]
[h,macro("Loading@Lib:Overlay"):"Loading Audio Clips"]
[h,if(loadAudio==1),code:{
[h:clipList=getLibProperty("Audio","Lib:Campaign")]
	[h,count(listcount(clipList)),code:{
		[h:clip=listget(clipList,roll.count)]
		[h:playClip(clip,1,0)]
	}]

[h:doorClip=getLibProperty("Door","Lib:Campaign")]
[h:playClip(doorClip,1,0)]

};{}]
[h,macro("Loading@Lib:Overlay"):"Loading Welcome message"]
[h:resources="<a href='https://dnd.wizards.com/articles/features/basicrules'>dnd.wizards.com</a>"]
[h:customMSG=getLibProperty("Welcome","Lib:Campaign")]

[h,macro("Markdown@Lib:Campaign"):"description="+customMSG]

[h:customMSG=replace(macro.return,"<a href=","<font color=#4183C4 style='text-decoration:none'><a href=")]
[h:customMSG=replace(customMSG,"</a>","</a></font>")]
[h:customMSG=replace(customMSG,"<code>","<font color=maroon><code>")]
[h:customMSG=replace(customMSG,"</code>","</code></font>")]
[h:customMSG=replace(customMSG,"<ul>","<ul style='margin-left:15px;margin-bottom:0px'>")]
[h:customMSG=replace(customMSG,"<ol>","<ol style='margin-left:15px;margin-bottom:0px'>")]

[h:html='

<font color=blue><i>Framework Version: '+getLibProperty("libversion","Lib:Campaign")+'</i></font>

<div style="background-color: #f6f8fa;border: 2px solid #ABB3A1;border-left: 1px solid #ABB3A1;border-right: 1px solid #ABB3A1; margin:5px ; padding:5px">

<h1 style="border-bottom: 1px solid #ABB3A1; font-size: 12px;margin-bottom:5px;margin-top:3px">Welcome, '+getPlayerName()+'!</h1>

'+customMSG+'


</div>

']



[h:broadcast(html,"self")]
[h,macro("Loading@Lib:Overlay"):"Loading Interface Overlay"]
[h,macro("OverlayMiniMenu@Lib:Overlay"):""]
[h,macro("OverlaySelected@Lib:Overlay"):""]
[h,macro("Weather@Lib:Overlay"):getLibProperty("Weather","Lib:Campaign")]

[h,macro("Tables List@Lib:Tables"):""]

[h:closeOverlay("loading")]