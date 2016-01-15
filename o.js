var go = true;
var c;
var h;
var w;
var mid;
var MAX = 80;
var dist = 2;

out("t1", "50");
init();

function init(){
  var c = document.getElementById("canvas1");
  c.style.left = "310px";
  c.style.top = "20px";

}

function animate(){
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  var h = c.height = 300;
  var w = c.width = 300;
  var objs = [{a: 0}];
  ctx.translate(w / 2, h / 2);
  animate_(ctx, objs, 0);
}

function animate_(ctx, objs, frame){
  var c = document.getElementById("canvas1");
  var h = c.height;
  var w = c.width;

  var period = read("t1", "int");
  var time = (new Date()).getTime();
  var newObjs = updateObjects(objs);
  render(ctx, {h: h, w: w}, newObjs, frame);
  var nextAnimateTime = time + period - (new Date()).getTime();

  if(go){
    setTimeout(function(){animate_(ctx, newObjs, frame + 1)}, nextAnimateTime);
  }
}

function updateObjects(objs){
  //console.log(objs);
  var angle = objs[0].a;
  if(angle >= 2 * Math.PI){
    angle = 0;
  }
  out("t4", "Angle: " + angle);
  var newObj = {a: angle + (Math.PI / 64)};
  objs.unshift(newObj);
  return objs.slice(0, Math.max(60, objs.length - 1));
}


function render(ctx, c, objs, frame){
  var x, y;
  var rgb;
  var i = 0;
  var xs = "";
  var ys = "";
  clear(ctx, c);
  out("t2", "objs.length: " + objs.length);
  out("t5", "RGB: ___");
  out("t6", "frame: " + frame);

  ctx.beginPath();
  ctx.moveTo(0, 0);

  for(i = 0; i < objs.length; i++){
    rgb = rgb_(i);
    out("t5", "RGB: " + rgb);

    ctx.strokeStyle = rgb;

    x = Math.floor(i * 2 * Math.sin(objs[i].a));
    y = Math.floor(i * 2 * Math.cos(objs[i].a));
    out("t3", "Last x,y: " + Math.floor(x) + ", " + Math.floor(y));
    xs = xs + x + ",";
    ys = ys + y + ",";
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  //console.log("xs: " + xs);
  //console.log("ys: " + ys);
}

function rgb_(i){
  //var r = time % 255;
  var r = i * 4;
  var g = 255 - i * 4;
  var b = 255 - i * 4;
  return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
}

function toHex(i){
  str = i.toString(16);
  if(str.length == 1){
    return "0" + str;
  }else{
    return str;
  }
}

function clear(ctx, c){
  var left = -(c.w / 2);
  var top = -(c.h / 2);
  ctx.clearRect(left, top, c.w + 200, c.h + 200);
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
