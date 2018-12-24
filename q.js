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
    },

  sin:
    function(count){
      let numbers = [];
      for(let i = 0; i < count; i++){
        numbers.push(round(Math.sin(Math.PI * (i / count) / 2)));
      }
      //console.log(`numbers: ${numbers}`);
      return numbers;
    },

  cos:
    function(count){
      let numbers = [];
      for(let i = 0; i < count; i++){
        //console.log(`i: ${i}`);
        numbers.push(round(Math.cos(Math.PI * (i / count) / 2)));
      }
      console.log(`numbers: ${numbers}`);
      return numbers;
    }

}

function round(f){
  return Math.round(f * 1000) / 1000;
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
    //console.log(`num: ${num}, denominator: ${denominator}, column: ${column}`);
    if(!columns[column]){
      columns[column] = [];
    }
    columns[column].push(1);
  }
  return columns;
}

function average_numbers(fun, count, numCols){
  let nums = fun(count);
  let numsToAvg = parseInt(count / numCols);
  let numbers = [];

  for(let i = 0, j = 0; i < nums.length; i += numsToAvg, j += 1){
    let sum = 0;
    for(let k = i; k < i + numsToAvg; k++){
      sum += nums[k];
    }
    numbers[j] = sum / numCols;
  }
  console.log(`numbers: ${numbers}`);
  return numbers;
}

function graph_distribution(fun, count = 10000){
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
                 50 + graphHeight - h,
                 colWidth,
                 50 + h);
  }
}

function average_numbers(fun, count, numCols){
  let nums = fun(count);
  let numsToAvg = parseInt(count / numCols);
  let numbers = [];

  for(let i = 0, j = 0; i < nums.length; i += numsToAvg, j += 1){
    let sum = 0;
    for(let k = i; k < i + numsToAvg; k++){
      sum += nums[k];
    }
    numbers[j] = sum / numCols;
  }
  return numbers;
}

function graph_numbers(fun, count = 10000){
  let c = elem('canvas1');
  let ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);

  let graphHeight = 300;
  let graphWidth = 700;
  let numbers = average_numbers(fun, count, graphWidth);
  let max = Reflect.apply(Math.max, undefined, numbers);
  let stepSize = max / graphHeight;
  let columnSizes = [];
  for(let i = 0; i < numbers.length; i++){
    columnSizes[i] = numbers[i] / stepSize;
  }
  let maxColSize = Reflect.apply(Math.max, undefined, columnSizes);
  let colWidth = 1;

  for(let i = 0; i < columnSizes.length; i++){
    console.log('Drawing column');
    let h = columnSizes[i];
    ctx.fillRect(i,
                 graphHeight - h,
                 colWidth,
                 h);
  }
}

function distribution(){
  let functionList = elem('functionList');
  let fun = generators[functionList.value];
  graph_distribution(fun, 100);
}

function numbers(){
  let functionList = elem('functionList');
  let fun = generators[functionList.value] || generators['sin'];
  graph_numbers(fun, 700);
}
