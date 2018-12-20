function scriptDesc(){
  return 'Rotate the canvas.';
}

function init(){
  let c = elem('canvas1');
  c.style.left = '310px';
  c.style.top = '20px';
  return 0;
}

function render({canvas: c, context: ctx, state: rotations}){
  let h = c.height = 500;
  let w = c.width = 500;
  ctx.translate(w / 2, h / 2);

  ctx.rotate(Math.PI / 32 * rotations);
  ctx.strokeStyle = "#00F";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 200);
  ctx.stroke();
  ctx.fillRect(50, 50, 30, 30);
  ctx.fillRect(10, 50, 30, 30);
  ctx.fillRect(50, 10, 30, 30);
  ctx.fillRect(10, 10, 30, 30);
  return rotations + 1;
}
