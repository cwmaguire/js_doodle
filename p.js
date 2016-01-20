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
  clear(ctx, canvas.width, canvas.height);
  ctx.fillRect(state.frame, state.frame, 10, 10);
  return clone(state);
}

function clear(ctx, h, w){
  ctx.clearRect(0, 0, h, w);
}
