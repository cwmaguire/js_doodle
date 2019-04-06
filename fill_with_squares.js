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
          square: {last_top: 0,
                   last_left: 0,
                   last_size: 0}};
}

function render({context: ctx,
                 state: {w: w,
                         h: h,
                         frame: frame,
                         square: {last_top: last_top,
                                  last_left: last_left,
                                  last_size: last_size}}}){
  let top_ = 0;
  let left = 0;
  let size = 0;

  if(frame % 10 == 0){
    top_ = Math.random() * h;
    left = Math.random() * w;
    let maxH = h - top_;
    let maxW = w - left;
    size = Math.random() * Math.min(maxH, maxW);
  }else{
    top_ = last_top;
    left = last_left;
    size = last_size;
  }
  console.log('top = ' + top_);
  console.log('left = ' + left);
  console.log('size = ' + size);

  ctx.strokeRect(left, top_, size, size);

  return {w: w,
          h: h,
          frame: frame + 1,
          square: {last_top: top_,
                   last_left: left,
                   last_size: size}};
}
