# js_doodle
Doodling with Javascript

After watching [Mathieu 'p01' Henri: Making Realtime Audio-Visuals - JSConf.Asia 2015](https://www.youtube.com/watch?v=16oLi1kvLHs&feature=youtu.be)
I decided to play around some more with JavaScript drawing.

(By "play around" I mean I'm not writing in a functional style, I'm not
using my functional JS library, I'm not worrying about global vars,
comments or functions and I'm not even coming up with sensible names.
I'm iterating quickly, learning, screwing around
and just trying to get things to work. This is actually dumb in a way
because "screwing around" projects have a way of turning out useful and
outliving their low-quality. It's also not very risky because I have a
lot of "screwing around" projects that are actually coded carefully and
still haven't seen any use! :). The "t1" through "t6" simply stand for
"text field 1...6". Like I said, screwing around. Of course, I'm not so
reckless as to forego using git! That's just asking for trouble.)

I've implemented a script switcher to try out the different scripts.
The datalist has to be updated manually though. I don't yet know how to
find available scripts dynamically.

All the scripts have been updated to use my animation library. The
number of frames to run the animation can be specified and the animation
can be stopped.

Learnings:
* Canvas rotations rotate from origin, not center
 * D'oh! You can draw "outside" the context so you can put the context
   in the center and rotate it around the middle of the canvas
* It takes me a lot of trig to get a point back to where it started
  after rotating
* A bottom canvas will show through an empty top canvas
* Canvas.style.height is _not_ the same as canvas.height
* Canvas.width and Canvas.height get defaults (500 x 300?)
* Chrome can call an update function so you don't have to roll
  your own animation loop. (But you still might need to calculate
  the right times to draw instead of drawing as fast as the screen
  can re-draw.)
* Forgetting ctx.beginPath() will prevent you from clearing the
  canvas.
