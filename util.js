"use strict";

function toHex(i){
  var str = Math.round(i).toString(16);
  if(str.length == 1){
    return "0" + str;
  }else{
    return str;
  }
}

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

function round(x, places){
  places = places | 3;
  return Math.round(x * Math.pow(10, places)) / Math.pow(10, places);
}

function int_rgb(i){
  var r = mod255(mod255(i) * 2);
  var g = 255 - mod255(i * 4);
  var b = 255 - mod255(i * 4);
  return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
}

function gradient(fromColor, toColor, length){
  var fromRGB = color_rgb(fromColor);
  //console.log(fromRGB);
  var toRGB = color_rgb(toColor);
  //console.log(toRGB);
  var deltas = map(apply2(function(f, t){ return (t - f) / length }), zip(fromRGB, toRGB));
  //console.log(deltas);
  var comp_deltas = zip3(fromRGB, toRGB, deltas);
  //console.log(comp_deltas);

  var seqs = map(apply3(seqBy), comp_deltas);
  //console.log(seqs);

  var colors = apply3(zip3)(seqs);
  //console.log(colors);

  return map(rgb_color, apply3(zip3)(map(apply3(seqBy), comp_deltas)));
}

function rgb_color(arr){
  return foldl(function(e, acc){return acc + toHex(e)}, arr, "#");
}

function color_rgb(color){
  return map(from_hex, [color.substr(1, 2), color.substr(3, 2), color.substr(5, 2)]);
}

function from_hex(hex){
  return parseInt(hex, 16);
}

function from_hex_Test(){
  return from_hex("f") == 15 &&
         from_hex("A1") == 161 &&
         from_hex("0") == 0 &&
         from_hex("100") == 256;
}

function to_list(string, maybe_list){
  var list;
  if(maybe_list == undefined){
    list = [];
  }else{
    list = maybe_list.slice(0);
  }
  if(string.length == 0){
    return reverse(list);
  }
  return to_list(string.substr(1), cons(list, string.substr(0,1)));
}

function to_list_Test(){
  return equal(to_list("abc"), ["a", "b", "c"]) &&
         equal(to_list("a"), ["a"]) &&
         equal(to_list(""), []);
}
