"use strict";

function animate(){
  out("t2", "true");
  animate_({lastFrame: 0,
            ellapsed: 0,
            ellapsedMillis: 0,
            framesPerSecond: 30});
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

  out("t3", "frame: " + state.frame);
  if(state.ellapsedFrames != 1){
    out("t4", "at frame " + state.frame + " ellapsed frames was " + state.ellapsedFrames);
    out("t5", "lastFrame: " + state.lastFrame);
  }

  var newState = render(state);
  requestAnimationFrame(animationFrameCallback(render(state)));
}

function render(state){
  var canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");
  var h = canvas.height;
  var w = canvas.width;
  clear(ctx, w, h);
  ctx.fillStyle = rgb(state.frame);
  //ctx.fillRect(state.frame % w, state.frame % h, (state.frame % 50) + 10, (state.frame % 50) + 10);
  //rotatedSquare(ctx, Math.PI / 8, state.frame % w, state.frame % h, 40, 40);
  rotatedSquare(ctx, Math.random() * Math.PI / 2, state.frame % w, state.frame % h, 80, 80);
  return clone(state);
}

function rotatedSquare(ctx, r, left, top, w, h){
  var hyp = Math.sqrt(Math.pow(w/2, 2), Math.pow(h/2, 2));
  var angle = Math.PI - Math.PI / 4 - r;
  var x = Math.cos(angle) * hyp;
  var y = Math.sin(angle) * hyp;
  if(r < Math.PI / 4){
    x = -x;
  }
  ctx.beginPath();
  ctx.strokeStyle = "#F00";
  ctx.moveTo(left + w / 2 + x, top + h / 2 - y);
  ctx.lineTo(left + w / 2 + y, top + h / 2 + x);
  ctx.lineTo(left + w / 2 - x, top + h / 2 + y);
  ctx.lineTo(left + w / 2 - y, top + h / 2 - x);
  ctx.closePath();
  ctx.stroke();
}

function clear(ctx, h, w){
  ctx.clearRect(0, 0, h, w);
}

function rgb(i){
  var r = mod255(mod255(i) * 2);
  var g = 255 - mod255(i * 4);
  var b = 255 - mod255(i * 4);
  return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
}

function mod255(i){
  return i % 255;
}
