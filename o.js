function scriptDesc(){
  return 'Rotating string thingy';
}

function init(){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  let h = c.height;
  let w = c.width;
  ctx.translate(w / 2, h / 2);
  return {count: 2,
          objs: [{a: 0}]};
}

function render({canvas: c,
                 context: ctx,
                 state: {count, objs}}){
  var x, y;
  var rgb;
  var i = 0;
  var xs = "";
  var ys = "";
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

    x = Math.floor(i * 2 * Math.sin(objs[i].a));
    y = Math.floor(i * 2 * Math.cos(objs[i].a));
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

  return {count: count, objs: objs};
}

function update_objects(objs){
  var angle = objs[0].a;
  if(angle >= 2 * Math.PI){
    angle = 0;
  }
  out("t4", "Angle: " + angle);
  var newObj = {a: angle + (Math.PI / 64)};
  objs.unshift(newObj);
  return objs.slice(0, Math.max(60, objs.length - 1));
}
