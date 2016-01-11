//
// draw an arc counter-clockwise from the center point
// after rotating to see if the arc goes back to the
// original center point. (Now commented out.)
//
// I'm guessing it will.
//
// Yup.
//
// Note that ctx.rotate(rads) will only affect _new_
// drawings, not existing drawings.
//
// Also, draw out a bunch of the angles and lines
// that I used to calculate dx and dy used to translate
// a rotated canvas point back to it's original place.
var go = true;
var c;
var ctx;
var x;
var y;
var dashLength = 10;

function animate(){
  var angle = Math.PI / 6;
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

  // draw center line
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x, y);
  ctx.stroke();

  // draw the vertical line at x
  ctx.strokeStyle = "#BBB";
  ctx.beginPath();
  ctx.moveTo(x, 0);
  var i = 0;
  while(i < (2 * y)){
    ctx.lineTo(x, i + dashLength);
    ctx.moveTo(x, i + dashLength * 2);
    i += dashLength * 2;
  }
  ctx.stroke();

  // angle to original center
  var origCenterAngle = Math.atan(y / x);
  out("t1", "Orig center angle: " + origCenterAngle);

  // draw orig center angle
  ctx.strokeStyle = "#AAF";
  ctx.beginPath();
  ctx.arc(0, 0, 50, 0, origCenterAngle);
  ctx.stroke();

  // length of line to center
  var lengthToCenter = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  out("t2", "Length to center: " + lengthToCenter);

  // angle from centerLineToVert
  var origCenterToVertAngle = (Math.PI / 2) - origCenterAngle;
  out("t3", "Orig center to vert angle: " + origCenterToVertAngle);

  // draw orig center to vert angle
  ctx.strokeStyle = "#AAF";
  ctx.beginPath();
  ctx.arc(x, y, 50, 1.5 * Math.PI - origCenterToVertAngle, 1.5 * Math.PI);
  ctx.stroke();

  var halfRotationAngle = angle / 2;
  out("t4", "Half the rotation angle: " + halfRotationAngle);

  // draw half rotation angle
  ctx.strokeStyle = "#AAF";
  ctx.beginPath();
  ctx.arc(0, 0, 200, origCenterAngle, origCenterAngle + angle / 2);
  ctx.stroke();

  // draw half rotation angle line
  ctx.strokeStyle = "#AAF";
  ctx.beginPath();
  ctx.arc(0, 0, 50, 0, origCenterAngle);
  ctx.stroke();

  var oldCenterToNewCenterAngle = Math.PI / 2 - halfRotationAngle;
  out("t5", "Old center to new center angle: " + oldCenterToNewCenterAngle);

  // draw rotation angle
  ctx.strokeStyle = "#AAF";
  ctx.beginPath();
  ctx.arc(0, 0, 150, origCenterAngle, origCenterAngle + angle);
  ctx.stroke();

  var p1p2Dist = Math.sin(halfRotationAngle) * lengthToCenter * 2;
  out("t6", "Old center to new center distance: " + p1p2Dist);

  var p1p2ToVertAngle = Math.PI - origCenterToVertAngle - oldCenterToNewCenterAngle;
  out("t7", "P2-P1-Vert angle: " + p1p2Dist);

  // draw old center to new center angle
  ctx.strokeStyle = "#AAF";
  ctx.beginPath();
  ctx.arc(x, y, 30, Math.PI / 2 + p1p2ToVertAngle, Math.PI / 2 + p1p2ToVertAngle + oldCenterToNewCenterAngle);
  ctx.stroke();

  // draw p1-p2 to vert angle
  ctx.strokeStyle = "#AAF";
  ctx.beginPath();
  ctx.arc(x, y, 45, Math.PI / 2, Math.PI / 2 + p1p2ToVertAngle);
  ctx.stroke();

  var dx = Math.sin(p1p2ToVertAngle) * p1p2Dist;
  var dy = Math.cos(p1p2ToVertAngle) * p1p2Dist;
  out("t8", "dx, dy: " + dx + ", " + dy);

  // draw dx and dy and old center to new center
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + dy);
  ctx.lineTo(x - dx, y + dy);
  ctx.lineTo(x, y);
  ctx.stroke();

  // rotate
  //ctx.rotate(Math.PI / 16);

  // draw half rotation line
  // Rotate down orig center angle + half rotation angle,
  // draw dashed horizontal line,
  // rotate back up orig center angle - half rotation angle
  ctx.rotate(origCenterAngle + (angle / 2));

  ctx.strokeStyle = "#BBB";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  var i = 0;
  while(i < (2.5 * y)){
    ctx.lineTo(i + dashLength, 0);
    ctx.moveTo(i + dashLength * 2, 0);
    i += dashLength * 2;
  }
  ctx.stroke();

  // draw right angle symbol
  // (Oh man, so much work to make this right.
  //  Can't do it right now.)
  ctx.beginPath();
  ctx.moveTo(lengthToCenter - 20, 0);
  ctx.lineTo(lengthToCenter - 20, 20);
  ctx.lineTo(lengthToCenter, 20);
  ctx.stroke();

  ctx.rotate(0 - origCenterAngle + (angle / 2));

  // draw new center line
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
  //var startAngle = Math.atan(y / x);
  //var endAngle = startAngle + (Math.PI / 16);
  //ctx.strokeStyle = "#00F";
  //ctx.beginPath();
  //ctx.arc(0, 0, lengthToCenter, startAngle, startAngle - (Math.PI / 16), true);
  //ctx.stroke();

  p1P2Dist = Math.tan(Math.PI / 32) * length * 2;

}

function out(field, text){
  document.getElementById(field).value = text;
}
