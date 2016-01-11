var go = true;
var period = 500;
var c;
var ctx;

function animate(){
  c = document.getElementById("canvas1");
  ctx = c.getContext("2d");

  //c.width = 500;
  //c.height = 300;

  var time = (new Date()).getTime();
  render();
  var nextAnimateTime = time + period - (new Date()).getTime();
  //console.log("Writing out at " + nextAnimateTime);
  //console.log("Drawing took (" + (new Date()).getTime() + ", " + time + ") " + ((new Date()).getTime() - time));
  if(go){
    setTimeout(function(){animate()}, nextAnimateTime);
  }
}

function render(){
  var time = (new Date()).getTime();
  var x = Math.floor(c.width / 2);
  var y = Math.floor(c.height / 2);

  out("t1", (new Date()).getTime() + " - x,y: " + x + "," + y);

  ctx.strokeStyle = "#000000";
  ctx.strokeRect(10, 10, c.width - 20, c.height - 20);

  ctx.fillStyle = "#F00";
  ctx.beginPath();
  ctx.arc(x,y,2,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#0F0";
  ctx.beginPath();
  ctx.arc(x/2,y/2,2,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#00F";
  ctx.beginPath();
  ctx.arc(x,y/2,2,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#A0F";
  ctx.beginPath();
  ctx.arc(x,y/2 - 6,2,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#0AA";
  ctx.beginPath();
  ctx.arc(x,y/2 - 10,1,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#56A";
  ctx.beginPath();
  ctx.arc(x,y/2 - 8,1,0,2*Math.PI);
  ctx.fill();

  angle = 2 * Math.PI / 32;
  ctx.rotate(angle);
  out("t4", "Angle: " + angle);
  xTrans = x - (Math.cos(angle) * x);
  out("t2", "xTrans = " + xTrans);
  yTrans = -Math.sin(angle) * x;
  out("t3", "yTrans = " + yTrans);
  ctx.translate(xTrans, yTrans);
}

function out(field, text){
  document.getElementById(field).value = text;
}
