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
  return true;
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

  //if(objs.length > 45 && count % 10 > 0){
    //return {count: count + 1, objs: objs};
  //}
  console.log(`objs.length: ${objs.length}`);
  console.log(`count: ${count}`);
  objs = update_objects(objs);

  out("t5", "objs.length: " + objs.length);
  out("t6", "RGB: ___");
  out("t7", "count: " + count);

  //animation.clear();
  ctx.beginPath();
  ctx.moveTo(0, 0);

  for(i = 0; i < objs.length; i++){

    rgb = int_rgb(i);
    out("t6", "RGB: " + rgb);

    ctx.strokeStyle = rgb;

    x = Math.floor(i * distance * Math.sin(objs[i].a));
    y = Math.floor(i * distance * Math.cos(objs[i].a));
    out("t8", "Last x,y: " + Math.floor(x) + ", " + Math.floor(y));
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
  out("t9", "Angle: " + angle);
  let newObj = {a: (angle + (Math.PI / 64) + (-0.1 + Math.random() / 5) % (Math.PI * 2))};
  objs.unshift(newObj);
  return objs.slice(0, Math.max(50, objs.length - 1));
}
