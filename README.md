# js_doodle
Doodling with Javascript

After watching [Mathieu 'p01' Henri: Making Realtime Audio-Visuals - JSConf.Asia 2015](https://www.youtube.com/watch?v=16oLi1kvLHs&feature=youtu.be)
I decided to play around some more with JavaScript drawing.

Between the comments in the various .js files and the commit comments
it's possible to figure out what _some_ of the .js files are about.
Until I implement a non-horrible way of trying out the different
animations and drawings each of the .js files in a.html can be
uncommented (one at a time) to see what they do. They all use the
animate() call. (I just kept copying the same file, renaming it and
tweaking it so it used the same format.)

Learnings:
* Canvas rotations rotate from origin, not center
* It takes me a lot of trig to get a point back to where it started
  after rotating
* A bottom canvas will show through an empty top canvas
* Canvas.style.height is _not_ the same as canvas.height
* Canvas.width and Canvas.height get defaults (500 x 300?)
* Chrome can call an update function so you don't have to roll
  your own animation loop. (But you still might need to calculate
  the right times to draw instead of drawing as fast as the screen
  can re-draw.)
