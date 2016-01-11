//
// No idea where I was going with this one.
// Doesn't seem to do anything.
//

var go = false;
var period = 500;
var c;
var ctx;

function animate(){
  c = document.getElementById("canvas1");
  c.width = 500;
  c.height = 300;
  ctx = c.getContext("2d");
  var time = (new Date()).getTime();
  var x = c.width;
  var y = c.height;
  console.log("B: x,y: " + x + ", " + y);
  render();
  console.log("A: x,y: " + x + ", " + y);
  var nextAnimateTime = time + period - (new Date()).getTime();
  //console.log("Writing out at " + nextAnimateTime);
  console.log("Drawing took (" + (new Date()).getTime() + ", " + time + ") " + ((new Date()).getTime() - time));
  if(go){
    setTimeout(function(){animate()}, nextAnimateTime);
  }
}

function render(){
  var time = (new Date()).getTime();
  var x = Math.floor(c.width / 2);
  var y = Math.floor(c.height / 2);

  out("t1", "x: " + x + ", y: " + y);
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  //ctx.strokeRect(0, 0, c.width, c.height);
  ctx.strokeRect(8, 8, c.width - 8, c.height - 8);

  angle = 2 * Math.PI / 32;
  ctx.rotate(angle);
  xTrans = x - (Math.cos(angle) * x);
  out("t2", "xTrans = " + xTrans);
  yTrans = -Math.sin(angle) * x;
  out("t3", "yTrans = " + yTrans);
  ctx.translate(xTrans, yTrans);
}

function out(field, text){
  document.getElementById(field).value = text;
}
