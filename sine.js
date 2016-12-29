"use strict";

function state(){
  return {circles: [], sines: [], cosines: []};
}

function render(state){
  var ctx = state.context;
  var frame = state.animation.frame;
  var angle = round(frame / 100 % (Math.PI * 2));
  var height = state.canvas.height;
  var width = state.canvas.width;

  var sine = Math.sin(angle - Math.PI) * 50 + (height / 2);
  var sines = cons(state.user.sines.slice(0, width / 2 - 51), sine);
  var sinePoints = map(to_point, zip(seq(0, sines.length), reverse(sines)));
  draw_points(ctx, "#0F0", sinePoints);

  var cosine = Math.cos(angle) * 50 + (width / 2);
  var cosines = cons(state.user.cosines.slice(0, height / 2 - 50), cosine);
  var cosinePoints = map(to_point, zip(reverse(cosines), seq(0, cosines.length)));
  draw_points(ctx, "#00F", cosinePoints);

  var originPoint = {x: width / 2, y: height / 2};
  var circlePoint = circle_point(angle, originPoint);
  var circlePoints = cons(state.user.circles.slice(0, 100), circlePoint);
  draw_points(ctx, "F0F", circlePoints);

  out("t1", "Angle: " + angle);
  draw_line(ctx, originPoint, circlePoint);

  var lastSinePoint = hd(reverse(sinePoints));
  out("t11", "last sine point: x: " + lastSinePoint[0]
             + ", y: " + lastSinePoint[1]);

  var lastCosinePoint = hd(reverse(cosinePoints));
  out("t12", "last cosine point: x: " + lastCosinePoint[0]
             + ", y: " + lastCosinePoint[1]);

  draw_line(ctx, circlePoint, lastSinePoint);
  draw_line(ctx, circlePoint, lastCosinePoint);

  state.user.sines = sines;
  state.user.cosines = cosines;
  state.user.circles = circlePoints;
  return state;
}

function circle_point(angle, originPoint){
  var length = 50;
  out("t10", "Angle: " + angle + ", clamped: " + angle % (Math.PI / 2));
  var funs = trig_funs(angle);
  var x = round((funs.x)(angle % (Math.PI / 2)) * length);
  var y = round((funs.y)(angle % (Math.PI / 2)) * length);
  out("t4", "x: " + x + ", y: " + y);
  return {x: x + originPoint.x, y: y + originPoint.y};
}

function line(angle, x1, y1){
  return {x1: x1, y1: y1, x2: x1 + x2, y2: y1 + y2};
}

function trig_funs(angle){
  var cos = Math.cos;
  var sin = Math.sin;
  if(angle >= 0 && angle < Math.PI / 2){
    return {x: trig_fun(cos, 1), y: trig_fun(sin, -1)};
  }else if(angle >= Math.PI / 2 && angle < Math.PI){
    return {x: trig_fun(sin, -1), y: trig_fun(cos, -1)};
  }else if(angle >= Math.PI && angle < Math.PI * 1.5){
    return {x: trig_fun(cos, -1), y: trig_fun(sin, 1)};
  }else{
    return {x: trig_fun(sin, 1), y: trig_fun(cos, 1)};
  }
}

function trig_fun(fun, translation){
  return function(angle){
    return fun(angle) * translation;
  }
}

function draw_line(ctx, point1, point2){
  out("t7", "x1: " + point1.x + ", y1: " + point1.y + ", " + 
            "x2: " + point2.x + ", y2: " + point2.y);
  ctx.strokeStyle = "#00F";
  ctx.beginPath(),
  ctx.lineWidth = 0.5;
  ctx.moveTo(point1.x, point1.y),
  ctx.lineTo(point2.x, point2.y),
  ctx.stroke();
}

function draw_points(ctx, color, points){
  map(function(p){ draw_point(ctx, color, p) }, points);
}

function draw_point(ctx, color, point){
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;
  ctx.arc(0 + point.x, point.y, 0.5, 0, Math.PI * 2);
  ctx.fill();
}

function to_point(arr){
  return {x: arr[0], y: arr[1]};
}
