var go = true;
var c;
var h;
var w;
var mid;

out("t1", "500");
init();

function init(){
  var c = document.getElementById("canvas1");
  c.style.left = "310px";
  c.style.top = "20px";

}

function animate(){
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  var h = c.height = 500;
  var w = c.width = 500;
  ctx.translate(w / 2, h / 2);
  animate_(ctx);
}

function animate_(ctx){
  var c = document.getElementById("canvas1");
  var h = c.height;
  var w = c.width;

  var period = read("t1", "int");
  var time = (new Date()).getTime();
  out("t2", "Rendering at " + time);
  render(ctx, {h: h, w: w});
  out("t3", "Finished at " + (new Date()).getTime());
  var nextAnimateTime = time + period - (new Date()).getTime();

  if(go){
    setTimeout(function(){animate_(ctx)}, nextAnimateTime);
  }
}

/*
 * Trying to figure out why drawing a white rectangle won't clear out the
 * screen.
 *
 * Ah! I wasn't using "beginPath()"
 */

function render(ctx, c){
  var x = clear(ctx, c);
  ctx.rotate(Math.PI / 32);
  ctx.strokeStyle = "#00F";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 200);
  ctx.stroke();
}

function clear(ctx, c){
  var left = -(c.w / 2);
  var top = -(c.h / 2);
  ctx.clearRect(left, top, c.w, c.h);
}

function out(field, text){
  document.getElementById(field).value = text;
}

function read(field, type){
  return cast(document.getElementById(field).value, type);
}

function cast(value, type){
  switch(type){
    case "int":
      return parseInt(value);
  }
}
