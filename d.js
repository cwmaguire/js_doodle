//
// Rotate the canvas outline boxes
//
// Can't remember exactly what I was trying to see with this one
// or how long I used it for.
//

function init(){
  return 0
}

function render({canvas: c, context: ctx}){
  var time = (new Date()).getTime();
  var x = Math.floor(c.width / 2);
  var y = Math.floor(c.height / 2);

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  ctx.strokeRect(0, 0, c.width, c.height);
  ctx.strokeRect(4, 4, c.width - 4, c.height - 4);

  angle = 2 * Math.PI / 32;
  ctx.rotate(angle);
  xTrans = x - (Math.cos(angle) * x);
  out("t2", "xTrans = " + xTrans);
  yTrans = -Math.sin(angle) * x;
  out("t3", "yTrans = " + yTrans);
  ctx.translate(xTrans, yTrans);
}
