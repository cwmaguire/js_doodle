# js_doodle
Doodling with Javascript

After watching [Mathieu 'p01' Henri: Making Realtime Audio-Visuals - JSConf.Asia 2015](https://www.youtube.com/watch?v=16oLi1kvLHs&feature=youtu.be)
I decided to play around some more with JavaScript drawing.

Between the comments in the various .js files and the commit comments
it's possible to figure out what _some_ of the .js files are about.

Learnings:
* Canvas rotations rotate from origin, not center
* It takes me a lot of trig to get a point back to where it started
  after rotating
* A bottom canvas will show through an empty top canvas
* Canvas.style.height is _not_ the same as canvas.height
* Canvas.width and Canvas.height get defaults (500 x 300?)
