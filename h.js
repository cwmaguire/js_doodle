// Testing if you can see the drawing of one canvas
// beneath another
//
// ... Yes.
//
// (Make sure you're getting the context from the right
//  canvas. D'oh!)
//
//  NOTE: REQUIRES 2nd canvas ("canvas2") that was in a.html
//  for the original commit of this file but is now gone.
//
//  I'm totally confused why I have to specify 300,130
//  as the left-middle point of the circle in canvas1
//  to get it to show up at the bottom right corner
//  when the size is 100x100
//
//  Ah, default canvas height and width need to be
//  change with canvas.height = Y; canvas.width = X;
//  NOT canvas.style.height = Y; canvase.style.width = X;

var go = true;
var period = 500;
var c;
var ctx;
var z = 0;

function animate(){

  c = document.getElementById("canvas1");
  c.style.top = 0;
  c.style.left = 0;
  c.style.height = 100;
  c.style.width = 100;
  c.height = 100;
  c.width = 100;
  c.style.border = "1px solid black";
  ctx = c.getContext("2d");

  c2 = document.getElementById("canvas2");
  c2.style.top = "50px";
  c2.style.left = "50px";
  c2.style.height = "100px";
  c2.style.width = "100px";
  ctx2 = c2.getContext("2d");
  //c.width = 500;
  //c.height = 300;

  var time = (new Date()).getTime();
  render();
  var nextAnimateTime = time + period - (new Date()).getTime();
  //console.log("Writing out at " + nextAnimateTime);
  //console.log("Drawing took (" + (new Date()).getTime() + ", " + time + ") " + ((new Date()).getTime() - time));
  if(go){
    setTimeout(function(){animate()}, nextAnimateTime);
  }
}

function render(){
  ctx.fillStyle = "#00A";
  ctx.beginPath();
  ctx.arc(100, 130, 60, Math.PI / 8, 2*Math.PI);
  ctx.fill();

  ctx2.fillStyle = "#F00";
  ctx2.beginPath();
  ctx2.arc(30, 30, 60, 0, 1.6*Math.PI);
  ctx2.fill();

  ctx2.rotate(Math.PI / 16);
}

function out(field, text){
  document.getElementById(field).value = text;
}
