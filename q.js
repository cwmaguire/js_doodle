"use strict";

let generators = {
  random_numbers:
    function(count){
      let nums = [];
      for(let i = 0; i < count; i++){
        nums.push(Math.random() * 100);
      }
      return nums;
    },

  ones:
    function(count){
      let ones = [];
      for(let i = 0; i < count; i++){
        ones.push(1);
      }
      return ones.slice();
    },

  mod:
    function(count){
      let ones = [];
      for(let i = 0; i < count; i++){
        ones.push(i % 10);
      }
      return ones.slice();
    },

  centered:
    function(count){
      let numbers = [];
      for(let i = 0; i < (count * 2/3); i++){
        numbers.push(Math.random() * 100);
      }
      for(let i = 0; i < (count * 1/3); i++){
        numbers.push(Math.random() * 50 + 25);
      }
      return numbers.slice();
    },

  centered2:
    function(count){
      let numbers = [];
      for(let i = 0; i < (count * 3/6); i++){
        numbers.push(Math.random() * 100);
      }
      for(let i = 0; i < (count * 2/6); i++){
        numbers.push(Math.random() * 50 + 25);
      }
      for(let i = 0; i < (count * 1/6); i++){
        numbers.push(Math.random() * 25 + 37.5);
      }
      return numbers.slice();
    },

  centered3:
    function(count){
      let numbers = [];
      for(let i = 0; i < (count * 1/6); i++){
        numbers.push(Math.random() * 100);
      }
      for(let i = 0; i < (count * 2/6); i++){
        numbers.push(Math.random() * 50 + 25);
      }
      for(let i = 0; i < (count * 3/6); i++){
        numbers.push(Math.random() * 25 + 37.5);
      }
      return numbers.slice();
    },

  spike:
    function(count){
      let numbers = [];
      for(let i = 0; i < (count * 1/3); i++){
        numbers.push(Math.random() * 100);
      }
      for(let i = 0; i < (count * 2/3); i++){
        numbers.push(Math.random() * 10 + 45);
      }
      return numbers.slice();
    }

}

function load_functions(){
  let datalist = elem('functions');
  for(let name in generators){
    let option = document.createElement("OPTION");
    option.id = datalist.id + "_" + name;
    option.value = name;
    datalist.appendChild(option);
  }
}


function group_numbers(fun, count, numCols){
  let nums = fun(count);
  let max = Reflect.apply(Math.max, undefined, nums);
  let denominator = max / numCols;
  let columns = [];

  for(let num of nums.sort((x, y) => x - y)){
    let column = Math.floor(num / denominator);
    if(!columns[column]){
      columns[column] = [1];
    }
    columns[column].push(1);
  }
  return columns;
}

function graph_numbers(fun, count = 10000){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  let numColumns = 100;
  let columns = group_numbers(fun, count, numColumns);
  let columnSizes = [];
  for(let i = 0; i < columns.length; i++){
    columnSizes[i] = columns[i] ? columns[i].length : 0;
  }
  let maxColSize = Reflect.apply(Math.max, undefined, columnSizes);
  let graphHeight = 300;
  let stepHeight = graphHeight / maxColSize;
  let graphWidth = 700;
  let colSpacing = 3;
  let totalColSpacing = colSpacing * (columns.length - 1);
  let colWidth = Math.floor((graphWidth - totalColSpacing) / columns.length);

  for(let i = 0; i < columns.length; i++){
    if(!columns[i]){
      continue
    }
    let x = i ? i * (colWidth + colSpacing) : 0;
    let h = columns[i].length * stepHeight;
    ctx.fillRect(x,
                 graphHeight - h,
                 colWidth,
                 h);
  }
}

function draw(){
  let functionList = elem('functionList');
  let fun = generators[functionList.value];
  graph_numbers(fun, 100);
}
