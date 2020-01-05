"use strict";

let VERTEX_RADIUS = 10;
let EDGE_LENGTH = 10;

/*
 *     2
 *    /
 *   /
 *  1--3
 *   \ |
 *    \|
 *     4
 *
 */

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
  for(shape of shapes){
    draw_shape(shape);
  }
  return {h: h, w: w, frame: frame, shapes: shapes};
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
  if(isGraphArranged){
    return {shapes: shapes.slice(0),
            arranged_edge_ids: new Set(arrangedEdgeIds),
            arranged_vertex_ids: new Set(arrangedVertexIds)};
  }

  // angle between child edges
  console.log('Previous ID = ' + previousId);
  const siblingIds = Array.from(new Set(graph[previousId]['edges']));
  const edges = edge_ids(previousId, siblingIds);
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
  const numArrangedEdges = numEdges - unarrangedEdges.size;

  // draw undrawn child edges and undrawn child verteces
  // (an drawn vertex might not have a connected edge:
  //       a
  //      / \
  //     b--c
  //  if we draw a--b, then b--c we still need a--c)
  let newShapes;
  let _arrangedEdgeIds = new Set(arrangedEdgeIds);
  let _arrangedVertexIds = new Set(arrangedVertexIds);
  const paddingAngle = numArrangedEdges * dAngle;

  for(let i = 0; i < siblingIds.length; i++){
  //for(const siblingId of siblingIds){
    // we might need to draw the vertex even if we don't
    // need to draw the edge
    // (see example above)
    let siblingId = siblingIds[i];
    let edgeShape = edge_shape(x, y, paddingAngle + (dAngle * i));

    // do we need to draw the edge?
    if(!_arrangedEdgeIds.has(siblingId)){
      shapes.push(edgeShape);
      _arrangedEdgeIds.push(siblingId);
    }

    // do we need to draw the vertex?
    if(!_arrangedVertexIds.has(siblingId)){
      let vertex_ = vertex(edge_.x2, edge_.y2);
      shapes.push(vertex_);
      arrangedVerteces.push(vertex_);
    }

    // return the new shapes and arranged verteces and edges
    ({shapes: newShapes,
      arranged_edge_ids: recursiveArrangedEdgeIds,
      arranged_vertex_ids: recursiveArrangedVertexIds} =
        arrange_shapes(graph,
                       uniqueEdges,
                       id,
                       _arrangedEdgeIds,
                       _arrangedVertexIds,
                       shapes,
                       vertex_.x,
                       vertex_.y,
                       angle));

    // each loop add all the recursive edges and verteces

    shapes = shapes.concat(newShapes);
    _arrangedEdgeIds = set_union(_arrangedEdgeIds, recursiveArrangedEdgeIds);
    _arrangedVertexIds = set_union(_arrangedVertexIds, recursiveArrangedVertexIds);
  }

  console.log('newShapes: ' + newShapes);

  return {shapes: shapes,
          arranged_edge_ids: new Set(arrangedEdgeIds),
          arranged_vertex_ids: new Set(arrangedVertexIds)}
}

function vertex_shape(x, y){
  return {type: 'vertex',
          x: x,
          y: y};
}

function edge_shape(x, y, angle){
  let edgeLength = elem('edge_length_text').value;
  let dx = Math.cos(angle) * edgeLength;
  let dy = Math.sin(angle) * edgeLength;
  return {type: 'edge',
          x1: x,
          y1: y,
          x2: x + dx,
          y2: y + dy};
}

function edge_ids(fromId, toIds){
  let edgeIds = [];
  for(let toId of toIds){
    edgeIds.push('${fromId}-${toId}');
  }
  return edgeIds;
}

function unique_edges(graph){
  let uniqueEdges = new Set([]);
  for(const vertex in graph){
    for(const edge of graph[vertex]['edges']){
      const vertex1 = Math.min(vertex, edge);
      const vertex2 = Math.max(vertex, edge);
      uniqueEdges.add('' + vertex1 + '-' + vertex2);
    }
  }
  return uniqueEdges;
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
  add_slider('vertex_radius', '0', '100', '5', VERTEX_RADIUS);
  add_slider('edge_length', '0', '200', '5', EDGE_LENGTH);
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

function draw_shape(){
  console.log('draw_shape() called');
}
