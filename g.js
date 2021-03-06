//
// Drawing multiple dots that rotate around again but this
// time with a line that shows the rotation anglthat rotate
// around again but this time with a line that shows the
// rotation angle.
//
// (... and scratching my head and thinking "What the heck?").
//

function init(){
  return 0;
}

function render({canvas: c, context: ctx, z}){
  let time = (new Date()).getTime();
  let x = Math.floor(c.width / 2);
  let y = Math.floor(c.height / 2);
  z++;

  out("t1", (new Date()).getTime() + " - x,y: " + x + "," + y);

  ctx.strokeStyle = "#000000";

  ctx.fillStyle = "#F00";
  ctx.beginPath();
  ctx.arc(x,y,2,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#0F0";
  ctx.beginPath();
  ctx.arc(x/2,y/2,2,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#00F";
  ctx.beginPath();
  ctx.arc(x,y/2,2,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#A0F";
  ctx.beginPath();
  ctx.arc(x,y/2 - 6,2,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#0AA";
  ctx.beginPath();
  ctx.arc(x,y/2 - 10,1,0,2*Math.PI);
  ctx.fill();

  ctx.fillStyle = "#56A";
  ctx.beginPath();
  ctx.arc(x,y/2 - 8,1,0,2*Math.PI);
  ctx.fill();

  ctx.moveTo(0, 0);
  ctx.lineTo(x, y);
  ctx.stroke();

  // 0) Find length of [Orig, P1] (hypotenuse)
  let hyp = Math.sqrt(Math.pow(x, 2), Math.pow(y, 2));

  // 1) Find down angle from top
  let downAngle = Math.asin(y / hyp);
  out("t4", "X,O,P1: " + downAngle);
  ctx.beginPath();
  ctx.arc(0, 0, z * 30, 0, downAngle, false);
  ctx.stroke();

  transAngle = 2 * Math.PI / 32;
  ctx.rotate(transAngle);

  // 2) Find angle between [(0,0), P1] and [P1, P2]
  let downAngle2 = downAngle + transAngle
  out("t5", "X,O,P2: " + downAngle2);
  //  ... Since the length of hyp doesn't change the angles
  //  O,P2,P1 and O,P1,P2 should be the same (O = Origin = 0,0)
  let p1ToP2;
  let p2ToP1;
  p1ToP2 = p2ToP1 = (Math.PI - transAngle) / 2;
  let p1ToP2Length = Math.asin(downAngle2) * hyp;

  // 3) Use 2 to find angle between [P1, P2] and ([X, Top], [X, Bot]) (i.e. vert line at X)
  // 3a) Find O,P1,[X,0] angle
  let origP1X0Angle = Math.PI - (Math.PI / 2) - downAngle;
  let p1p2ToVert = Math.PI - origP1X0Angle - p1ToP2;

  // 4) Use 3 and [P1, P2] as the hypotenuse, with sin and cos
  //    to calculate [P1,P2] dx and dy
  // 4a) Find P1->P2 length
  // NOT A RIGHT ANGLE TRIANGLE
  // Split triangle in half: O->P1 * asin(transAngle / 2) = P1P2 / 2
  // (i.e. take what you get and multiply it by 2 to get P1P2)
  let p1p2 = Math.asin(transAngle / 2) * hyp * 2
  let dx = Math.asin(p1p2ToVert) * p1p2;
  let dy = Math.acos(p1p2ToVert) * p1p2;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + dx, y - dy);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - dy);
  ctx.stroke();

  //ctx.translate(-dx, -dy);
  out("t2", "dx = " + dx);
  out("t3", "dy = " + dy);

  return z;
}
