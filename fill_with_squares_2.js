function scriptDesc(){
  return 'Fill the canvas with random, non-overlapping squares';
}

function init(){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  let h = c.height;
  let w = c.width;
  return {w: w,
          h: h,
          frame: 0,
          spaces: [{x1: 0, y1: 0, x2: w, y2: h}],
          squares: []};
}

function render({context: ctx,
                 state: {w: w,
                         h: h,
                         frame: frame,
                         spaces: spaces,
                         squares: squares}}){

  if(frame % 10 == 0){
    let firstSpace = spaces[0];
    let restSpaces = spaces.slice(1);
    let spaceWidth = firstSpace.x2 - firstSpace.x1
    let spaceHeight = firstSpace.y2 - firstSpace.y1

    let top_ = firstSpace.y1 + Math.floor(Math.random() * spaceHeight);
    let left = firstSpace.x1 + Math.floor(Math.random() * spaceWidth);
    let maxH = spaceHeight - top_;
    let maxW = w - left;
    let size = Math.floor(Math.random() * Math.min(maxH, maxW));

    log_square('First space: ', firstSpace);
    // console.log('spaceWidth: ' + spaceWidth);
    // console.log('spaceHeight: ' + spaceHeight);
    // console.log('left: ' + left);
    // console.log('top_: ' + top_);
    // console.log('size: ' + size);
    // console.log('x1: ' + left);
    // console.log('y1: ' + top_);
    // console.log('x2: ' + (left + size));
    // console.log('y2: ' + (top_ + size));

    let newSquare = {x1: left,
                     y1: top_,
                     x2: left + size,
                     y2: top_ + size};
    log_square('New square', newSquare);
    squares = squares.concat(newSquare);
    console.log('squares length: ' + squares.length);

    console.log('restSpaces length: ' + restSpaces.length);
    newSpaces = new_spaces(firstSpace, newSquare);
    console.log('New spaces length: ' + newSpaces.length);
    spaces = restSpaces.concat(newSpaces);
    console.log('spaces length: ' + spaces.length);
  }

  draw(ctx, newSpaces, '#FF0000');
  draw(ctx, squares, '#000000');

  return {w: w,
          h: h,
          frame: frame + 1,
          spaces: spaces,
          squares: squares};
}

function draw(ctx, squares, color){
  console.log('Drawing ' + squares.length + ' squares');
  for({x1: x1, y1: y1, x2: x2, y2: y2} of squares){
    let size = x2 - x1;
    log_square('Drawing', {x1: x1, y1: y1, x2: x2, y2: y2});
    ctx.strokeStyle = color;
    ctx.strokeRect(x1, y1, size, size);
  }
}

function log_square(prefix, square){
  console.log(prefix +
                ': x1: ' + square.x1 +
                ', y1: ' + square.y1 +
                ', x2: ' + square.x2 +
                ', y2: ' + square.y2);
}

function new_spaces({x1: spX1, y1: spY1, x2: spX2, y2: spY2},
                    {x1: sqX1, y1: sqY1, x2: sqX2, y2: sqY2}){
  let newSpace = undefined;
  let newSpaces = [];

  if(sqX1 > spX1){
    newSpace = {x1: spX1, y1: spY1, x2: sqX1, y2: spY1};
    log_square('New left space', newSpace);
    newSpaces = newSpaces.concat(newSpace);
  }
  if(sqX2 < spX2){
    newSpace = {x1: sqX2, y1: spY1, x2: spX2, y2: spY1};
    log_square('New right space', newSpace);
    newSpaces = newSpaces.concat(newSpace);
  }
  if(sqY1 > spY1){
    newSpace = {x1: spX1, y1: spY1, x2: spX2, y2: sqY1};
    log_square('New top space', newSpace);
    newSpaces = newSpaces.concat(newSpace);
  }
  if(sqY2 < spY2){
    newSpace = {x1: spX1, y1: sqY2, x2: spX2, y2: spY2};
    log_square('New bottom space', newSpace);
    newSpaces = newSpaces.concat(newSpace);
  }
  return newSpaces;
}
