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
  ctx.translate(w / 2, h / 2);
  animate_(ctx, []);
}

function animate_(ctx, objs){
  var c = document.getElementById("canvas1");
  var h = c.height;
  var w = c.width;

  var newObjs = updateObjects(objs);

  var period = read("t1", "int");
  var time = (new Date()).getTime();
  out("t2", "Rendering at " + time);
  render(ctx, {h: h, w: w}, newObjs.slice(0));
  out("t3", "Finished at " + (new Date()).getTime());
  var nextAnimateTime = time + period - (new Date()).getTime();

  if(go){
    setTimeout(function(){animate_(ctx, newObjs)}, nextAnimateTime);
  }
}

function updateObjects(objs){
  var angle = Math.PI / 64;
  var strategies = [-angle, 0, angle];
  var newestObjs;
  var last;
  var strategy;
  var deltaAngle = 0;
  var newAngle = 0;

  if(objs.length < MAX){
    newestObjs = objs.slice(0);
  }else{
    newestObjs = objs.slice(1);
  }

  if(objs.length == 0){
    last = {id: 0, x: 0, y: 0,
            a: 2 * Math.PI * Math.random(),
            strategy: 0,
            da: Math.PI / 32};
  }else{
    last = newestObjs[newestObjs.length - 1];
  }

  var index;
  if(last.id % 15 == 0){
    deltaAngle = Math.PI * Math.random();
  }

  //newAngle = (deltaAngle + last.a + last.da) % (2 * Math.PI);
  //newAngle = (Math.PI * 2 * Math.random()) - (Math.PI);
  //newAngle = (last.a + Math.PI * Math.random() / 8) % (Math.PI * 2)
  newAngle = last.a + last.da;
  if(last.id % 30 == 0){
    newAngle = (newAngle + (Math.PI * Math.random() / 8)) % (Math.PI * 2);
  }

  out("t5", "newAngle: " + newAngle);
  out("t6", "last: " + last.id +
            ", " + last.x +
            ", " + last.y +
            ", " + last.a +
            ", " + last.da);
  var dx = dist;
  var dy = dist;
  out("t4", "Adding: " + dx + "," + dy + ", " + newAngle);
  newestObjs.push({id: last.id + 1,
                   x: dx, y: dy,
                   a: newAngle,
                   strategy: strategy,
                   da: last.da});
  return newestObjs.slice(0);
}


function render(ctx, c, objs){
  var x = clear(ctx, c);
  //ctx.rotate(Math.PI / 32);
  var i = 0;
  var prev;
  var obj;
  var totalX = 0;
  var totalY = 0;
  var dx;
  var dy;
  var angle = 0;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for(i = 0; i < objs.length; i++){
    obj = objs[i];
    out("t9", "obj.a: " + obj.a);

    angle = Math.min(Math.PI, obj.a);

    dx = Math.floor(obj.x * Math.sin(angle));
    dy = Math.floor(obj.y * Math.cos(angle));
    totalX += dx;
    totalY += dy;
    out("t7", "totalX: " + totalX + ", totalY: " + totalY);
    ctx.lineTo(totalX, totalY);
  }
  ctx.stroke();
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
