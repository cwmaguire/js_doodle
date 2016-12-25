"use strict";

function state(){
  return {sines: [], cosines: []};
}

function render(state){
  var ctx = state.context;
  var frame = state.animation.frame;
  var angle = round(frame / 100 % (Math.PI * 2));
  var height = state.canvas.height;
  var width = state.canvas.width;
  var sine = Math.sin(angle) * 50 + (height / 2 + 50);
  var sines = cons(state.user.sines.slice(0, width / 2), sine);
  var cosine = Math.cos(angle) * 50 + (height / 2 - 50);
  var cosines = cons(state.user.cosines.slice(0, width / 2), cosine);

  out("t1", "Angle: " + angle);
  draw_line(ctx, line(angle, width / 2, height / 2));
  draw_points(ctx, "#0F0", sines);
  draw_points(ctx, "#00F", cosines);
  state.user.sines = sines;
  state.user.cosines = cosines;
  return state;
}

function line(angle, x1, y1){
  var y1, y2;
  var length = 50;
  out("t10", "Angle: " + angle + ", clamped: " + angle % (Math.PI / 2));
  var funs = trig_funs(angle);
  var x2 = round((funs.x)(angle % (Math.PI / 2)) * length);
  var y2 = round((funs.y)(angle % (Math.PI / 2)) * length);
  out("t4", "x: " + x2 + ", y: " + y2);
  out("t5", ": " + x2 + ", y: " + y2);
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

function draw_line(ctx, line){
  out("t7", "line: " + line.x1 + ", " + line.y1 + ", " + round(line.x2) + ", " + round(line.y2));
  ctx.strokeStyle = "#00F";
  ctx.beginPath(),
  ctx.moveTo(line.x1, line.y1),
  ctx.lineTo(line.x2, line.y2),
  ctx.stroke();
}

function draw_points(ctx, color, points){
  map(function(p){ draw_point(ctx, color, p) },
      zip(seq(0, points.length),
          reverse(points)));
}

function draw_point(ctx, color, point){
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(0 + point[0], 50 + point[1], 1, 0, 2 * Math.PI);
  ctx.fill();
}
