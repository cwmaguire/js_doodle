var go = true;
var c;
var h;
var w;
var mid;
var MAX = 40;
var dist = 5;

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
  var newestObjs;
  var last;
  if(objs.length < MAX){
    out("t7", "objs.length < MAX: " + objs.length);
    newestObjs = objs.slice(0);
  }else{
    out("t7", "objs.length !< MAX: " + objs.length);
    newestObjs = objs.slice(1);
  }
  if(objs.length == 0){
    last = {x: 0, y: 0, a: 0};
  }else{
    last = newestObjs[newestObjs.length - 1];
  }

  //var randAngle = Math.random() * Math.PI / 15 - (Math.PI / 30);
  //var randAngle = Math.random() * Math.PI / 8 - (Math.PI / 16);
  // Maybe base this angle off the last angle
  var randAngle = last.a + (Math.random() * Math.PI / 16 - (Math.PI / 32));
  out("t5", "randAngle: " + randAngle);
  out("t6", "last: " + last);
  //var dx = Math.floor(dist * Math.sin(randAngle));
  //var dy = Math.floor(dist * Math.cos(randAngle));
  var dx = dist;
  var dy = dist;
  out("t4", "Adding: " + dx + "," + dy);
  newestObjs.push({x: dx, y: dy, a: randAngle});
  return newestObjs.slice(0);
}

/*
 * Trying to figure out why drawing a white rectangle won't clear out the
 * screen.
 *
 * Ah! I wasn't using "beginPath()"
 */

function render(ctx, c, objs){
  var x = clear(ctx, c);
  //ctx.rotate(Math.PI / 64);
  //ctx.strokeStyle = "#00F";
  //ctx.beginPath();
  //ctx.moveTo(0, 0);
  //ctx.lineTo(200, 200);
  //ctx.stroke();
  //ctx.fillRect(50, 50, 30, 30);
  //ctx.fillRect(10, 50, 30, 30);
  //ctx.fillRect(50, 10, 30, 30);
  //ctx.fillRect(10, 10, 30, 30);
  var i = 0;
  var prev;
  var obj;
  var totalX = 0;
  var totalY = 0;
  var totalA = 0;
  var dx;
  var dy;
  //var radIncrement = radianIncrement(objs.length);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for(i = 0; i < objs.length; i++){
  //for(i = objs.length - 1; i >= 0; i--){
    obj = objs[i];
    out("t9", "obj.a: " + obj.a);
    //totalA += (obj.a * 4 / (objs.length * 2 - i));

    //totalA += sinWaveAngleWeight(radIncrement, i, obj.a);
    //out("t9", "Increment: " + i);
    out("t10", "Increments: " + objs.length);
    totalA += incrementalWeight(objs.length, i + 1, obj.a);
    //totalA += obj.a;
    out("t8", "totalA: " + totalA);
    //dx = Math.floor(obj.x * Math.sin(obj.a));
    //dy = Math.floor(obj.y * Math.cos(obj.a));
    dx = Math.floor(obj.x * Math.sin(totalA));
    dy = Math.floor(obj.y * Math.cos(totalA));
    //totalX += obj.x;
    //totalY += obj.y;
    totalX += dx;
    totalY += dy;
    //ctx.arc(obj.x, obj.y, 2, 0, Math.PI * 2);
    ctx.lineTo(totalX, totalY);
  }
  ctx.stroke();
}

function incrementalWeight(increments, increment, angle){
  // 0.2 + range between 0.2 and 1.0 evenly spread over increments 6 through n
  console.log("Increments: " + increments +
              ", increment: " + increment +
              ", angle: " + angle +
              ", ratio: " + increment / increments);
  return Math.min(0.2, increment / increments) * angle;
}

function radianIncrement(n){
  return Math.PI / 2 / n;
}

function sinWaveAngleWeight(radianIncrement, distanceFromCenter, angle){
  return Math.sin(radianIncrement * distanceFromCenter) * angle;
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
