function go(){
  alert("hi!");
  return 0;
}

function b(){
  let c = document.getElementById("canvas1");
  let ctx = c.getContext("2d");
  ctx.fillStyle = "#FFFFA0";
  ctx.strokeRect(0,0,c.width,c.height);
}

function animate(times){
  if(times == undefined){
    time = (new Date()).getTime();
    times = [{rgb: timeRGB(time), time: time, rotations: 0}];
  }
  let date = new Date();
  let time = (new Date()).getTime();
  let numRotates = draw_time(times);
  let nextAnimateTime = time + 50 - (new Date()).getTime();
  //console.log("Writing out at " + nextAnimateTime);
  console.log("Drawing took (" + (new Date()).getTime() + ", " + time + ") " + ((new Date()).getTime() - time));
  setTimeout(function(){animate(times)}, nextAnimateTime);
}

function draw_time(times){
  let c = document.getElementById("canvas1");
  let ctx = c.getContext("2d");
  let time = (new Date()).getTime();
  //let x = Math.floor((time % c.width) / 2);
  //let y = Math.floor((time % c.height) / 2);
  //let x = 10;
  //let y = 10;
  let x = Math.floor(c.width / 2);
  let y = Math.floor(c.height / 2);
  //let r = time % 255;
  //let g = (time >> 3) % 255;
  //let b = (time >> 6) % 255;
  //let rgb = ("#" + r.toString(16) + g.toString(16) + b.toString(16)).toUpperCase();
  let rgb = timeRGB(time);
  //console.log("Writing out " + time + " at " + x + ", " + y + " with: " + rgb + ")");
  //ctx.fillStyle = "#FF0000";
  if(times.length >= 16){
    times.shift();
  }
  //times = times.slice(1,7);
  let rotations = times[0].rotations;
  times.push({rgb: rgb, time: time, rotations: (times[times.length - 1].rotations + 1) % 64});

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, c.width, c.height);

  //console.log("Rotations: " + rotations);

  let i = 0;

  ctx.fillStyle = "#FFFFFF";
  ctx.strokeStyle = "#FFFFFF";

  for(i = 0; i < 4; i++){
    ctx.rotate(2 * Math.PI / 4);
    ctx.translate(11,-32);
    ctx.fillRect(0, 0, c.width, c.height);
  }

  //for(i = 0; i < (rotations - 1); i++){
    //console.log("rotating");
    //ctx.beginPath();
    //ctx.moveTo(10, Math.floor(c.height / 2));
    //ctx.lineTo(c.width - 10, Math.floor(c.height / 2));
    //ctx.stroke();

    //ctx.rotate(Math.PI / 16);
    //ctx.transform(1,0.5,0.5,1,1,1);
    //ctx.translate(Math.floor(x / 8), Math.floor(-y / 1.6));
  //}

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  //ctx.rotate(Math.PI / 16);
  //ctx.translate(11, -32);

  for(i = 0; i < 33 - times.length; i++){
    ctx.rotate(Math.PI / 16);
    ctx.translate(11, -32);
  }

  for(i = 0; i < times.length; i++){
  //for(i = times.length - 1; i >= 0; i--){
    //console.log("Times length: " + times.length);

    //ctx.beginPath();
    //ctx.moveTo(0, Math.floor(c.height / 2));
    //ctx.lineTo(c.width, Math.floor(c.height / 2));
    //ctx.moveTo(Math.floor(c.width / 2), 0);
    //ctx.lineTo(Math.floor(c.height / 2), c.height);
    //ctx.stroke();
    //console.log(times[i]);
    //ctx.transform(1,0.9,0.9,1,1,1);
    //ctx.translate(Math.floor(x / 8), Math.floor(-y / 1.6));
    ctx.fillStyle = times[i].rgb;
    ctx.strokeStyle = times[i].rgb;
    //ctx.strokeText(times[i].time, x - 30, y);
    ctx.strokeText("A  n  d  r  e  a  M a g u i r e", x - 30, y);
    ctx.rotate(Math.PI / 16);
    ctx.translate(11, -32);
  }

  return times;
}

function timeRGB(time){
  let r = time % 255;
  let g = (time >> 3) % 255;
  let b = (time >> 6) % 255;
  return ("#" + r.toString(16) + g.toString(16) + b.toString(16)).toUpperCase();
}

function drawLine(){
  let c = document.getElementById("canvas1");
  let ctx = c.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  ctx.beginPath();
  ctx.moveTo(10, Math.floor(c.height / 2));
  ctx.lineTo(c.width - 10, Math.floor(c.height / 2));
  ctx.stroke();
}

function skew(){
  let c = document.getElementById("canvas1");
  let ctx = c.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  ctx.fillRect(10, 10, 40, 40);
  ctx.transform(1, 0.5, 0.5, 1, 1, 1);
  ctx.fillRect(10, 10, 40, 40);
  ctx.transform(1, 0.5, 0.5, 1, 1, 1);
  ctx.fillRect(10, 10, 40, 40);
}

function rotate(){
  let c = document.getElementById("canvas1");
  let ctx = c.getContext("2d");
  let x = c.width;
  let y = c.height;

  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";

  ctx.fillRect(10, 10, 40, 40);
  ctx.rotate(Math.PI / 16);
  ctx.translate(Math.floor(6), Math.floor(-7));
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(10, 10, 40, 40);
  ctx.rotate(Math.PI / 16);
  ctx.translate(Math.floor(6), Math.floor(-7));
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(10, 10, 40, 40);
}
