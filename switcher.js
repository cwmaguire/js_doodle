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

function load_script(script){
  let s = document.createElement("script");
  s.src = script;
  s.id = "script_" + script;
  currentScript = s;

  s.onload = function() {
    if(window['scriptDesc']){
      elem('scriptDescInput').value = window.scriptDesc();
    }else{
      elem('scriptDescInput').value = 'No script description';
    }
    run_current_script();
  };

  document.body.appendChild(s);
}

function run_current_script(){
  let frameLimit = cast(elem('frameLimit').value, 'int');
  let initState = {};
  if(window['init']){
    initState = init();
    //for(let p in initState){
      //console.log(`run_current_script: initState[${p}]: ${initState[p]}`);
    //}
  }

  animation.animate(initState, render, frameLimit);
}
