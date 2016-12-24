"use strict";

function animate(){
  out("t2", "true");
  var canvas = document.getElementById("canvas1");
  animate_({animation: {lastFrame: 0,
                        ellapsed: 0,
                        ellapsedMillis: 0,
                        framesPerSecond: 30},
            user: state());
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

  clear();
  requestAnimationFrame(animationFrameCallback(render(state)));
}
function clear(){
  var c = document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  var h = c.height;
  var w = c.width;
  clear(ctx, w, h);
  ctx.strokeStyle = "#F00";
}

function clear(ctx, h, w){
  ctx.clearRect(0, 0, h, w);
}
