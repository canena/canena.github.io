---
title: An Elm To The Past
subtitle: This blog post compiles the advice I posted in a discussion on Elm Discourse on support of Elm for older browsers
description: This blog post compiles the advice I posted in a discussion on Elm Discourse on support of Elm for older browsers
publishedAt: 2018-02-24
githubIssue: 18
readingTime: 4min
tags: [elm, legacy-code, tech, web]
headerStyle: light
---

This blog post compiles the advice I posted in
<a href="https://discourse.elm-lang.org/t/elm-support-for-older-browsers-ie-9-10/744/6" target="_blank" rel="noopener noreferrer">a discussion on Elm Discourse</a>
on support of Elm for older browsers and is pretty much reproduced verbatim, thanks to the power Markdown.

I've put all the information in here to good use so head to
<a href="https://github.com/mfeineis/elm-legacy-browser-setup" target="_blank" rel="noopener noreferrer">https://github.com/mfeineis/elm-legacy-browser-setup</a>
if you want to see some code right away. I even managed to bring support for IE8+, which I didn't expect, tbh.

### Original Post Gist

"Is there an official list of supported browsers for Elm? If not, what is the oldest browser you've tested Elm against? Lastly, is there a way to make Elm work on at least IE9 and IE10?"

### TL;DR

If you have a valid HTML5 doctype and the mentioned polyfills in place an Elm program should run without problems in IE9+, iff you don't have any other ancient JS lingering around the same page that messes with global variables.

### The Long Version
The following are potential issues I've dealt with in the past with ancient JS engines. This is a quick run-down I compiled while looking through the generated code of one of my small Elm projects.

Low hanging fruit that is easily polyfillable, remember to include these <em>before</em> including your elmish JS:

* `console.log` doesn't exist in IE if the devtools are not open so maybe include <a href="https://github.com/paulmillr/console-polyfill" target="_blank" rel="noopener noreferrer">a console polyfill</a> or write one yourself
* IE lt 9 doesn't support `Array.prototype.indexOf()` -&gt; <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf" target="_blank" rel="noopener noreferrer">MDN polyfill</a>
* `String.prototype.trim` is not supported in IE lt 9 so use another <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim" target="_blank" rel="noopener noreferrer">MDN polyfill</a> to support that
* `JSON.stringify/JSON.parse` are IE8+ -&gt; <a href="https://www.json.org/" target="_blank" rel="noopener noreferrer">www.json.org has you covered</a>

Potential show-stoppers for IE lt 9:

* IE lt 9 doesn't have the proper W3C event model so `event.stopPropagation`, `event.stopImmediatePropagation`, `event.preventDefault` might be problematic, I'm not sure whether this is polyfillable without patching the kernel JS dealing with events that comes with `elm-lang/virtual-dom`
* IE lt 9 doesn't support `EventTarget.addEventListener/EventTarget.removeEventListener`

Not sure but might be problematic:

* I'm not sure about keywords as labels, in my code there is a `get:` label in `_elm_lang$core$Dict$get`, that could be an issue in older browsers - `get` isn't a keyword but in ES5 is used to define a getter so I wouldn't put it beyond IE to make a fuss about that
* I loosely remember `document.createDocumentFragment` only being IE8+ but MDN says IE supports it all the way

Non-issues:

* the JS has a `setTimeout` powered fallback for `requestAnimationFrame` so a polyfill doesn't seem necessary after all
* `"use strict";` is IE8+ but falls back gracefully so that shouldn't be a problem

Trivia:

The generated JS isn't that idiomatic especially with the usage of the curlies on the next line and the variable declarations that make the impression that JS has block scope where it actually has function scope. There are also a lot of unguarded `for (... in ...)` traversals that might throw off older IE, even more so if other JS lives on the same site that potentially modifies shared globals.

### General Advice:
Don't trust IE :-), no, seriously, don't trust it. Microsoft did a good job in keeping most of the behavior of their old JScript engine versions in their compatibility mode, kudos to the team that had that miserable job on their plate. The problems arise with the combinatorial explosion of the various document modes and their interaction with the legacy engines that are being carried around since days of yore. Multiply that by the fact that an IE version potentially behaves different on every major windows version, times the supported architectures. To sum up: the engine recreation is pretty good but the host objects and especially the document models will haunt you forever. My advice for managment still stands: if even Microsoft isn't supporting IE lt 11, why should you? Usually numbers work better with management, so my anecdotal tally is

<blockquote>
<p>1.5 * (time spent on all evergreen browsers combined) (lte) time spent on keeping IE supported</p>
</blockquote>

, so go figure.

### EDIT

I created a <a href="https://github.com/mfeineis/elm-legacy-browser-setup" target="_blank" rel="noopener noreferrer">small but useful example project</a>
based on the advice given in this article. The README should fill in the blanks.
