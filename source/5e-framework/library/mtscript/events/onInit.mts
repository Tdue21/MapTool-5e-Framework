<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- **                                                                   ** -->
<!-- **                           onInit                                  ** -->
<!-- **                                                                   ** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
[h:library = "dovesoft.dnd5e"]

[h:link=macroLinkText("campaign/deferredCalls@this")]
[h:execLink(link,1,"self")]

[h,macro("overlay/Loading@this"):"Defining Functions"]

[h:defineFunction("function.DiceRoll",           "campaign/function.DiceRoll@this")]
[h:defineFunction("function.Capitalize",         "campaign/function.Capitalize@this")]
[h:defineFunction("function.previousInitiative", "campaign/function.previousInitiative@this")]
[h:defineFunction("function.internalLink",       "campaign/function.internalLink@this")]
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
[h:defineFunction("function.showNotebook",       "function.showNotebook@this")]
[h:defineFunction("function.reloadOverlays",     "function.reloadOverlays@this")]
[h:defineFunction("function.shareImage",         "function.shareImage@this")]
[h:defineFunction("function.getDistance",        "function.getDistance@this")]
[h:defineFunction("function.getAssetId",         "function.getAssetId@this")]
[h:defineFunction("pause",                       "function.pause@this")]

[h:defineFunction("function.getDiceRoll",        "diceroller/function.getDiceRoll@this")]
[h:defineFunction("function.getHigherLevel",     "diceroller/function.getHigherLevel@this")]

[h:defineFunction("function.listCharacters",     "function.listCharacters@this")]
[h:defineFunction("function.listNotebooks",      "function.listNotebooks@this")]

[h:defineFunction("campaign.menu",               "campaign.menu@this")]
[h:defineFunction("campaign.selectMap",          "campaign.selectMap@this")]
[h:defineFunction("campaign.notebooks",          "campaign.notebooks@this")]
[h:defineFunction("campaign.compendium",         "campaign.compendium@this")]
[h:defineFunction("campaign.search",             "campaign.search@this")]
[h:defineFunction("campaign.loadOverlays",       "campaign.loadOverlays@this")]
[h:defineFunction("campaign.shareImage",         "campaign.shareImage@this")]
[h:defineFunction("campaign.getDistance",        "campaign.getDistance@this")]
[h:defineFunction("campaign.state",              "campaign.state@this")]
[h:defineFunction("campaign.conditions",         "campaign.conditions@this")]
[h:defineFunction("campaign.visibility",         "campaign.visibility@this")]
[h:defineFunction("campaign.fog",                "campaign.fog@this")]
[h:defineFunction("campaign.statBlock",          "campaign.statBlock@this")]
[h:defineFunction("campaign.diceRoller",         "campaign.diceRoller@this")]

[h:defineFunction("token.createToken",           "token.createToken@this")]
[h:defineFunction("token.character",             "token.character@this")]
[h:defineFunction("token.description",           "token.description@this")]
[h:defineFunction("token.spellCasting",          "token.spellCasting@this")]
[h:defineFunction("token.statBlock",             "token.statBlock@this")]

[h:defineFunction("token.interact",              "token.interact@this")]
[h:defineFunction("token.rest",                  "token.rest@this")]
[h:defineFunction("token.areaTemplate",          "token.areaTemplate@this")]
[h:defineFunction("token.range",                 "token.range@this")]
[h:defineFunction("token.light",                 "token.light@this")]
[h:defineFunction("token.decreaseElevation",     "token.decreaseElevation@this")]
[h:defineFunction("token.increaseElevation",     "token.increaseElevation@this")]

[h:defineFunction("gm.clearInitiative",          "gm.clearInitiative@this")]
[h:defineFunction("gm.prevInitiative",           "gm.prevInitiative@this")]
[h:defineFunction("gm.nextInitiative",           "gm.nextInitiative@this")]
[h:defineFunction("gm.exposeFog",                "gm.exposeFog@this")]
[h:defineFunction("gm.manageParty",              "gm.manageParty@this")]
[h:defineFunction("gm.moveTokens",               "gm.moveTokens@this")]
[h:defineFunction("gm.requestRoll",              "gm.requestRoll@this")]
[h:defineFunction("gm.setMap",                   "gm.setMap@this")]
[h:defineFunction("gm.showHideToken",            "gm.showHideToken@this")]

[h,macro("overlay/Loading@this"):"Loading Audio Clips"]

[h:loadAudio=getLibProperty("loadAudio", library)]

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

[h:"<!-- -->"]

[h:html='<div style="font-family: sans-serif; color: #111111; background-color: #f6f8fa; ' + 
'border: 3px solid #ABB3A1; border-left: 1px solid #ABB3A1; border-top: 1px solid #ABB3A1; margin: 5px; padding: 5px;">
<h1 style="border-bottom: 1px solid #ABB3A1; font-size: 12px;margin:0px;margin-top:3px">Welcome, '+getPlayerName()+'!</h1>
<p>'+customMSG+'</p>
<p><i>Framework Version: '+libVersion+'</i></p>
</div>
']
[h:broadcast(html,"self")]

[h,macro("overlay/Loading@this"):"Loading Interface Overlay"]

[h,macro("overlay/OverlayMiniMenu@this"):""]
[h,macro("overlay/OverlaySelected@this"):""]
[h,macro("overlay/Weather@this"):getLibProperty("Weather",library)]
[h,macro("tables/Tables List@this"):""]

[h:closeOverlay("loading")]

[h:broadcast("onInit done")]