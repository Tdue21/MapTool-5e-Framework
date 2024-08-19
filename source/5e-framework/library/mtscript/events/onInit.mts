[h:library = "org.maptool.dnd5e"]

[h,macro("overlay/Loading@this"):"Setting Starting Map"]
[h:start=getLibProperty("Start", library)]
[h:setCurrentMap(start)]

[h:link=macroLinkText("campaign/deferredCalls@this")]
[h:execLink(link,1,"self")]

[h,macro("overlay/Loading@this"):"Defining Functions"]

[h:defineFunction("function.DiceRoll",           "campaign/function.DiceRoll@this")]
[h:defineFunction("function.Capitalize",         "campaign/function.Capitalize@this")]
[h:defineFunction("function.previousInitiative", "campaign/function.previousInitiative@this")]
[h:defineFunction("function.internalLink",       "campaign/function.internalLink@this")]
[h:defineFunction("pause",                       "campaign/function.pause@this")]
[h:defineFunction("function.AskOutput",          "campaign/function.AskOutput@this")]
[h:defineFunction("function.EvalMacro",          "campaign/function.EvalMacro@this")]
[h:defineFunction("function.GetConditions",      "campaign/function.GetConditions@this")]

[h:defineFunction("function.getNamespace",       "function.getNamespace@this")]
[h:defineFunction("function.getOutput",          "function.getOutput@this")]
[h:defineFunction("function.getCss",             "function.getCss@this")]
[h:defineFunction("function.showMenu",           "function.showMenu@this")]
[h:defineFunction("function.selectMap",          "function.selectMap@this")]
[h:defineFunction("function.search",             "function.search@this")]
[h:defineFunction("function.showCompendium",     "function.showCompendium@this")]
[h:defineFunction("function.showNotebooks",      "function.showNotebooks@this")]
[h:defineFunction("function.reloadOverlays",     "function.reloadOverlays@this")]
[h:defineFunction("function.shareImage",         "function.shareImage@this")]
[h:defineFunction("function.getDistance",        "function.getDistance@this")]

[h,macro("overlay/Loading@this"):"Loading Audio Clips"]

[h:loadAudio=getLibProperty("LoadAudio", library)]

[h,if(loadAudio==1),code:{
    [h:clipList=getLibProperty("Audio",library)]
    [h,foreach(clip, clipList, ""), code: {
	    [h:playClip(clip,1,0)]
    }]

    [h:doorClip=getLibProperty("Door",library)]
    [h:playClip(doorClip,1,0)]
};{}]

[h,macro("overlay/Loading@this"):"Loading Welcome message"]

[h:resources="<a href='https://dnd.wizards.com/articles/features/basicrules'>dnd.wizards.com</a>"]
[h:customMSG=getLibProperty("Welcome",library)]

[h,macro("campaign/Markdown@this"):"description="+customMSG]

[h:customMSG=replace(macro.return,"<a href=","<font color=#4183C4 style='text-decoration:none'><a href=")]
[h:customMSG=replace(customMSG,"</a>","</a></font>")]
[h:customMSG=replace(customMSG,"<code>","<font color=maroon><code>")]
[h:customMSG=replace(customMSG,"</code>","</code></font>")]
[h:customMSG=replace(customMSG,"<ul>","<ul style='margin-left:15px;margin-bottom:0px'>")]
[h:customMSG=replace(customMSG,"<ol>","<ol style='margin-left:15px;margin-bottom:0px'>")]

[h:libInfo = library.getInfo(library)]
[h:libVersion = json.get(libInfo, "version")]

[h:html='
<font color=blue><i>Framework Version: '+libVersion+'</i></font>
<div style="background-color: #f6f8fa;border: 2px solid #ABB3A1;border-left: 1px solid #ABB3A1;border-right: 1px solid #ABB3A1; margin:5px ; padding:5px">
<h1 style="border-bottom: 1px solid #ABB3A1; font-size: 12px;margin-bottom:5px;margin-top:3px">Welcome, '+getPlayerName()+'!</h1>
'+customMSG+'
</div>
']
[h:broadcast(html,"self")]

[h,macro("overlay/Loading@this"):"Loading Interface Overlay"]

[h,macro("overlay/OverlayMiniMenu@this"):""]
[h,macro("overlay/OverlaySelected@this"):""]
[h,macro("overlay/Weather@this"):getLibProperty("Weather",library)]
[h,macro("tables/Tables List@this"):""]

[h:closeOverlay("loading")]
