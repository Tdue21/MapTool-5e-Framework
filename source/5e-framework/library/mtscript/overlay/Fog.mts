
[h: css=strformat('
.fogcontainer {overflow: hidden;}
.sliding-background-fog {
	position: absolute;
	left:-50vw;
	top:-50vh;
	display: inline-block;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	height: 200vh;
	width:300vw;
	background-image:url('+tableImage("Effects","5")+');
	background-repeat: repeat; 
	animation-timing-function: linear;
	opacity: 0.6;
}

.first-layer {
	left:-100vw;
	animation: first-layer-anim 85s infinite;
}
.second-layer {
	left:-80vw;
	transform:scale(-1, -1);
	animation: second-layer-anim 55s infinite;
}
@keyframes first-layer-anim {
  0% {transform:translateX(0);}
 50% {transform:translateX(-256px) skewX(15deg) scaleY(.75);}
100% {transform:translateX(-512px) ;}
}
@keyframes second-layer-anim {
  0% {transform:scale(-1, -1); }
 45% {transform:scale(-.78, -1.2) translate(230px, -19vh) skewX(28deg);}
 50% {transform:scale(-.8, -1.2) translate(256px, -20vh) skewX(30deg);}
 55% {transform:scale(-.78, -1.2) translate(282px, -19vh) skewX(28deg);}
100% {transform:scale(-1, -1) translateX(512px);}
}')]
[overlay("Weather", "zorder=-1"): {
	
[r: strformat('
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
%{css}
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<div class="fogcontainer">
	<div class="sliding-background-fog first-layer"></div>
	<div class="sliding-background-fog second-layer"></div>
</div>
</body>
</html>
')]
}]