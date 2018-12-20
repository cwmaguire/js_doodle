"use strict";

function scriptDesc(){
  return 'I think this is rotating a square while _not_ rotating the canvas itself';
}

function init(){
  return {count: 1};
}

function render({canvas: c,
                 context: ctx,
                 state: {count}}){
  let h = c.height;
  let w = c.width;
  console.log(`h: ${h}, w: ${w}`);

  ctx.fillStyle = int_rgb(count);
  ctx.strokeStyle = "#F00";
  let i = 0;
  for(i = 80; i <= 100; i += 10){
    rotatedSquares(ctx,                       // The context of the canvas to paint with
                   count - i,                 // What frame we want to base the square off of
                   Math.floor(i / 10),        // Rate of increment for square color and angle
                   30,                        // How close to the right edge of the canvas the square can get
                   30,                        // How close to the bottom edge of the canvas the square can get
                   Math.abs(Math.floor((i - 100) / 5)), // How many pixels per frame to move
                   w,                         // width of the canvas
                   h,                         // height of the canvas
                   i);                        // size of the square
  }
  return {count: count + 1};
}

function rotatedSquares(ctx, frame, inc, xoff, yoff, mult, maxW, maxH, size){
  console.log(`frame: ${frame}, inc: ${inc}, xoff: ${xoff}, yoff: ${yoff}, mult: ${mult}, maxW: ${maxW}, maxH: ${maxH}, size: ${size}`);
  let i = 0
  for(i = 1; i < inc * 4; i += inc){ // always do this twice?
    ctx.strokeStyle = int_rgb(Math.floor(i * 5));
    //console.log(`ctx.strokeStyle: ${ctx.strokeStyle}`);
    rotatedSquare(ctx,
                  Math.abs((frame / 1000 * (i + 1)) % (Math.PI * 2) - Math.PI), // loop through 0 to PI radians
                  // ^ i always starts at zero, so the first square doesn't rotate
                  Math.abs(frame - xoff) * mult % (maxW - xoff),
                  Math.abs(frame - yoff) * mult % (maxH - yoff),
                  size,
                  size);
  }
}

function rotatedSquare(ctx, r, left, top, w, h){
  let hyp = Math.sqrt(Math.pow(w/2, 2), Math.pow(h/2, 2));
  let angle = Math.PI - Math.PI / 4 - r; // 3/4 PI - r
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
