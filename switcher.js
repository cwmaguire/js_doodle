"use strict";

const scripts = ["b.js",
                 "c.js",
                 "d.js",
                 "e.js",
                 "f.js",
                 "g.js",
                 "h.js",
                 "i.js",
                 "j.js",
                 "k.js",
                 "m.js",
                 "n.js",
                 "o.js",
                 "p.js"];

let currentScript;
let isAnimationCancelled = false;

function load_scripts(){
  let datalist = elem('scripts');
  for(let script of scripts){
    let option = document.createElement("OPTION");
    option.id = datalist.id + "_" + script;
    option.value = script;
    datalist.appendChild(option);
  }
}

function change_script(event){
  let input = event.target;
  let value = input.value;
  input.value = "";
  animation.cancel();
  let existingScript = currentScript;
  if(currentScript){
    currentScript.remove();
  }
  load_script(value);
}

function animation_continue_check(id){
  console.log(`animation_continue_check(${id})`);
  return !isAnimationCancelled;
}

function load_script(script){
  let s = document.createElement("script");
  s.src = script;
  s.id = "script_" + script;
  currentScript = s;

  s.onload = function() {
    // I'm assuming loading a new script with a render
    // function will overwrite the previous one
    animation.animate(init(), render);
  };

  document.body.appendChild(s);
}
