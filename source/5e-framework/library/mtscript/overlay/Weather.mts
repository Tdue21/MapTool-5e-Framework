[h:color=listget(macro.args,0)]
[h:pattern=listget(macro.args,1)]
[h:effect=listget(macro.args,2)]

[h:cloudy   = " 10,  30,  70, 0.25"]
[h:night    = "  5,  12,  50, 0.5"]
[h:sunset   = "200, 120, 150, 0.2"]
[h:fog      = "200, 200, 200, 0.2"]
[h:noon     = "255, 255, 251, 0.3"]
[h:dawn     = "255, 128,   0, 0.1"]
[h:dusk     = "255,  64,   0, 0.1"]
[h:desert   = "255, 200,   0, 0.2"]
[h:moonlight= "  0,   0, 200, 0.2"]
[h:starlight= "  0,   0, 150, 0.3"]
[h:twilight = "  0,   0, 100, 0.4"]
[h:clear    = "  0,   0,   0, 0"]

[h,switch(pattern),code:
	case 1:{
		[macro("overlay/Rain@this"):""]
		};
	case 2:{
		[macro("overlay/Snow@this"):""]
		};
	case 3:{
		[macro("overlay/Blood Rain@this"):""]
		};
	case 4:{
		[macro("overlay/Falling Leaves@this"):""]
		};
	case 5:{
		[macro("overlay/Falling Petals@this"):""]
		};
	case 6:{
		[macro("overlay/Fog@this"):""]
		};
	case 7:{
		[macro("overlay/Rain Overhead@this"):""]
		};
	case 8:{
		[macro("overlay/Smoke@this"):""]
		};
	default:{
		[h:closeOverlay("Weather")]
}]

[h,switch(color):
	case 1:color=cloudy;
	case 2:color=night;
	case 3:color=sunset;
	case 4:color=fog;
	case 5:color=noon;
	case 6:color=dawn;
	case 7:color=dusk;
	case 8:color=desert;
	case 9:color=moonlight;
	case 10:color=starlight;
	case 11:color=twilight;
	default:color=clear]
[macro("overlay/Sky Color@this"):color]

[h,switch(effect),code:
case 1:{
	[macro("overlay/Lightning@this"):""]
	};
default:{
	[h:closeOverlay("Lightning")]
}]