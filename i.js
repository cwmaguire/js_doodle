//
// draw an arc counter-clockwise from the center point
// after rotating to see if the arc goes back to the
// original center point.
//
// I'm guessing it will.
//
// Yup.
//
// Note that ctx.rotate(rads) will only affect _new_
// drawings, not existing drawings.
var go = true;
var c;
var ctx;
var x;
var y;

function animate(){
  c = document.getElementById("canvas1");
  c.height = 300;
  c.width = 500;
  ctx = c.getContext("2d");

  x = Math.floor(c.width / 2);
  y = Math.floor(c.height / 2);

  // draw original center point
  ctx.fillStyle = "#F00";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 2 * Math.PI);
  ctx.fill();

  ctx.strokeStyle = "#330";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x, y);
  ctx.stroke();

  // rotate
  ctx.rotate(Math.PI / 16);

  // draw new "horizontal" line
  ctx.strokeStyle = "#F00";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x, 0);
  ctx.stroke();

  // draw new line to center
  ctx.strokeStyle = "#F00";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x, y);
  ctx.stroke();

  // draw new center point
  ctx.fillStyle = "#0F0";
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 2 * Math.PI);
  ctx.fill();

  // arc back to original center
  var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var startAngle = Math.atan(y / x);
  var endAngle = startAngle + (Math.PI / 16);
  ctx.strokeStyle = "#00F";
  ctx.beginPath();
  ctx.arc(0, 0, length, startAngle, startAngle - (Math.PI / 16), true);
  ctx.stroke();

  p1P2Dist = Math.tan(Math.PI / 32) * length * 2;

}
