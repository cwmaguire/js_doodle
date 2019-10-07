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
                 "n2.js",
                 "o.js",
                 "o2.js",
                 "o3.js",
                 "o4.js",
                 "p.js",
                 "r.js",
                 "fill_with_squares.js",
                 "fill_with_squares_2.js"];

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
  clear_controls();
  load_script(value);
}

function load_script(script){
  let s = document.createElement("script");
  s.src = script;
  s.id = "script_" + script;
  currentScript = s;

  s.onload = function() {
    if(window['scriptDesc']){
      elem('scriptDescInput').value = script + ': ' + window.scriptDesc();
    }else{
      elem('scriptDescInput').value = script + ': No script description';
    }
    run_current_script();
  };

  document.body.appendChild(s);
}

function run_current_script(){
  let fps = cast(elem('fps').value, 'int');
  let frameLimit = cast(elem('frameLimit').value, 'int');
  let shouldClear = window['should_clear'] && should_clear();
  let initState = {};
  if(window['init']){
    initState = init();
    //for(let p in initState){
      //console.log(`run_current_script: initState[${p}]: ${initState[p]}`);
    //}
  }
  animation.animate(initState, render, frameLimit, fps, shouldClear);
}

function clear_controls(){
  let span = elem('controls');
  // remove in reverse order because this is a live collection
  // and the indices will update as we remove children
  for(let i = span.children.length - 1; i >= 0; i--){
    let child = span.children[i];
    child.remove();
  }
}
