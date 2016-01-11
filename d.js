//
// Rotate the canvas outline boxes
//
// Can't remember exactly what I was trying to see with this one
// or how long I used it for.
//

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

function animate(){
  var time = (new Date()).getTime();
  render();
  var nextAnimateTime = time + period - (new Date()).getTime();
  //console.log("Writing out at " + nextAnimateTime);
  console.log("Drawing took (" + (new Date()).getTime() + ", " + time + ") " + ((new Date()).getTime() - time));
  if(go){
    setTimeout(function(){animate()}, nextAnimateTime);
  }
}

function render(){
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  var time = (new Date()).getTime();
  var x = Math.floor(c.width / 2);
  var y = Math.floor(c.height / 2);

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  ctx.strokeRect(0, 0, c.width, c.height);
  ctx.strokeRect(4, 4, c.width - 4, c.height - 4);

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
