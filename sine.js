"use strict";

function state(){
  return {};
}

function render(state){
  var frame = state.animation.frame;
  return clone(state);
}

function normalize_angle(angle){
  var clamped = angle % (Math.PI / 2);
  if(angle >= 0 && angle < Math.PI / 2){
    return round(clamped);
  }else if(angle >= Math.PI / 2 && angle < Math.PI){
    return round(Math.PI / 2 - clamped);
  }else if(angle >= Math.PI && angle < Math.PI * 1.5){
    return round(clamped);
  }else{
    return round(Math.PI / 2 - clamped);
  }
}

function flatten(xs, maybe_result){
  var results = (maybe_result == undefined ? [] : maybe_result.slice(0));
  if(xs.length == 0){
    return results;
  }
  var next = hd(xs);
  var rest = tl(xs);
  if(Array.isArray(next)){
    return concat(concat(flatten(next), results), flatten(rest));
  }
  return concat(cons(results, next), flatten(rest));
}

function draw_line(ctx, line){
  ctx.beginPath(),
  ctx.moveTo(line.x1, line.y1),
  ctx.lineTo(line.x2, line.y2),
  ctx.stroke();
}

function mod255(i){
  return i % 255;
}
