"use strict";

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

  return {h: h, w: w, frame: 0, fireworks: fireworks};
}

function render({context: ctx, state: {h, w, frame, fireworks}}){
  let maxFireworks = 60;
  let minFramesBetweenFireworks = 1;
  let maxFireworkAge = 60;
  let dy = 2;

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
  if(fireworks.length < maxFireworks && frame % minFramesBetweenFireworks == 0){
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
    let trail = create_trail(r, g, b);
    firework.trail = trail;
    firework.y += dy;
    render_firework(ctx, firework, age);
  }

  return {h: h, w: w, frame: frame + 1, fireworks: fireworks};
}

function create_firework(h, w, frame){
  let x = Math.random() * w;
  let y = Math.random() * (h - 200);
  let r = 255 - Math.floor(Math.random() * 50);
  let g = 255 - Math.floor(Math.random() * 50);
  let b = 255 - Math.floor(Math.random() * 50);
  return {x: x, y: y, base_color: [r, g, b], frame: frame};
}

function dim_colors([r, g, b], dimAmount = 5){
  return [Math.max(0, r - dimAmount),
          Math.max(0, g - dimAmount),
          Math.max(0, b - dimAmount)]
}

function create_trail(r, g, b){
  let dimAmount = 20;
  let trail = [[r, g, b]];
  while(r > 0 || g > 0 || b > 0){
    [r, g, b] = dim_colors([r, g, b], dimAmount);
    trail.push([r, g, b]);
  }
  return trail;
}

function render_firework(ctx, {trail, y, x}, age = ''){
  let radius = 5.0;
  let effectiveRadius;
  let dy = 5;
  let y2 = y;
  let rgbColor;
  for(let colors of trail){
    radius = round(radius - 0.1, 3);
    effectiveRadius = round(Math.max(1, Math.floor(radius)), 3);
    y2 -= dy;
    //rgbColor = rgb_color(colors);
    //console.log(`rgbColor: ${rgbColor}`);
    ctx.fillStyle = rgb_color(colors);
    ctx.beginPath();
    ctx.ellipse(x, y2, effectiveRadius, effectiveRadius, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  //ctx.fillStyle = 'white';
  ctx.fillStyle = rgb_color(trail[0]);
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
