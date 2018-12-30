"use strict";

let MIN_HEIGHT = 100;
let RADIUS = 10;
let RADIUS_STEP = '0.1';
let DIM = 10;
let RED_BASE = 255;
let GREEN_BASE = 255;
let BLUE_BASE = 255;
let RED_RANGE = 50;
let GREEN_RANGE = 50;
let BLUE_RANGE = 50;
let MAX_AGE = 30;
let MAX_FIREWORKS = 30;
let GRADIENT_RADIUS_1 = 0;
let GRADIENT_COLOR_STOP_1 = 0;
let GRADIENT_COLOR_STOP_2 = 0.5;
let GRADIENT_X_OFFSET = 0;
let GRADIENT_Y_OFFSET = 0;
let DELTA_Y = 2;
let DELTA_Y_TRAIL = 5;

function scriptDesc(){
  return 'falling fireworks';
}

function should_clear(){
  //return false;
  return true;
}

function init(){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  let h = c.height;
  let w = c.width;
  let fireworks = [];

  add_controls(w, h);

  return {h: h, w: w, frame: 0, fireworks: fireworks};
}

function render({context: ctx, state: {h, w, frame, fireworks}}){
  let maxFireworks = get_control_value('max_fireworks', 'int');;
  let minFramesBetweenFireworks = 0;
  let maxFireworkAge = get_control_value('max_age', 'int');
  let dy = get_control_value('delta_y', 'int');

  // we create falling fireworks that are bright at the head then fade to the tail.
  // The entire firework fades after a bit.
  // We only ever have X fireworks
  // The fireworks start at a random x but always at least Z y from the bottom
  // Only create a new firework every Y frames, but each firework must last at least 3Y frames

  // black the screen
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, w, h);

  if(fireworks.length > 0){
    //console.log('firework one: ' + fireworks[0].base_color);
  }

  let isNotBlack = function({base_color}){
    return !is_black(base_color);
  }
  // filter out black fireworks
  fireworks = fireworks.filter(isNotBlack);

  // Every X frames create a new firework if we don't have enough
  if(fireworks.length < maxFireworks &&
     (minFramesBetweenFireworks == 0 || frame % minFramesBetweenFireworks == 0)){
    let newFirework = create_firework(h, w, frame);
    fireworks.push(newFirework);
  }

  // Modify every firework to add a tail of diminishing brightness
  for(let firework of fireworks){
    let age = frame - firework.frame;
    //console.log(`age: ${age}`);
    //console.log(`maxFireworkAge: ${maxFireworkAge}`);
    let [r, g, b] = firework.base_color;
    if(age > maxFireworkAge){
      [r, g, b] = dim_colors([r, g, b], 20);
      //console.log(`r: ${r}, g: ${g}, b: ${b}`);
      firework.base_color = [r, g, b];
    }
    let trail = create_trail(r, g, b, age);
    firework.trail = trail;
    firework.y += dy;
    render_firework(ctx, firework, age);
  }

  return {h: h, w: w, frame: frame + 1, fireworks: fireworks};
}

function create_firework(h, w, frame){
  let x = Math.floor(Math.random() * w);
  let y = Math.floor(Math.random() * (h - get_control_value('min_height', 'int')));
  let redBase = get_control_value('red_base', 'int');
  let greenBase = get_control_value('green_base', 'int');
  let blueBase = get_control_value('blue_base', 'int');
  //console.log(`redBase: ${redBase}, greenBase: ${greenBase}, blueBase: ${blueBase}`);

  let redRange = get_control_value('red_range', 'int');
  let greenRange = get_control_value('green_range', 'int');
  let blueRange = get_control_value('blue_range', 'int');
  //console.log(`redRange: ${redRange},  greenRange: ${greenRange}, blueRange: ${blueRange}`);

  let r = redBase - Math.min(redBase, Math.floor(Math.random() * redRange));
  let g = greenBase - Math.min(greenBase, Math.floor(Math.random() * greenRange));
  let b = blueBase - Math.min(blueBase, Math.floor(Math.random() * blueRange));
  //console.log(`r: ${r}, g: ${g}, b: ${b}`);
  return {x: x, y: y, base_color: [r, g, b], frame: frame};
}

function dim_colors([r, g, b], dimAmount = 5){
  return [Math.max(0, r - dimAmount),
          Math.max(0, g - dimAmount),
          Math.max(0, b - dimAmount)]
}

function create_trail(r, g, b, age){
  let dimAmount = get_control_value('dim', 'int');
  //let trail = [[r, g, b]];
  let head = [r, g, b];
  let trail = [];
  let maxTrail = Math.floor(age / 3);
  let i = 0;
  while(i < maxTrail && (r > 0 || g > 0 || b > 0)){
    [r, g, b] = dim_colors([r, g, b], dimAmount);
    //trail.unshift([r, g, b]);
    trail.push([r, g, b]);
    i++;
  }
  // Draw this last so it's not covered by the tail
  trail.push(head);
  return trail;
}

// TODO flip the direction of the tail if dy is negative
// (i.e. if we want the fireworks to go up)
function render_firework(ctx, {trail, y, x}, age = ''){
  let initialRadius = get_control_value('radius', 'int');
  let dy = get_control_value('delta_y_trail', 'int');
  let y2 = y - ((trail.length - 1) * dy);
  let rgbColor;
  let radiusStep = get_control_value('radius_step', 'float');
  let effectiveRadius = initialRadius - ((trail.length - 1) * radiusStep);
  let radius;

  // Set the fill style and draw a rectangle
  ctx.fillStyle = gradient;
  //ctx.fillRect(20, 20, 160, 160);

  for(let colors of trail){
    effectiveRadius = round(effectiveRadius + radiusStep, 2);
    radius = Math.max(1, Math.floor(effectiveRadius));
    y2 += dy;
    //rgbColor = rgb_color(colors);
    //console.log(`rgbColor: ${rgbColor}`);
    //ctx.fillStyle = rgb_color(colors);
    let gradientRadius1 = get_control_value('gradient_radius_1', 'float');
    let gradientXOffset = get_control_value('gradient_x_offset', 'int');
    let gradientYOffset = get_control_value('gradient_y_offset', 'int');
    let gradient = ctx.createRadialGradient(
      x + gradientXOffset,
      y2 + gradientYOffset,
      gradientRadius1,
      x,
      y2,
      radius);
    // I think color stops specify where the transition begins and ends
    let colorStop1 = get_control_value('gradient_color_stop_1', 'float');
    let colorStop2 = get_control_value('gradient_color_stop_2', 'float');
    gradient.addColorStop(colorStop1, rgb_color(colors));
    gradient.addColorStop(colorStop2, 'transparent');
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.ellipse(x, y2, effectiveRadius, effectiveRadius, 0, 0, Math.PI * 2);
    ctx.fill();

    // render the location of the gradient fill
    //ctx.fillStyle = rgb_color(colors);
    //ctx.font = '12px serif';
    //ctx.fillText('x: ' + x + ', y2: ' + y2, x + 30, y2)
  }
  //ctx.fillStyle = 'white';
  //ctx.fillStyle = rgb_color(trail[0]);
  //console.log(`fillStyle: ${ctx.fillStyle}`);
  //ctx.font = '12px serif';
  //ctx.fillText('' + age, x + 10, y2)
  //ctx.fillText('' + radius, x + 10, y2 + 12)
  //ctx.fillText('' + effectiveRadius, x + 10, y2 + 24)
}

function is_black([r, g, b]){
  return r == 0 && g == 0 && b == 0;
}

function round(number, decimalPlaces){
  let multiplier = Math.pow(10, decimalPlaces);
  let rounded = Math.round(multiplier * number) / multiplier;
  return rounded;
}

function get_control_value(controlName, type){
  let e = elem(controlName);
  let value = cast(e.value, type);
  return value;
}

function add_controls(w, h){
  add_slider('min_height', '0', h, '10', MIN_HEIGHT);
  add_slider('radius', '0', Math.floor(w / 4), '1', RADIUS);
  add_slider('radius_step', '0.0', '0.9', '0.1', RADIUS_STEP);
  add_slider('dim', '0', '255', '1', DIM);
  add_slider('red_base', '0', '255', '1', RED_BASE);
  add_slider('green_base', '0', '255', '1', GREEN_BASE);
  add_slider('blue_base', '0', '255', '1', BLUE_BASE);
  add_slider('red_range', '0', '255', '1', RED_RANGE);
  add_slider('green_range', '0', '255', '1', GREEN_RANGE);
  add_slider('blue_range', '0', '255', '1', BLUE_RANGE);
  add_slider('max_age', '0', '100', '1', MAX_AGE);
  add_slider('max_fireworks', '0', '200', '1', MAX_FIREWORKS);
  add_slider('gradient_radius_1', '0', 'w', '1', GRADIENT_RADIUS_1);
  add_slider('gradient_color_stop_1', '0.0', '1.0', '.05', GRADIENT_COLOR_STOP_1);
  add_slider('gradient_color_stop_2', '0.0', '1.0', '.05', GRADIENT_COLOR_STOP_2);
  add_slider('gradient_x_offset', '-50', '50', '1', GRADIENT_X_OFFSET);
  add_slider('gradient_y_offset', '-50', '50', '1', GRADIENT_Y_OFFSET);
  add_slider('delta_y', '-10', '10', '1', DELTA_Y);
  add_slider('delta_y_trail', '-20', '20', '1', DELTA_Y_TRAIL);
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
      console.log(`event: ${event}`);
      text.value = event.target.value;
    };
  slider.addEventListener('change', sliderOnchange);

  controlSpan.appendChild(slider);
  controlSpan.appendChild(label);
  controlSpan.appendChild(text);
  controlSpan.appendChild(document.createElement('BR'));
}
