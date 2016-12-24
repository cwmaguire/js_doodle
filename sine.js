"use strict";

function state(){
  return {};
}

function render(state){
  var frame = state.animation.frame;
  var angle = round(frame / 100 % (Math.PI * 2));
  var height = state.canvas.height;
  var width = state.canvas.width;
  out("t1", "Angle: " + angle);
  draw_line(state.context, line(angle, width / 2, height / 2));
  return clone(state);
}

function line(angle, x1, y1){
  var y1, y2;
  var normalized_angle = normalize_angle(angle);
  //console.log("norm'd: " + normalized_angle);
  out("t10", "Angle: " + angle);
  out("t11", "translations: " + x_translation(angle) + ", " + y_translation(angle));
  var x2 = round(Math.cos(normalized_angle) * 50) * x_translation(angle);
  var y2 = round(Math.sin(normalized_angle) * 50) * y_translation(angle);
  out("t8", "norm: " + normalized_angle + ", x2: " + x2 + ", y2: " + y2);
  return {x1: x1, y1: y1, x2: x1 + x2, y2: y1 + y2};
}

function normalize_angle(angle){
  var clamped = round(angle % (Math.PI / 2));
  out("t9", "angle: " + angle + ", clamped: " + clamped);
  //console.log("Calculating norm.");
  //console.log("Clamped: " + clamped);
  if(angle >= 0 && angle < Math.PI / 2){
    return round(Math.PI / 2 - clamped);
  }else if(angle >= Math.PI / 2 && angle < Math.PI){
    return round(clamped);
  }else if(angle >= Math.PI && angle < Math.PI * 1.5){
    return round(clamped);
  }else{
    return round(Math.PI / 2 - clamped);
  }
}

function x_translation(angle){
  return (angle >= Math.PI / 2 && angle < Math.PI * 3 / 2) ? -1 : 1;
}

function y_translation(angle){
  return (angle >= 0 && angle < Math.PI) ? -1 : 1;
}

function draw_line(ctx, line){
  out("t7", "line: " + line.x1 + ", " + line.y1 + ", " + line.x2 + ", " + line.y2);
  ctx.strokeStyle = "#00F";
  ctx.beginPath(),
  ctx.moveTo(line.x1, line.y1),
  ctx.lineTo(line.x2, line.y2),
  ctx.stroke();
}
