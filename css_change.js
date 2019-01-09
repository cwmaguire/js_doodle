let MARGIN = 0;
let MARGIN_LEFT = 0;
let MARGIN_TOP = 0;
let MARGIN_RIGHT = 0;
let MARGIN_BOTTOM = 0;

let PADDING = 0;
let PADDING_LEFT = 0;
let PADDING_TOP = 0;
let PADDING_RIGHT = 0;
let PADDING_BOTTOM = 0;

let BORDER_STYLES = ['none',
                     'hidden',
                     'dotted',
                     'dashed',
                     'solid',
                     'double',
                     'groove',
                     'ridge',
                     'inset',
                     'outset',
                     'initial',
                     'inherit'];

function add_controls(){
  add_slider('margin', '-100', '100', '1', MARGIN);
  add_slider('marginLeft', '-100', 100, '1', MARGIN_LEFT);
  add_slider('marginRight', '-100', 100, '1', MARGIN_RIGHT);
  add_slider('marginBottom', '-100', 100, '1', MARGIN_BOTTOM);

  add_slider('padding', '-100', '100', '1', PADDING);
  add_slider('paddingLeft', '-100', 100, '1', PADDING_LEFT);
  add_slider('paddingRight', '-100', 100, '1', PADDING_RIGHT);
  add_slider('paddingBottom', '-100', 100, '1', PADDING_BOTTOM);

  add_slider('borderWidth', '-100', 100, '1', PADDING_BOTTOM);
  add_slider('borderRadius', '-100', 100, '1', PADDING_BOTTOM);

  add_border_type_dropdown();
  add_border_color_picker();
}

function add_slider(name, min, max, step, value){
  let controlSpan = e('controls');
  let slider = document.createElement('INPUT');
  slider.type = 'range';
  slider.id = name;
  slider.name = name;
  slider.value = value;
  slider.min = min;
  slider.max = max;
  slider.step = step;

  let label = document.createElement('LABEL');
  label.id = name + '_label';
  label.innerText = name;
  label.for = name;

  let text = document.createElement('INPUT');
  text.type = 'text';
  text.id = name + '_text';
  text.name = name + '_text';

  slider.addEventListener('change', update_fn(name, text, 'px'));

  controlSpan.appendChild(slider);
  controlSpan.appendChild(label);
  controlSpan.appendChild(text);
  controlSpan.appendChild(document.createElement('BR'));
}

function update_fn(setting, text, suffix = ''){
  return function(event){
    let val = event.target.value + suffix;
    e('div1').style[setting] = val;
    e('span1').style[setting] = val;
    text.value = val;
  }
}

function e(id){
  return document.getElementById(id);
}

function add_border_type_dropdown(){
  let controlSpan = e('controls');
  let input = document.createElement('INPUT');
  input.id = 'borderStyle';
  input.setAttribute('list', 'borderStyles');
  controlSpan.appendChild(input);

  let datalist = document.createElement('DATALIST');
  //datalist.setAttribute('id', 'borderStyles');
  datalist.id = 'borderStyles';
  for(let borderStyle of BORDER_STYLES){
    let option = document.createElement("OPTION");
    option.id = borderStyle;
    option.value = borderStyle;
    datalist.appendChild(option);
  }
  controlSpan.appendChild(datalist);

  let label = document.createElement('LABEL');
  label.id = name + '_label';
  label.innerText = name;
  label.for = name;

  let text = document.createElement('INPUT');
  text.type = 'text';
  text.id = name + '_text';
  text.name = name + '_text';

  controlSpan.appendChild(label);
  controlSpan.appendChild(text);

  input.addEventListener('change', update_fn('borderStyle', text));
  input.addEventListener('change', function(){input.value = ''});
  controlSpan.appendChild(document.createElement('BR'));
}

function add_border_color_picker(){
  let controlSpan = e('controls');
  let input = document.createElement('INPUT');
  input.type = 'color';
  controlSpan.appendChild(input);
  input.addEventListener('change', update_fn('borderColor', {text: ''}));
  controlSpan.appendChild(document.createElement('BR'));
}

