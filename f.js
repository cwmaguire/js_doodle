//
// No idea where I was going with this one.
// Doesn't seem to do anything.
//

function render({canvas: c, context: ctx}){
  var time = (new Date()).getTime();
  var x = Math.floor(c.width / 2);
  var y = Math.floor(c.height / 2);

  out("t1", "x: " + x + ", y: " + y);
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  //ctx.strokeRect(0, 0, c.width, c.height);
  ctx.strokeRect(8, 8, c.width - 8, c.height - 8);

  angle = 2 * Math.PI / 32;
  ctx.rotate(angle);
  xTrans = x - (Math.cos(angle) * x);
  out("t2", "xTrans = " + xTrans);
  yTrans = -Math.sin(angle) * x;
  out("t3", "yTrans = " + yTrans);
  ctx.translate(xTrans, yTrans);
}

function out(field, text){
  document.getElementById(field).value = text;
}
