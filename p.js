"use strict";

function animate(){
  out("t2", "true");
  var canvas = document.getElementById("canvas1");
  //canvas.height = 400;
  //canvas.width = 500;
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
  ctx.strokeStyle = "#F00";
  var i = 0;
  for(i = 100; i <= 100; i += 10){
    rotatedSquares(ctx,                       // The context of the canvas to paint with
                   state.frame - i,           // What frame we want to base the square off of
                   Math.floor(i / 10),        // Rate of increment for square color and angle
                   30,                        // How close to the right edge of the canvas the square can get
                   30,                        // How close to the bottom edge of the canvase the square can get
                   Math.floor((i - 100) / 5), // How many pixels per frame to move
                   w,                         // width of the canvas
                   h,                         // height of the canvas
                   i);                        // size of the square
  }
  return clone(state);
}

function rotatedSquares(ctx, frame, inc, xoff, yoff, mult, maxW, maxH, size){
  var i = 0
  for(i = 0; i < inc * 2; i += inc){
    ctx.strokeStyle = rgb(Math.floor(i * 5));
    rotatedSquare(ctx,
                  Math.abs((frame / 1000 * i) % (Math.PI * 2) - Math.PI),
                  Math.abs(frame - xoff) * mult % (maxW - 40),
                  Math.abs(frame - yoff) * mult % (maxH - 40),
                  size,
                  size);
  }
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
