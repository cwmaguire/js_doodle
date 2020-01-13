"use strict";

let VERTEX_RADIUS = 10;
let EDGE_LENGTH = 100;

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
  let firstVertex = vertex_shape('1', x, y);
  let initialShapes = [firstVertex];
  let firstId = parseInt(Object.keys(GRAPH)[0]);
  let arrangedEdgeIds = [];
  let arrangedVertexIds = [firstId];
  let uniqueEdges = unique_edges(GRAPH);
  let arrangement = arrange_shapes(GRAPH,
                                   initialShapes,
                                   uniqueEdges,
                                   firstId,
                                   arrangedEdgeIds,
                                   arrangedVertexIds,
                                   x,
                                   y,
                                   nullStartingAngle);
  const shapes = arrangement.arranged_shapes;

  return {h: h, w: w, frame: 1, shapes: shapes};
}

function render({context: ctx, state: {h, w, frame, shapes}}){
  for(const shape of shapes){
    let debug = 'shape:';
    for(const property in shape){
      debug += ` ${property}: ${shape[property]}`
    }
    //console.log(debug);
    draw_shape(ctx, shape);
  }
  return {h: h, w: w, frame: frame, shapes: shapes};
}

function arrange_shapes(graph,
                        arrangedShapes,
                        uniqueEdges,
                        previousId,
                        arrangedEdgeIds,
                        arrangedVertexIds,
                        previousX,
                        previousY,
                        angle){

  let newArrangedShapes = arrangedShapes.slice(0);
  const numUniqueEdges = uniqueEdges.size;
  const numUniqueVerteces = (new Set(Object.keys(graph))).size;
  const areAllEdgesArranged = arrangedEdgeIds.size >= numUniqueEdges;
  const areAllVertecesArranged = arrangedVertexIds.size >= numUniqueVerteces;


  const isGraphArranged = areAllEdgesArranged && areAllVertecesArranged;
  if(isGraphArranged){
    return {arranged_shapes: arrangedShapes.slice(0),
            arranged_edge_ids: new Set(arrangedEdgeIds),
            arranged_vertex_ids: new Set(arrangedVertexIds)};
  }

  const siblingIds = Array.from(new Set(graph[previousId]['edges']));
  const edgeIds = edge_ids(previousId, siblingIds);
  const unarrangedEdges = set_minus(edgeIds, arrangedEdgeIds);
  const numEdges = edgeIds.length;
  let dAngle = 0;
  const hasEdgesToArrange = numEdges > 0;

  console.log(`Arranging vertex ${previousId} with siblings ${siblingIds}`);
  console.log(`Arranging vertex ${previousId}, has edges to arrange? ${hasEdgesToArrange}`);
  for(const edgeId of edgeIds){
    console.log(`Arrange vertex ${previousId}, has edge ${edgeId}`);
  }
  for(const edgeId of arrangedEdgeIds){
    console.log(`Arrange vertex ${previousId}, already arranged edge ${edgeId}`);
  }

  if(hasEdgesToArrange){
    dAngle = 2 * Math.PI / (numEdges);
  }else{
    return {arranged_shapes: arrangedShapes.slice(0),
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
  let _arrangedEdgeIds = new Set(arrangedEdgeIds);
  let _arrangedVertexIds = new Set(arrangedVertexIds);
  const paddingAngle = numArrangedEdges * dAngle;

  for(let i = 0; i < siblingIds.length; i++){
    const siblingId = siblingIds[i];
    const edgeId = edge_id(previousId, siblingId);
    const newAngle = paddingAngle + (dAngle * i);
    const edgeShape = edge_shape(edgeId, previousX, previousY, newAngle);

    const isEdgeArranged = _arrangedEdgeIds.has(edgeId);
    const isVertexArranged = _arrangedVertexIds.has(siblingId)

    if(isEdgeArranged && isVertexArranged){
      continue;
    }

    if(!isEdgeArranged){
      newArrangedShapes.push(edgeShape);
      _arrangedEdgeIds.add(edgeId);
    }

    const vertexShape = vertex_shape(siblingId, edgeShape.x2, edgeShape.y2);
    if(!isVertexArranged){
      newArrangedShapes.push(vertexShape);
      _arrangedVertexIds.add(siblingId);
    }

    const arrangedSubGraph =
      arrange_shapes(graph,
                     arrangedShapes,
                     uniqueEdges,
                     siblingId,
                     _arrangedEdgeIds,
                     _arrangedVertexIds,
                     vertexShape.x,
                     vertexShape.y,
                     newAngle);

    newArrangedShapes = newArrangedShapes.concat(arrangedSubGraph.arranged_shapes);
    _arrangedEdgeIds = set_union(_arrangedEdgeIds, arrangedSubGraph.arranged_edge_ids);
    _arrangedVertexIds = set_union(_arrangedVertexIds, arrangedSubGraph.arranged_vertex_ids);
  }

  return {arranged_shapes: newArrangedShapes,
          arranged_edge_ids: new Set(arrangedEdgeIds),
          arranged_vertex_ids: new Set(arrangedVertexIds)}
}

function vertex_shape(id, x, y){
  return {type: 'vertex',
          id: id,
          x: x,
          y: y};
}

function edge_shape(id, x, y, angle){
  let edgeLength = get_control_value('edge_length', 'int');
  let dx = Math.cos(angle) * edgeLength;
  let dy = Math.sin(angle) * edgeLength;
  console.log(`edge_shape: id: ${id}, edgeLength: ${edgeLength}, x1: ${x}, y1: ${y}, dx: ${dx}, dy: ${dy}, x2: ${x + dx}, y2: ${y + dy}`);
  return {type: 'edge',
          id: id,
          x1: x,
          y1: y,
          x2: x + dx,
          y2: y + dy};
}

function edge_ids(fromId, toIds){
  let edgeIds = [];
  for(let toId of toIds){
    edgeIds.push(edge_id(fromId, toId));
  }
  return edgeIds;
}

function edge_id(vertexId1, vertexId2){
  const minVertexId = Math.min(vertexId1, vertexId2);
  const maxVertexId = Math.max(vertexId1, vertexId2);
  return `${minVertexId}-${maxVertexId}`;
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

function draw_shape(ctx, shape){
  let debug = 'draw_shape()';
  for(let prop in shape){
    debug += ` shape.${prop}: ${shape[prop]}`;
  }
  console.log(debug);

  if(shape.type == 'vertex'){
    draw_vertex(ctx, shape);
  }else if(shape.type == 'edge'){
    draw_edge(ctx, shape);
  }
}

function draw_vertex(ctx, vertex){
  const radius = get_control_value('vertex_radius', 'int');
  const rotation = 0;
  const startAngle = 0;
  const endAngle = Math.PI * 2;
  const gradient = ctx.createLinearGradient(vertex.x - 20, vertex.y - 20, vertex.x + 20, vertex.y + 20);
  gradient.addColorStop(0.0, 'black');
  gradient.addColorStop(1.0, '#9090FF');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(vertex.x, vertex.y, radius, radius, rotation, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();

  const textOffsetX = vertex.x - radius / 2;
  const textOffsetY = vertex.y + radius / 2;
  ctx.fillStyle = 'white';
  ctx.font = '16pt serif';
  ctx.fillText(vertex.id, textOffsetX, textOffsetY);
}

function draw_edge(ctx, edge){
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(edge.x1, edge.y1);
  ctx.lineTo(edge.x2, edge.y2);
  ctx.closePath();
  ctx.stroke();

  const width = edge.x2 - edge.x1;
  const textOffsetX = edge.x1 + width / 2 - 20;
  const height = edge.y1 - edge.y2;
  const textOffsetY = edge.y1 - height / 2;
  //console.log(`Width: ${width}, textOffsetX: ${textOffsetX}, height: ${height}, textOffsetY: ${textOffsetY}`);
  ctx.fillStyle = 'black';
  ctx.font = '16pt serif';
  ctx.fillText(edge.id, textOffsetX, textOffsetY);
}
