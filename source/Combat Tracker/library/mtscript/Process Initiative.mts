[h:action = json.get(macro.args, "action")]
[h:tokenId = if(json.contains(macro.args, "tokenId"), json.get(macro.args, "tokenId"), "")]

[h,switch(action), code:
	case "sorta": {
		[h:sortInitiative(true)]
	};
	case "sortd": {
		[h:sortInitiative(false)]
	};
	case "clear": {
		[h:link=macroLinkText("Clear Initiative@this", "")]
		[h:execLink(link, 0)]
	};
	case "prev": {
		[h:prevInitiative()]
	};
	case "next": {
		[h:nextInitiative()]		
	};
	case "refresh": {
		
	};
	case "roll": {
		[h:roll = 1d20]
		[h,if(tokenId != ""), code: {
			[h:link = macroLinkText("Set Initiative@this", "", "tokenName=" + tokenId + " ; value=" + roll)]
		};{
			[h:link = macroLinkText("Mass Initiative@this", "")]
		}]
		[h:execLink(link, 0)] 
	};

	case "enter": {
		[h:value = if(json.contains(macro.args, "value"), json.get(macro.args, "value"), "")]
		[h:setInitiative(value, tokenId)]
	};

	default: {
		
	}	
]


[h,if(isFrameVisible("Combat Tracker")==1),code:{
	[h,macro("Initiative Frame@this"):json.set("{}", "current", tokenId)]
};{}]