
function scriptDesc(){
  return 'Uh, some kind of rotating, changing strings?';
}

function init(){
  let c = document.getElementById('canvas1');
  let ctx = c.getContext('2d');
  let w = c.width;
  let h = c.height;
  ctx.translate(w / 2, h / 2);
  return {count: 2,
          objs: update_objects([], 1, 80, 2),
          max: 80,
          dist: 2};
}

function render({canvas: c,
                 context: ctx,
                 state: {count, objs, max, dist}}){
  console.log(`render: count: ${count}`);
  ctx.rotate(Math.PI / 32 * count);
  let i = 0;
  //let prev;
  let obj;
  let totalX = 0;
  let totalY = 0;
  let totalA = 0;
  let dx;
  let dy;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  for(let i = 0; i < objs.length; i++){
    obj = objs[i];
    out("t9", "obj.a: " + obj.a);
    out("t10", "Increments: " + objs.length);
    totalA += incrementalWeight(objs.length, i + 1, obj.a);
    totalA = Math.max(Math.min(totalA, Math.PI * 0.75), -Math.PI * 0.75);
    out("t8", "totalA: " + totalA);
    dx = Math.floor(obj.x * Math.sin(totalA));
    dy = Math.floor(obj.y * Math.cos(totalA));
    totalX += dx;
    totalY += dy;
    ctx.lineTo(totalX, totalY);
  }
  ctx.stroke();
  objs = update_objects(objs, count, max, dist);
  return {count: count + 1, objs: objs, max: max, dist: dist};
}

function update_objects(objs, count, max, dist){
  console.log(`updateObjects: count: ${count}`);
  let angle = Math.PI / 64 * count;
  let strategies = [-angle, 0, angle];
  let newestObjs;
  let last;
  let strategy;
  let deltaAngle = 0;
  let index;

  out("t7", strategies);

  if(objs.length < max){
    newestObjs = objs.slice(0);
  }else{
    newestObjs = objs.slice(1);
  }

  if(objs.length == 0){
    last = {id: 0, x: 0, y: 0, a: 0, a: 0, strategy: 0, da: 0};
  }else{
    last = newestObjs[newestObjs.length - 1];
  }

  if(last.id % 10 == 0){
    strategy = randOther(last.strategy, strategies.length);
    out("t12", "new strategy: " + strategy);
    deltaAngle = strategies[strategy];
    //for(strat of strategies){
      //console.log(`strat: ${strat}`);
    //}
    //console.log(`strategy: ${strategy}, deltaAngle: ${deltaAngle}`);
    out("t11", "new deltaAngle: " + deltaAngle);
  }else{
    deltaAngle = last.da;
    strategy = last.strategy;
    out("t11", "deltaAngle: " + deltaAngle);
    out("t12", "strategy: " + strategy);
  }

  newAngle = Math.max(Math.min(last.a + deltaAngle, Math.PI/16), -Math.PI/16);

  out("t5", "newAngle: " + newAngle);
  out("t6", "last: " + last.id +
            ", " + last.x +
            ", " + last.y +
            ", " + last.a +
            ", " + last.da);
  let dx = dist;
  let dy = dist;
  out("t4", "Adding: " + dx + "," + dy + ", " + newAngle);
  newestObjs.push({id: last.id + 1,
                   x: dx, y: dy,
                   a: newAngle,
                   strategy: strategy,
                   da: deltaAngle});
  return newestObjs.slice(0);
}

function randOther(Curr, Max){
  let result = (Curr + Math.floor(Math.random() * Max)) % Max;
  //console.log(`Max: ${Max}, Curr: ${Curr}, result: ${result}`);
  return result;
}

function incrementalWeight(increments, increment, angle){
  return Math.min(0.4, increment / increments) * angle;
}

function radianIncrement(n){
  return Math.PI / 2 / n;
}

function sinWaveAngleWeight(radianIncrement, distanceFromCenter, angle){
  return Math.sin(radianIncrement * distanceFromCenter) * angle;
}
