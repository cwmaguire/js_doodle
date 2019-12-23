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
  return 'Draw a graph';
}

function should_clear(){
  return true;
}

function init(){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  let h = c.height;
  let w = c.width;
  let verteces = [];
  let edges = [];

  add_controls(w, h);

  verteces = generate_vertexes(h, w);

  return {h: h, w: w, frame: 0, verteces: verteces, edges: edges};
}

function render({context: ctx, state: {h, w, frame, verteces, edges}}){
  let maxFireworks = get_control_value('max_fireworks', 'int');;

  return {h: h, w: w, frame: frame + 1, fireworks: fireworks};
}

function create_firework(h, w, frame){
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

function render_firework(ctx, {trail, y, x}, age = ''){
}

function is_black([r, g, b]){
  return r == 0 && g == 0 && b == 0;
}

function round(number, decimalPlaces){
  let multiplier = Math.pow(10, decimalPlaces);
  let rounded = Math.round(multiplier * number) / multiplier;
  return rounded;
}

function add_controls(w, h){
  add_slider('min_height', '0', h, '10', MIN_HEIGHT);
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
