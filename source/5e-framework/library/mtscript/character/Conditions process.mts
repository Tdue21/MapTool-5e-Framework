[h:Dead=json.get(macro.args,"Dead")]
[h:Dying=json.get(macro.args,"Dying")]
[h:Concentrating=json.get(macro.args,"Concentrating")]
[h:Blinded=json.get(macro.args,"Blinded")]
[h:Grappled=json.get(macro.args,"Grappled")]
[h:Poisoned=json.get(macro.args,"Poisoned")]
[h:Charmed=json.get(macro.args,"Charmed")]
[h:Incapacitated=json.get(macro.args,"Incapacitated")]
[h:Prone=json.get(macro.args,"Prone")]
[h:Deafened=json.get(macro.args,"Deafened")]
[h:Invisible=json.get(macro.args,"Invisible")]
[h:Restrained=json.get(macro.args,"Restrained")]
[h:Exhaustion=decode(json.get(macro.args,"Exhaustion"))]
[h:Paralyzed=decode(json.get(macro.args,"Paralyzed"))]
[h:Stunned=decode(json.get(macro.args,"Stunned"))]
[h:Frightened=decode(json.get(macro.args,"Frightened"))]
[h:Petrified=decode(json.get(macro.args,"Petrified"))]
[h:Unconscious=decode(json.get(macro.args,"Unconscious"))]



[h:selectedToken=getSelected()]
[h,count(listcount(selectedToken)),code:{

	[h:currentId=listget(selectedToken,roll.count)]
	[h:tokenName=getName(currentId)]

	[h,if(Dead==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Dead"]
	}]

	[h,if(Dying==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Dying"]
	}]

	[h,if(Concentrating==""),code:{};{
		[h,if(getPropertyType(currentId)=="NPC"):lib="Lib:Bestiary";lib="Lib:Character"]
		[macro("Concentration@"+lib):"tokenName="+tokenName]
	}]

	[h,if(Blinded==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Blinded"]
	}]

	[h,if(Grappled==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Grappled"]
	}]

	[h,if(Poisoned==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Poisoned"]
	}]

	[h,if(Charmed==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Charmed"]
	}]

	[h,if(Incapacitated==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Incapacitated"]
	}]

	[h,if(Prone==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Prone"]
	}]

	[h,if(Deafened==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Deafened"]
	}]

	[h,if(Invisible==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Invisible"]
	}]

	[h,if(Restrained==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Restrained"]
	}]

	[h,if(Exhaustion==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Exhaustion"]
	}]

	[h,if(Paralyzed==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Paralyzed"]
	}]

	[h,if(Stunned==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Stunned"]
	}]

	[h,if(Frightened==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Frightened"]
	}]

	[h,if(Petrified==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Petrified"]
	}]

	[h,if(Unconscious==""),code:{};{
		[macro("Conditions@Lib:Character"):"tokenName="+tokenName+";condition=Unconscious"]
	}]
	

}]


[macro("Conditions Menu@Lib:Character"):""]
