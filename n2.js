function scriptDesc(){
  return 'A growing string?';
}

function should_clear(){
  return false;
  //return true;
}

function init(){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  let h = c.height;
  let w = c.width;
  let numNumbers = 200;
  let maxSegments = 50;
  let segmentLength = 8;

  // generate a distribution of numbers to draw from
  let numbers = generators.cos_180(numNumbers);

  // Move the top left corner of the context into the middle of the context
  // so that rotations rotate the context around the center of the canvas
  ctx.translate(w / 2, h / 2);
  return {count: 2,
          objs: update_objects([], 1, 80, 2, numbers),
          max: maxSegments,
          dist: segmentLength,
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

  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for(obj of objs){
    ctx.strokeStyle = obj.color;
    out("t9", "obj.a: " + obj.a);

    angle = Math.min(Math.PI * 2, obj.a);

    dx = Math.floor(obj.x * Math.sin(angle));
    dy = Math.floor(obj.y * Math.cos(angle));
    totalX += dx;
    totalY += dy;
    //console.log(`obj.a: ${obj.a}, angle: ${angle}, obj.x: ${obj.x}, obj.y: ${obj.y}, dx: ${dx}, dy: ${dy}, totalX: ${totalX}, totalY: ${totalY}`);
    out("t7", "totalX: " + totalX + ", totalY: " + totalY);
    ctx.lineTo(totalX, totalY);
    ctx.stroke();
  }

  rotateAngle = 2 * Math.PI / 64;
  ctx.rotate(rotateAngle);

  return {count: count + 1, objs: objs, max: max, dist: dist, numbers: numbers};
}

function update_objects(objs, count, max, dist, numbers){
  let red = Math.abs((count * -10) % 255);
  let green = Math.abs((count * 5 - 128) % 255);
  let blue = Math.abs((count * 10) % 255);
  let colorNumbers = [red, green, ];
  let color = rgb_color(colorNumbers);

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
                   da: last.da,
                   color: color});
  return newestObjs.slice(0);
}

