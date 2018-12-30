"use strict";

let jsDoodle = {
  canvasProps: ['height', 'width'],
  canvasStyleProps: ['top', 'left', 'height', 'width', 'border'],
  canvases: [{id: 'canvas1', canvas: {style: {}}},
             {id: 'canvas2', canvas: {style: {}}}],

  save_canvas_states:
    function(){
      for(let c of jsDoodle.canvases){
        jsDoodle.save_canvas_state(c);
      }
    },

  save_canvas_state:
    function ({id, canvas}){
      let c = elem(id);

      jsDoodle.canvasStyle = {top: c.style.top,
                              left: c.style.left,
                              height: c.style.height,
                              width: c.style.width,
                              border: c.style.border};
      for(let p of jsDoodle.canvasProps){
        canvas[p] = c[p];
      }
      for(let p of jsDoodle.canvasStyleProps){
        canvas.style[p] = c.style[p];
      }
    },

  reset_canvases:
    function(){
      for(let c of jsDoodle.canvases){
        jsDoodle.reset_canvas(c);
      }
    },

  reset_canvas:
    function ({id, canvas}){
      let c = elem(id);
      for(let p of jsDoodle.canvasProps){
        c[p] = canvas[p];
      }
      for(let p of jsDoodle.canvasStyleProps){
        c.style[p] = canvas.style[p];
      }
    }
}

function out(field, text){
  document.getElementById(field).value = text;
}

function get_control_value(controlName, type){
  let e = elem(controlName);
  let value = cast(e.value, type);
  return value;
}
