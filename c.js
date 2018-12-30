//
// Goofing around trying to wrap my head around how the
// canvas rotation works and how I can translate a point
// back to where it started for "rotate in place"
//
// I think I removed the "blank the screen" gear and added
// some better canvas outlines.
//

let ROTATION_FRACTION = 32;
let SQUARE_INSET = 4;
let X_OFFSET_FRACTION = 2;
let Y_OFFSET_FRACTION = 2;
let MAX_TIMES = 16;

function scriptDesc(){
  return 'trying to spin squares in place while the canvas rotates from the corner?';
}

function init(){
  let time = (new Date()).getTime();
  let times = [{rgb: timeRGB(time), time: time}];

  add_controls();

  return times;
}

function render({canvas: c, context: ctx, state: times}){
  let time = (new Date()).getTime();
  let xOffsetFraction = get_control_value('x_offset_fraction', 'int');
  let yOffsetFraction = get_control_value('y_offset_fraction', 'int');
  let x = Math.floor(c.width / xOffsetFraction);
  let y = Math.floor(c.height / yOffsetFraction);
  let rgb = timeRGB(time);
  let rotationFraction = get_control_value('rotation_fraction', 'int');
  let maxTimes = get_control_value('max_times', 'int');

  while(times.length >= maxTimes){
    times.shift();
  }

  times.push({ rgb: rgb, time: time});

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, c.width, c.height);

  let squareInset = get_control_value('square_inset', 'int');
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(0, 0, c.width, c.height);
  ctx.strokeRect(
    squareInset,
    squareInset,
    c.width - squareInset,
    c.height - squareInset);

  for(let i = 0; i < times.length; i++){
    out("t5", 33 - times.length);
    angle = 2 * Math.PI / rotationFraction;
    ctx.rotate(angle);

    xTrans = x - (Math.cos(angle) * x);
    out("t6", "xTrans = " + xTrans);

    yTrans = -Math.sin(angle) * x;
    out("t7", "yTrans = " + yTrans);

    ctx.translate(xTrans, yTrans);
  }

  for(i = 0; i < times.length; i++){
    ctx.fillStyle = times[i].rgb;
    ctx.strokeStyle = times[i].rgb;
    if(i % 16 == 0){
      ctx.strokeText("A    n    g    i    e", x, y);
      ctx.strokeRect(x - 5, y - 5, x + 5, y + 5);
      ctx.strokeRect(x - 2, y - 2, x + 2, y + 2);
    }
    angle = Math.PI / 16;
    xTrans = x - (Math.cos(angle) * x);
    yTrans = Math.sin(angle) * x;
    ctx.rotate(angle);
    ctx.translate(xTrans, -yTrans);
  }

  return times;
}

function timeRGB(time){
  //let r = time % 255;
  let r = 90;
  let g = Math.max(100, (time >> 3) % 255);
  let b = Math.max(100, (time >> 6) % 255);
  return ("#" + r.toString(16) + g.toString(16) + b.toString(16)).toUpperCase();
}

function add_controls(){
  add_slider('max_times', '2', '50', '1', MAX_TIMES);
  add_slider('rotation_fraction', '1', '40', '1', ROTATION_FRACTION);
  add_slider('square_inset', '1', '100', '1', SQUARE_INSET);
  add_slider('x_offset_fraction', '1', '64', '1', X_OFFSET_FRACTION);
  add_slider('y_offset_fraction', '1', '64', '1', Y_OFFSET_FRACTION);
}

function add_slider(name, min, max, step, value){
  let controlSpan = elem('controls');
  let slider = document.createElement('INPUT');
  slider.type = 'range';
  slider.id = name;
  slider.name = name;
  slider.value = value;
  slider.min = min;
  slider.max = max;
  slider.step = step;

  let label = document.createElement('LABEL');
  label.id = name + '_label';
  label.innerText = name;
  label.for = name;

  let text = document.createElement('INPUT');
  text.type = 'text';
  text.id = name + '_text';
  text.name = name + '_text';
  let sliderOnchange =
    function(event){
      text.value = event.target.value;
    };
  slider.addEventListener('change', sliderOnchange);

  controlSpan.appendChild(slider);
  controlSpan.appendChild(label);
  controlSpan.appendChild(text);
  controlSpan.appendChild(document.createElement('BR'));
}
