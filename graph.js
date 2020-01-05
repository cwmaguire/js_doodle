"use strict";

let VERTEX_RADIUS = 10;
let EDGE_LENGTH = 10;

let GRAPH = {1: {'edges': [2, 3, 4]},
             2: {'edges': []},
             3: {'edges': [1, 4]},
             4: {'edges': [1, 3]}}

function scriptDesc(){
  return 'Draw a graph';
}

function should_clear(){
  return true;
}

function init(){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  let h = c.height;
  let w = c.width;
  let verteces = [];
  let edges = [];

  add_controls(w, h);

  //let firstIndex = 0;
  let x = 200;
  let y = 200;
  let nullStartingAngle = undefined;
  let firstVertex = vertex(x, y);
  let initialShapes = [firstVertex];
  let firstId = parseInt(Object.keys(GRAPH)[0]);
  let arrangedEdgeIds = [];
  let arrangedVertexIds = [firstId];
  let uniqueEdges = unique_edges(GRAPH);
  let shapes = [];
  let arrangement = arrange_shapes(GRAPH,
                                   shapes,
                                   uniqueEdges,
                                   firstId,
                                   arrangedEdgeIds,
                                   arrangedVertexIds,
                                   initialShapes,
                                   x,
                                   y,
                                   nullStartingAngle);
  shapes = arrangement.shapes;

  return {h: h, w: w, frame: 1, shapes: shapes};
}

function render({context: ctx, state: {h, w, frame, shapes}}){
  let foo = get_control_value('max_fireworks', 'int');;
  for(shape of shapes){
    draw_shape(shape);
  }

function arrange_shapes(graph,
                        shapes,
                        uniqueEdges,
                        previousId,
                        arrangedEdgeIds,
                        arrangedVertexIds,
                        previousX,
                        previousY,
                        angle){

  // Recursive termination test
  // Have we drawn all the edges AND all the verteces
  // (in a cyclic graph we could draw all the verteces
  //  recursively but skip an edge)
  const numUniqueEdges = uniqueEdges.size;
  const numUniqueVerteces = (new Set(Object.keys(graph))).size;
  const areAllEdgesArranged = arrangedEdgeIds.size >= numUniqueEdges;
  const areAllVertecesArranged = arrangedVertexIds.size >= numUniqueVerteces;
  const isGraphArranged = areAllEdgesArranged && areAllVertecesArranged;
  if(isGraphArranged || arrangedEdgeIds.includes(previousId)){
    return {shapes: shapes.slice(0),
            arranged_edge_ids: new Set(arrangedEdgeIds),
            arranged_vertex_ids: new Set(arrangedVertexIds)};
  }

  // angle between child edges
  console.log('Previous ID = ' + previousId);
  const siblingIds = Array.from(new Set(graph[previousId]['edges']));
  const unarrangedEdges = set_minus(siblingIds, arrangedEdgeIds);
  //const numArrangedEdges = isRootVertex ? 1 : 0;
  //const numChildEdges = edgeIds.size - numParentEdges;
  //const numEdges = numParentEdges + numChildEdges;
  const numEdges = siblingIds.length;
  let dAngle = 0;
  // do we have any edges?
  // (other than the incoming parent edge)
  if(numEdges > 0){
    dAngle = 2 * Math.PI / (numEdges);
  }else{
    return {shapes: shapes.slice(0),
            arranged_edge_ids: new Set(arrangedEdgeIds),
            arranged_vertex_ids: new Set(arrangedVertexIds)};
  }
  for(let i = 1; i <= edges.length; i++){
    shapes.push(arrange_edge(x, y, angle + (dAngle * i)));
  }
  return arrange_shapes(shapes.slice(0));

}

function render_firework(ctx, {trail, y, x}, age = ''){
}

function is_black([r, g, b]){
  return r == 0 && g == 0 && b == 0;
}

function round(number, decimalPlaces){
  let multiplier = Math.pow(10, decimalPlaces);
  let rounded = Math.round(multiplier * number) / multiplier;
  return rounded;
}

function add_controls(w, h){
  add_slider('min_height', '0', h, '10', MIN_HEIGHT);
}

function add_slider(name, min, max, step, value){
  let controlSpan = elem('controls');
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
  let sliderOnchange =
    function(event){
      text.value = event.target.value;
    };
  slider.addEventListener('change', sliderOnchange);

  controlSpan.appendChild(slider);
  controlSpan.appendChild(label);
  controlSpan.appendChild(text);
  controlSpan.appendChild(document.createElement('BR'));
}
