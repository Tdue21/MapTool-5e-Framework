[h: css='
* {
	margin:0;
	padding:0;
	box-sizing:border-box;
}
.overheadRain {
  background-color: transparent;
  position:fixed;
  top:0;
  left:0;
}']
[h: js='
var cnv0;
var cnv1;
var ctx0;
var ctx1;
var ctx1_globalAlpha = 0.42;

var wWidth = window.innerWidth;
var wHeight= window.innerHeight;
var eye = new Vector3D(wWidth/2, wHeight/2, Math.max(wWidth, wHeight));

var fov = 200;
var drops = new Array();
var dropRadius = 5;
var splashDrops = new Array();
var splashFrames = 8;
var maxdrops=350;
var zStart = 1240;
var zEnd = 0;
var fallrate = new Vector3D(0,0,zStart/-4);
var t0;
var dt;
var fps = 60;
var force;
var acc;
var numOrbiters = 500;
var numAttractors = 3;

var forceField;
var forceTheta = 0;

function Particle(radius,r,g,b,a,gradient,mass){
	if(typeof(radius)==="undefined") radius = 5;
	if(typeof(r)==="undefined") r = 174;
	if(typeof(g)==="undefined") g = 194;
	if(typeof(b)==="undefined") b = 224;	
	if(typeof(a)==="undefined") a = 0.7;
	if(typeof(gradient)==="undefined") gradient = true;
	if(typeof(mass)==="undefined") mass = 1;	
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	this.r_ = Math.max(0, this.r-80);
	this.g_ = Math.max(0, this.g-80);
	this.b_ = Math.max(0, this.b-80);
	this.a_ = Math.round(Math.max(0,   this.a-0.3),4);
	this.colour = "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
	this.colour_ = "rgba("+this.r_+","+this.g_+","+this.b_+","+this.a_+")";
	this.radius = dropRadius;
	this.mass = mass;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.lastx = 0;
	this.lasty = 0;
	this.lastScale = 1;
	this.vx = 0;
	this.vy = 0;
	this.vz = 0;
	this.splash = -1;
	this.splashColour = "#9999ff66";
}
Particle.prototype = {
	get pos3D (){return new Vector3D(this.x,this.y,this.z);},
	set pos3D (pos){
		this.x = pos.x;
		this.y = pos.y;
		this.z = pos.z;
	},
	get velo3D (){return new Vector3D(this.vx,this.vy,this.vz);	},
	set velo3D (velo){
		this.vx = velo.x;
		this.vy = velo.y;
		this.vz = velo.z;
	},
	draw: function (context) { 
		if(this.z < -fov) {return};
		var scale = (fov+this.z)/fov;
		var x2d = (this.x * scale) + wWidth/2;
		var y2d = (this.y * scale) + wHeight/2;
		if(this.lastx==0) {
			var scale_ = scale;
			var x2d_ = x2d;
			var y2d_ = y2d;
		} else {
			var scale_ = this.lastScale;
			var x2d_ = (this.lastx * scale_) + wWidth/2;
			var y2d_ = (this.lasty * scale_) + wHeight/2;
		}		
		
		this.lastx = this.x;
		this.lasty = this.y;
		this.lastScale = scale;
		
		if( x2d < 0 || x2d > wWidth || y2d < 0 || y2d > wHeight ) {} else {
			var grd = context.createRadialGradient(x2d, y2d, 0, x2d, y2d, 4);
			grd.addColorStop(1, this.colour);
			grd.addColorStop(0, this.colour_);
			context.strokeStyle = grd;
			context.fillStyle = grd;
			context.lineWidth = this.radius/scale;
			context.lineCap = "round";
			context.beginPath();
			context.moveTo(x2d,y2d);
			context.lineTo(x2d_,y2d_);
			context.stroke();
			context.fill();
		}
	},
	drawSplash: function (context, step) {
		var scale = (fov+this.z)/fov;
		var x2d = (this.x * scale) + wWidth/2;
		var y2d = (this.y * scale) + wHeight/2;
		this.radius = this.radius * 1.18;
		var grad = context.createRadialGradient(x2d,y2d,0,x2d,y2d,this.radius);
		grad.addColorStop(0,"transparent");
		grad.addColorStop(0.6,"transparent");
		grad.addColorStop(0.9,this.splashColour);
		grad.addColorStop(1,"transparent");
		context.fillStyle = grad;
		context.beginPath();
		context.arc(x2d, y2d, this.radius, 0, 2*Math.PI, true);
		context.closePath();
		context.fill();
	}
};
Particle.prototype.constructor = Particle;

function Vector3D(x,y,z) {
	this.x = x;
	this.y = y;	
	this.z = z;	
}		
Vector3D.prototype = {		
	add: function(vec) {return new Vector3D(this.x + vec.x,this.y + vec.y,this.z + vec.z);	},
	incrementBy: function(vec) {
		this.x += vec.x;
		this.y += vec.y;
		this.z += vec.z;		
	},	
	multiply: function(k) {return new Vector3D(k*this.x,k*this.y,k*this.z);	},	
	addScaled: function(vec,k) {return new Vector3D(this.x + k*vec.x, this.y + k*vec.y, this.z + k*vec.z);}
};		

function Forces(){}
Forces.zeroForce = function() {	return (new Vector3D(0,0,0));}
Forces.forceField = function(q,E) {	return E.multiply(q);}
Forces.add = function(arr){
		var forceSum = new Vector3D(0,0,0);
		for (var i=0; i<arr.length; i++){
		var force = arr[i];
		forceSum.incrementBy(force);
	}
	return forceSum;
}

function init() {
	//create canvasses
	cnv0 = createCanvas(cnv0);
	ctx0 = cnv0.getContext("2d");
	// create drops
	for (var i=0; i<maxdrops; i++){	
		var drop    = new Particle(18,255,255,255,0.2,true);
		recycleDrop(drop);
		drop.z = Math.random()*zStart;
		drop.draw(ctx0);
		drops.push(drop);
	}	
	
	t0 = new Date().getTime(); 
	animFrame();
}
function createCanvas(canvas) {
	canvas  = document.createElement("canvas");
	canvas.width = wWidth;
	canvas.height = wHeight;
	document.body.appendChild(canvas);
	canvas.classList.add("overheadRain");
	return canvas;
}

function animFrame(){
     setTimeout(function() {
          animId = requestAnimationFrame(animFrame,cnv0);
          onTimer();
     }, 1000/fps);
}

function onTimer(){
	var t1 = new Date().getTime(); 
	dt = 0.001*(t1-t0); 
	t0 = t1;
	if (dt>0.2 || dt == 0) {dt=0.001;};	
	forceTheta += Math.random()*4/(dt);
	move();
}

function move(){
	ctx0.clearRect(0, 0, wWidth, wHeight);

	for (var i=0; i<drops.length; i++){
		var drop = drops[i];
		moveObject(drop, ctx0);
		if(drop.splash==-1) {
			calcForce(drop);
			updateAccel(drop.mass);
			updateVelo(drop);
		};
	};
}

function moveObject(obj, fallingContext){
	if(obj.splash>-1) {
		obj.splash+=1;		
	} else {
		obj.pos3D = obj.pos3D.addScaled(obj.velo3D,dt);
		if (obj.z <= zEnd) { obj.splash+=1; }
	};

	if(obj.splash>=0) {
		obj.drawSplash(fallingContext, obj.splash);
	} else {
		obj.draw(fallingContext);
	};
	if(obj.splash > splashFrames) { recycleDrop(obj);}
}
function updateAccel(mass){	acc = force.multiply(1/mass); }	
function updateVelo(obj){ obj.velo3D = obj.velo3D.addScaled(acc,dt); }
function calcForce(obj){	
	force = Forces.zeroForce();
	if(obj.splash==-1) {
		forceField = Forces.forceField(
			Math.random()*0.04, 
			new Vector3D(
				Math.cos(forceTheta)*wWidth*2, 
				Math.sin(forceTheta)*wHeight/2
				,0)); 
		force = Forces.add([force, forceField]);
	};
}
function recycleDrop(obj){
	obj.pos3D = new Vector3D((Math.random()-0.5)*1.1*wWidth,(Math.random()-0.5)*1.1*wHeight, zStart);
	obj.lastx = 0;
	obj.lasty = 0;
	obj.velo3D = fallrate;
	obj.splash = -1;
	obj.radius = dropRadius;
}
window.onload = init;']
[overlay("Weather", "zorder=-1"): {
	[r: '
<html>
<head>
<meta charset="UTF-8">
<title>Overhead Rain Effect</title>
<style>
%{css}
</style>
</head>
<body>

<script>
'+js+'
</script>
</body>
</html>
' ]
}]