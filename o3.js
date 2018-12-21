function scriptDesc(){
  return 'Rotating string thingy';
}

function init(){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  let h = c.height;
  let w = c.width;
  // I think this is preventing animate from clearing the canvas except for
  // one small square
  ctx.translate(w / 2, h / 2);
  return {count: 2,
          objs: [{a: 0}]};
}

function should_clear(){
  return false;
}

function render({canvas: c,
                 context: ctx,
                 state: {count, objs}}){
  let x, y;
  let rgb;
  let i = 0;
  //let distance = read('t1', 'int');
  let distance = count % 10;
  //let distance = count / 3;
  let xs = "";
  let ys = "";
  objs = update_objects(objs);
  out("t2", "objs.length: " + objs.length);
  out("t5", "RGB: ___");
  out("t6", "count: " + count);

  ctx.beginPath();
  ctx.moveTo(0, 0);

  for(i = 0; i < objs.length; i++){
    rgb = int_rgb(i);
    out("t5", "RGB: " + rgb);

    ctx.strokeStyle = rgb;

    x = Math.floor(i * distance * Math.sin(objs[i].a));
    y = Math.floor(i * distance * Math.cos(objs[i].a));
    out("t3", "Last x,y: " + Math.floor(x) + ", " + Math.floor(y));
    xs = xs + x + ",";
    ys = ys + y + ",";
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  ctx.lineTo(x, y);
  ctx.stroke();

  return {count: count + 1, objs: objs};
}

function update_objects(objs){
  let angle = objs[0].a;
  out("t4", "Angle: " + angle);
  let newObj = {a: (angle + (Math.PI / 64) + (-0.5 + Math.random()) % (Math.PI * 2))};
  objs.unshift(newObj);
  return objs.slice(0, Math.max(100, objs.length - 1));
}
