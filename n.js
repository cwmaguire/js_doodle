function scriptDesc(){
  return 'A growing string?';
}

function init(){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  let h = c.height;
  let w = c.width;
  ctx.translate(w / 2, h / 2);
  return {count: 2,
          objs: update_objects([], 1, 80, 2),
          max: 80,
          dist: 2};
}

function render({canvas: c,
                 context: ctx,
                 state: {count, objs, max, dist}}){

  objs = update_objects(objs, count, max, dist);

  let i = 0;
  let prev;
  let obj;
  let totalX = 0;
  let totalY = 0;
  let dx;
  let dy;
  let angle = 0;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  for(i = 0; i < objs.length; i++){
    obj = objs[i];
    out("t9", "obj.a: " + obj.a);

    angle = Math.min(Math.PI * 2, obj.a);

    dx = Math.floor(obj.x * Math.sin(angle));
    dy = Math.floor(obj.y * Math.cos(angle));
    totalX += dx;
    totalY += dy;
    console.log(`obj.a: ${obj.a}, angle: ${angle}, obj.x: ${obj.x}, obj.y: ${obj.y}, dx: ${dx}, dy: ${dy}, totalX: ${totalX}, totalY: ${totalY}`);
    out("t7", "totalX: " + totalX + ", totalY: " + totalY);
    ctx.lineTo(totalX, totalY);
  }
  ctx.stroke();

  return {count: count + 1, objs: objs, max: max, dist: dist};
}

function update_objects(objs, count, max, dist){
  let angle = Math.PI / 64 * count;
  let strategies = [-angle, 0, angle];
  let newestObjs;
  let last;
  let strategy;
  let deltaAngle = 0;
  let newAngle = 0;
  let index;
  let dx = dist;
  let dy = dist;

  if(objs.length < max){
    newestObjs = objs.slice(0);
  }else{
    newestObjs = objs.slice(1);
  }

  //console.log(`objs.length: ${objs.length}`);

  if(objs.length == 0){
    last = {id: 0, x: 0, y: 0,
            a: 2 * Math.PI * Math.random(),
            strategy: 0,
            da: Math.PI / 32};
  }else{
    last = newestObjs[newestObjs.length - 1];
  }

  if(last.id % 15 == 0){
    deltaAngle = Math.PI * Math.random();
  }

  newAngle = last.a + last.da;
  if(last.id % 30 == 0){
    newAngle = (newAngle + (Math.PI * Math.random() / 8)) % (Math.PI * 2);
  }

  out("t5", "newAngle: " + newAngle);
  out("t6", "last: " + last.id +
            ", " + last.x +
            ", " + last.y +
            ", " + last.a +
            ", " + last.da);
  out("t4", "Adding: " + dx + "," + dy + ", " + newAngle);
  newestObjs.push({id: last.id + 1,
                   x: dx, y: dy,
                   a: newAngle,
                   strategy: strategy,
                   da: last.da});
  return newestObjs.slice(0);
}

