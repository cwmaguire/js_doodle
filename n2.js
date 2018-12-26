function scriptDesc(){
  return 'A growing string?';
}

function should_clear(){
  return false;
}

function init(){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  let h = c.height;
  let w = c.width;
  let numNumbers = 200;

  // generate a distribution of numbers to draw from
  let numbers = generators.cos_180(numNumbers);

  // Move the top left corner of the context into the middle of the context
  // so that rotations rotate the context around the center of the canvas
  ctx.translate(w / 2, h / 2);
  return {count: 2,
          objs: update_objects([], 1, 80, 2, numbers),
          max: 80,
          dist: 2,
          numbers: numbers};
}

function render({canvas: c,
                 context: ctx,
                 state: {count, objs, max, dist, numbers}}){

  objs = update_objects(objs, count, max, dist, numbers);

  let i = 0;
  let prev;
  let obj;
  let totalX = 0;
  let totalY = 0;
  let dx;
  let dy;
  let angle = 0;
  let rotateAngle = 0;

  let colorNumbers = [255, Math.max(0, (count - 128) % 255), count % 255];
console.log(`colorNumbers: ${colorNumbers}`);
  ctx.strokeStyle = rgb_color(colorNumbers);
  //ctx.strokeStyle = "#FFFF90";
console.log(`count: ${count}`);
  console.log("ctx.strokeStyle: " + ctx.strokeStyle);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  for(obj of objs){
    out("t9", "obj.a: " + obj.a);

    angle = Math.min(Math.PI * 2, obj.a);

    dx = Math.floor(obj.x * Math.sin(angle));
    dy = Math.floor(obj.y * Math.cos(angle));
    totalX += dx;
    totalY += dy;
    //console.log(`obj.a: ${obj.a}, angle: ${angle}, obj.x: ${obj.x}, obj.y: ${obj.y}, dx: ${dx}, dy: ${dy}, totalX: ${totalX}, totalY: ${totalY}`);
    out("t7", "totalX: " + totalX + ", totalY: " + totalY);
    ctx.lineTo(totalX, totalY);
  }
  ctx.stroke();

  rotateAngle = 2 * Math.PI / 64;
  ctx.rotate(rotateAngle);

  return {count: count + 1, objs: objs, max: max, dist: dist, numbers: numbers};
}

function update_objects(objs, count, max, dist, numbers){
  let angle = numbers[count % numbers.length];
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

  //newAngle = last.a + last.da;
  newAngle = numbers[(Math.floor(count * Math.random())) % numbers.length];

  out("t5", "newAngle: " + newAngle);
  out("t6", "last: " + last.id +
            ", " + last.x +
            ", " + last.y +
            ", " + last.a +
            ", " + last.da);
  out("t8", "Adding: " + dx + "," + dy + ", " + newAngle);
  newestObjs.push({id: last.id + 1,
                   x: dx, y: dy,
                   a: newAngle,
                   strategy: strategy,
                   da: last.da});
  return newestObjs.slice(0);
}

