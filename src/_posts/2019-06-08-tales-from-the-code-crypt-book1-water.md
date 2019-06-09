---
title: Tales From the Code Crypt - Book 1, Water
tags: code-crypt javascript tech web
imports: demos/water/boot mathjax
---

I recently waded through my own code archives and rediscovered some interesting and/or formative gems I think are worth discussing. This post is the first installment of this series to showcase and evaluate what past-me-code was all about.


## Efficient Water Imitation

This post presents a water imitation algorithm that employs a front-/back-buffer smoothing approach I fiddled around with probably around 2008. Full disclosure: I'm not the originator of this neat trick. Unfortunately, I'm not sure when and where I got the actual calculations from, I'm sorry for that.

Before we jump into the explanation, let's have a look at a quick demo of what we are talking about. *Caution:* this might be a bit much for your mobile device.

<div class="code-demo water">
  <noscript>
    If you want to see this demo you need to allow JavaScript for this page.
  </noscript>
  <div class="code-demo__content code-demo__content--hidden">
    <canvas class="water__pool" width="400" height="300">
      <img src="/img/water_bg.png" width="400" height="300">
    </canvas>
    <canvas class="water__buffer" width="400" height="300"></canvas>
  </div>
  <div class="code-demo__toolbar">
    <button class="btn" data-trigger="water.start" disabled>Start Demo</button>
    <button class="btn" data-trigger="water.stop" disabled>Stop</button>
  </div>
</div>

The first box shows the final composited image using the [`<canvas>` API][canvas]. You can move the mouse over the canvas, it also reacts to clicks or taps when you're on mobile. Each event causes a ripple that travels the surface and gets reflected from the border of the canvas.

Notice how there is no loss in performance no matter how many ripples are moving around the surface. What's also interesting is that the ripples move in and out of each other with ease. 


## How It Works

The effect is produced by a surprisingly simple iterative loop of a step function, working on two full-image-sized buffers, that is comprised of three steps.

```javascript
// Pseudo Code
function step() {
    swapBuffer();
    computeNext();
    renderCurrent();
}
```

On every iteration the selected buffer is alternated between the two input buffers. `computeNext()` is a straight forward [convolution smoothing filter][kernel] folding over the immediate neighboring values of the current buffer and the damped former value of the second buffer at that location

$$b_2'(x,y) = {{b_1(x-1,y) + b_1(x+1,y) + b_1(x,y+1) + b_1(x,y-1) \over 2} - b_2(x,y) * damping}.$$

As you probably guessed: the second box of the demo visualizes the components being used to calculate the refraction of the waves. If you stop the demo when waves are traveling you can see the actual color coding, more specifically

$$offset_x=b_1(x-1,y) - b_1(x+1,y)$$
$$offset_y=b_1(x,y-1) - b_1(x,y+1)$$
$$R=offset_x,G=offset_y,B=||L_2||(offset_x,offset_y)$$

this information is then used in the rendering stage to emulate refraction by selecting the color value of the original image at the displaced location

$$out(x,y)={in(x+offset_x,y+offset_y)}.$$

To create a ripple we just place a high value inside one of the buffers and watch it being smoothed out into waves.


## Observations

Using your browser's development tools you can inspect the demo code which has been partially adapted to my preferred code structure these days.

Looking at the code it looks pretty old-school with all the variables declared upfront to avoid [<abbr title="Garbage Collection">GC</abbr>][gc] hiccups and plain `for` loops. The `step` function handles scheduling the next iteration itself via [`window.requestAnimationFrame`][requestAnimationFrame].

As the smoothing algorithm employs a classic image convolution kernel the initialization logic takes care to fill up the border regions with original image data, these pixels won't be touched by the `step` function because they don't have enough neighbors for the computation. There are ways around this but this demo isn't meant to explore these edge-cases.

There certainly is room for improvement in that the smoothing step is blindly computed on every iteration step without taking the timestamp provided by `window.requestAnimationFrame` into account - which means that the animation will be faster the more animation frames the browser allocates for the page, not exactly elegant.

An attentive observer may also have realized that the ripples don't have a circular shape as opposed to real water ripples but instead resemble rounded rectangles - a side-effect of the simple algorithm employed.

## Verdict

This was a nice nostalgic trip for the first entry in this series, I for one certainly have difficulty taking my eyes of that mesmerizing effect. I hope you got something out of it yourself. See you next time!



[canvas]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
[gc]: https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)
[kernel]: https://en.wikipedia.org/wiki/Kernel_(image_processing)
[requestAnimationFrame]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

