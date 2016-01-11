var go = true;
var period = 500;

function go(){
  alert("hi!");
  return 0;
}

function b(){
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#FFFFA0";
  ctx.strokeRect(0,0,c.width,c.height);
}

function animate(times){
  if(times == undefined){
    time = (new Date()).getTime();
    times = [{rgb: timeRGB(time), time: time, rotations: 0}];
  }
  var date = new Date();
  var time = (new Date()).getTime();
  var numRotates = render(times);
  var nextAnimateTime = time + period - (new Date()).getTime();
  //console.log("Writing out at " + nextAnimateTime);
  console.log("Drawing took (" + (new Date()).getTime() + ", " + time + ") " + ((new Date()).getTime() - time));
  if(go){
    setTimeout(function(){animate(times)}, nextAnimateTime);
  }
}

function render(times){
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  var time = (new Date()).getTime();
  var x = Math.floor(c.width / 2);
  var y = Math.floor(c.height / 2);
  var rgb = timeRGB(time);

  if(times.length >= 16){
    times.shift();
  }

  var rotations = times[0].rotations;
  times.push({rgb: rgb, time: time, rotations: (times[times.length - 1].rotations + 1) % 64});

  ctx.fillStyle = "#FFFFFF";

  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  ctx.strokeRect(0, 0, c.width, c.height);
  ctx.strokeRect(4, 4, c.width - 4, c.height - 4);

  var i = 0;
  for(i = 0; i < 33 - times.length; i++){
    out("t1", 33 - times.length);
    angle = 2 * Math.PI / 32;
    ctx.rotate(angle);
    xTrans = x - (Math.cos(angle) * x);
    out("t2", "xTrans = " + xTrans);
    yTrans = -Math.sin(angle) * x;
    out("t3", "yTrans = " + yTrans);
    ctx.translate(xTrans, yTrans);
  }

  for(i = 0; i < times.length; i++){
    ctx.fillStyle = times[i].rgb;
    ctx.strokeStyle = times[i].rgb;
    if(i % 16 == 0){
      ctx.strokeText("A    n    g    i    e", x, y);
      ctx.strokeRect(x - 5, y - 5, x + 5, y + 5);
      ctx.strokeRect(x - 2, y - 2, x + 2, y + 2);
    }
    angle = Math.PI / 16;
    xTrans = x - (Math.cos(angle) * x);
    yTrans = Math.sin(angle) * x;
    ctx.rotate(angle);
    ctx.translate(xTrans, -yTrans);
  }

  return times;
}

function timeRGB(time){
  //var r = time % 255;
  var r = 90;
  var g = Math.max(100, (time >> 3) % 255);
  var b = Math.max(100, (time >> 6) % 255);
  return ("#" + r.toString(16) + g.toString(16) + b.toString(16)).toUpperCase();
}

function drawLine(){
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  ctx.beginPath();
  ctx.moveTo(10, Math.floor(c.height / 2));
  ctx.lineTo(c.width - 10, Math.floor(c.height / 2));
  ctx.stroke();
}

function skew(){
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  ctx.fillRect(10, 10, 40, 40);
  ctx.transform(1, 0.5, 0.5, 1, 1, 1);
  ctx.fillRect(10, 10, 40, 40);
  ctx.transform(1, 0.5, 0.5, 1, 1, 1);
  ctx.fillRect(10, 10, 40, 40);
}

function rotate(){
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  var x = c.width;
  var y = c.height;

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  ctx.fillRect(10, 10, 40, 40);
  ctx.rotate(Math.PI / 16);
  ctx.translate(Math.floor(6), Math.floor(-7));
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(10, 10, 40, 40);
  ctx.rotate(Math.PI / 16);
  ctx.translate(Math.floor(6), Math.floor(-7));
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(10, 10, 40, 40);
}

function out(field, text){
  document.getElementById(field).value = text;
}
