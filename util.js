"use strict";

function out(field, text){
  document.getElementById(field).value = text;
}

function read(field, type){
  return cast(document.getElementById(field).value, type);
}

function cast(value, type){
  switch(type){
    case "int":
      return parseInt(value);
    case "bool":
      return value == "true";
  }
}

function clone(state){
  var newState = {};
  var f;
  for(f in state){
    newState[f] = state[f];
  }
  return newState;
}
