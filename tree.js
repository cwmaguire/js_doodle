"use strict";

function animate(){
  out("t2", "true");
  var canvas = elem("canvas1");
  var angles = seqBy(0.0, Math.PI * 1.5, 0.03);
  angles = concat(angles, reverse(angles));
  animate_({lastFrame: 0,
            ellapsed: 0,
            ellapsedMillis: 0,
            framesPerSecond: 30,
            angles: angles});
}

function animationFrameCallback(state){
  return function(ellapsed){
           var newState = clone(state);
           newState.ellapsed = ellapsed;
           animate_(newState);
         }
}

function animate_(state){
  var millisPerFrame = 1000 / state.framesPerSecond;
  var ellapsedMillis = Math.floor(state.ellapsed);
  state.frame = Math.floor(ellapsedMillis / millisPerFrame);
  state.ellapsedFrames = state.frame - state.lastFrame;

  if(state.ellapsedFrames == 0){
    out("t6", "skipping at " + state.frame);
    requestAnimationFrame(animationFrameCallback(state));
    return 0;
  }
  state.lastFrame = state.frame;

  if(state.frame > 1000){
    return 0;
  }

  out("t3", "frame: " + state.frame);
  if(state.ellapsedFrames != 1){
    out("t4", "at frame " + state.frame + " ellapsed frames was " + state.ellapsedFrames);
    out("t5", "lastFrame: " + state.lastFrame);
  }

  requestAnimationFrame(animationFrameCallback(render(state)));
}

function render(state){
  var c = elem("canvas1");
  var ctx = c.getContext("2d");
  var h = c.height;
  var w = c.width;
  clear(ctx, w, h);
  ctx.strokeStyle = elem("c").value;

  var lengthd = (state.frame % 100)/100 * Math.PI;
  var lengths = map(length_fun(c, lengthd), seq(1,5));

  var perpendicular_line = {x1: c.width / 2,
                            y1: c.height,
                            x2: c.width / 2,
                            y2: c.height - c.height * (Math.pow(elem("l").value, 3)),
                            a: 0};

  //console.log(lengths);

  //var angle = state.angles[state.frame % state.angles.length];
  var angle = elem("r").value;
  out("t9", "angle " + angle);
  var lines_ = lines(tl(lengths), round(angle), [perpendicular_line], []);
  map(function(line){
          draw_line(ctx, line)
      }, lines_);

  return clone(state);
}

function length_fun(canvas, lengthd){
  return function(i){
             return length(canvas, lengthd, i);
         };
}

function length(canvas, d, i){
  //return (canvas.height / (i + 2) * Math.sin(d));
  return (canvas.height * (Math.pow(elem("l").value, i)));
}

// for every point, angle and count, create N more points at angles N0..N1 where N is > 1

function lines(lengths, arc, parent_lines, ancestor_lines){
  if(lengths.length == 0){
    return ancestor_lines;
  }
  var angles = arc_angles(elem("n").value, arc);
  var restLengths = tl(lengths);
  var restLines = concat(parent_lines, ancestor_lines);
  var line_angles = cross_product(parent_lines, angles);
  var newLines = map(line_fun(hd(lengths)), line_angles);
  return lines(restLengths, arc, newLines, restLines);
}

function num_lines(){
    return 3;
}

function arc_angles(num, arc){
  var leftOver = Math.PI * 2 - arc;
  var padding = leftOver / 2;
  return map(function(i){ return round((i * arc/(num - 1)) + padding)}, seq(0, num - 1));
}

function round(x){
  return Math.round(x * 1000) / 1000;
}

function line_fun(length){
  return function(line_angle){
           var parent_line = line_angle.one;
           var angle = line_angle.two;
           return line(parent_line, length, angle);
         };
}

/* The theory here is that depending on which direction
 * we're going we'll either need to add or subtract the
 * x and y deltas. The x and y deltas are calculated base
 * on the specified angle and the length of line specified.
 * i.e. start at X,Y and go length L at angle A.
 */
function line(parent_line, length, angle){
  //console.log("line with angle: " + angle);
  var x1 = parent_line.x2;
  var y1 = parent_line.y2;
  var parent_angle = parent_line.a;
  //var total_angle = parent_angle + angle;
  //var total_angle = parent_angle + angle - (Math.PI / 2);
  var total_angle = child_angle(parent_angle, angle);
  //var total_angle = angle;
  var normalized_angle = normalize_angle(total_angle);
  var xd_translate = x_translation(total_angle);
  var yd_translate = y_translation(total_angle);
  var sin = round(Math.sin(normalized_angle));
  var cos = round(Math.cos(normalized_angle));
  var xd = round(Math.sin(normalized_angle) * length * xd_translate);
  var yd = round(Math.cos(normalized_angle) * length * yd_translate);
  //console.log("xd: " + xd + "; yd: " + yd);
  var x2 = round(x1 + xd);
  var y2 = round(y1 + yd);
  //console.log("Line: x1: " + x1 + "; x2: " + x2 + "; y1: " + y1 + "; y2: " + y2 + "; " +
  //            "a: " + angle);
  //console.log("pa: " + parent_angle + "; " +
  //            "a: " + angle + "; " +
  //            "ta: " + total_angle + "; " +
  //            "na: " + normalized_angle + "; " +
  //            "xdt: " + xd_translate + "; " +
  //            "ydt: " + yd_translate + "; " +
  //            "sin: " + sin + "; " +
  //            "cos: " + cos + "; " +
  //            "l: [" + x1 + "," + y1 + ";" + x2 + "," + y2 + "]");
  return {x1: x1, y1: y1, x2: x2, y2: y2, a: total_angle};
}

function child_angle(parent_angle, angle){
  //if(parent_angle + angle > Math.PI / 2){
  //  return round(parent_angle + angle - (Math.PI / 2));
  //}else{
  //  return round(parent_angle + angle + (Math.PI / 2));
  //}
  return round((angle + parent_angle + Math.PI) % (Math.PI * 2));
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

function x_translation(angle){
  //if(angle >= (3 / 2 * Math.PI) || angle <= Math.PI / 2){
  if(angle >= 0 && angle <= Math.PI){
    return -1;
  }else{
    return 1;
  }
}

function y_translation(angle){
  //if(angle >= 0 && (angle <= Math.PI)){
  if(angle >= (3 / 2 * Math.PI) || angle < Math.PI / 2){
    return -1;
  }else{
    return 1;
  }
}

function cross_product(xs, ys){
  return flatten(map(function(x){
                         return map(function(y){
                                        return {one: x, two: y}
                                    }, ys)
                     }, xs))
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

function set(obj, field, value){
  copy = clone(obj);
  copy[field] = value;
  return copy;
}

function draw_line(ctx, line){
  ctx.beginPath(),
  ctx.strokeStyle = elem("c").value;
  ctx.moveTo(line.x1, line.y1),
  ctx.lineTo(line.x2, line.y2),
  ctx.stroke();
}

function clear(ctx, h, w){
  ctx.clearRect(0, 0, h, w);
}
