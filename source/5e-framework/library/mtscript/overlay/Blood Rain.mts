[overlay("Weather", "zorder=-2"): {
	[r: '
<html>
<head>
<meta charset="UTF-8">
<title>Canvas Rain Effect</title>
<link rel="stylesheet" type="text/css" href="RainCSS@Lib:WeatherGirl">
</head>
<body>
<canvas id="canvas"></canvas>
<script type="text/javascript">
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.strokeStyle = "rgba(250,50,80,0.7)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    var init = [];
    var maxParts = 1000;
    for (var a = 0; a < maxParts; a++) {
      init.push({
        x: Math.random() * w,
        y: Math.random() * h,
        l: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10
      })
    }

    var particles = [];
    for (var b = 0; b < maxParts; b++) {
      particles[b] = init[b];
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var c = 0; c < particles.length; c++) {
        var p = particles[c];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
      }
      move();
    }

    function move() {
      for (var b = 0; b < particles.length; b++) {
        var p = particles[b];
        p.x += p.xs;
        p.y += p.ys;
        if (p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -20;
        }
      }
    }
    setInterval(draw, 30);
</script>
</body>
</html>
' ]
}]