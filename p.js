"use strict";

function scriptDesc(){
  return 'Not sure yet';
}

function init(){
  return {count: 1};
}

function render({canvas: c,
                 context: ctx,
                 state: {count}}){
  let h = c.height;
  let w = c.width;

  ctx.fillStyle = int_rgb(count);
  ctx.strokeStyle = "#F00";
  let i = 0;
  for(i = 100; i <= 100; i += 10){
    rotatedSquares(ctx,                       // The context of the canvas to paint with
                   count - i,                 // What frame we want to base the square off of
                   Math.floor(i / 10),        // Rate of increment for square color and angle
                   30,                        // How close to the right edge of the canvas the square can get
                   30,                        // How close to the bottom edge of the canvase the square can get
                   Math.floor((i - 100) / 5), // How many pixels per frame to move
                   w,                         // width of the canvas
                   h,                         // height of the canvas
                   i);                        // size of the square
  }
  return {count: count + 1};
}

function rotatedSquares(ctx, frame, inc, xoff, yoff, mult, maxW, maxH, size){
  console.log(`rotatedSquares: frame: ${frame}`);
  let i = 0
  for(i = 0; i < inc * 2; i += inc){
    ctx.strokeStyle = int_rgb(Math.floor(i * 5));
    rotatedSquare(ctx,
                  Math.abs((frame / 1000 * i) % (Math.PI * 2) - Math.PI),
                  Math.abs(frame - xoff) * mult % (maxW - 40),
                  Math.abs(frame - yoff) * mult % (maxH - 40),
                  size,
                  size);
  }
}

function rotatedSquare(ctx, r, left, top, w, h){
  let hyp = Math.sqrt(Math.pow(w/2, 2), Math.pow(h/2, 2));
  let angle = Math.PI - Math.PI / 4 - r;
  let x = Math.cos(angle) * hyp;
  let y = Math.sin(angle) * hyp;
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
