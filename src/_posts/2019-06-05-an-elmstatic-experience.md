---
title: An Elmstatic Experience
tags: elm tech web
---

A quick walkthrough of how I migrated this site to use [Elmstatic][elmstatic] instead of my buggy, hand-made Elm-to-static-HTML script.

## Iterate, Adapt, Repeat
Originally the blog started out using plain HTML/CSS employing a rather strict [<abbr title="Block-Element-Modifier">BEM</abbr>][bem] approach. As I got more into [Elm][elm] at the time I decided it would be a fun exercise to use it to create the markup and [elm-static-html-lib][] seemed like a good choice. And so I hacked away at a [Node][nodejs] script that produced the desired artifacts out of an Elm/Markdown mixture; the outcome certainly wasn't something to be proud of. It was pretty buggy and annoying to work with, to be honest, but being able to leverage Elm for the layout stuff and writing content in Markdown was still the big plus I hoped for, so I didn't roll back. I did wait for official server-side-rendering support that seemed to be on the horizon at that time.

## Enter Elmstatic
However, as it became clear that official support for server-side-rendering would be put on hold when 0.19 was released and [elm-static-html-lib][] didn't receive an upgrade to the new language version I started to look for alternatives. Since users were now barred from (ab-)using [never published-as-an-API `Native` modules][elm-native-modules] many workable approaches in Elm 0.18 seized to be an option, short of forking the [Elm compiler][elm-compiler] - probably for the better. So I ultimately opted for [Elmstatic][elmstatic] instead of rolling my own because the setup is essentially the same I had thought of earlier:

* no dynamic content creation needed so use a static site generator
* keep on relying on [Markdown][markdown] for content
* continue to use [Elm][elm] for most of the layout structure and styling
* use [JSDOM][jsdom] to run the Elm app to produce the final markup
* reduce [NPM][npm] dependencies as much as possible

On top of that the usage is so straight forward, it is a delight

```bash
npm install --save-dev elm@elm0.19.0 elmstatic && npx elmstatic init
# do your thing
npx elmstatic
```

## Content Migration
Most of my posts are pretty basic and didn't really need any adjustment apart from moving the post metadata from my custom Elm structure into the markdown [frontmatter][].

```elm
meta =
    { date = Date.date 2019 3 4
    , route = Article Blog_2019_03_04_typescript_vs_the_real_world
    , tags =
        [ Elm
        , Tech
        , Web
        ]
    , title = "TypeScript vs the Real World"
    }
```
became
```
---
title: TypeScript vs the Real World
tags: elm tech web
---
```

Note that [Elmstatic][elmstatic] takes care of the date and routing stuff for you, just name the file according to `YYYY-MM-DD-your-url-safe-title` and you're good to go.

## Layout Migration

To my surprise I didn't even hit a bump when I migrated my [Hello Living Styleguide](/posts/2017-01-18-hello-living-style-guide) post that demonstrated the [BEM][bem] blocks used for the layout. Due to the mild namespacing of the BEM styles to a `.ui-theme` that I'd always found useful it was pretty easy to include the old styles inside a custom Elmstatic layout and have them applied only to the content sub-tree of the document without disturbing the new styling. Very nice!

```html
<html class="ui-layout">
...
<body>
  ...
  <link rel="stylesheet" href="oldstyles.css">
  <div class="ui-theme">
    <!-- BEM styles only apply here -->
  </div>
</body>

```

As I had no intention of continuing to use my hopelessly over-engineered [BEM CSS][bem] styles I just adapted the [elm-css][] global styles that came with the scaffold. I might come back to that and do some cleanup in the future now that that it's backed by Elm instead of [less][lesscss].

## Bumps Along the Road
The migration turned out to be very straight forward but as always there were some minor annoyances.

### No typed routes
I did lose one feature along the way in that my custom script supported extracting routes and tags from [Elm Custom Types][elm-custom-types] with the help of some dark regex magic so Elm would complain when I got a route wrong, no big deal.

### Static Deployment <strike>is</strike> can be easy
Not a problem with Elmstatic but after realizing that [user/org pages on Github need to be served from / in `master`][ghpages-from-master] I scrapped my deploy-to-docs-directory strategy and moved all the source files into the `src` directory and had the build-step copy the built artifacts into the repository root. Et vóila, it works!

## Conclusion
I'm rather happy how the site turned out due to the well-thought-out design of Elmstatic that leaves plenty of room for customization and having Elm as an ally when creating layouts and styles is always a breeze.

It's been a great experience, thanks [Alex Korban][ext-korban] for [Elmstatic][elmstatic]!


[bem]: http://getbem.com/introduction/
[elm]: https://www.elm-lang.org
[elm-compiler]: https://github.com/elm/compiler
[elm-css]: https://github.com/rtfeldman/elm-css
[elm-custom-types]: https://guide.elm-lang.org/types/custom_types.html
[elm-native-modules]: https://discourse.elm-lang.org/t/native-code-in-0-19/826
[elm-static-html-lib]: https://github.com/eeue56/elm-static-html-lib
[elmstatic]: https://github.com/alexkorban/elmstatic
[ext-korban]: https://korban.net
[frontmatter]: https://jekyllrb.com/docs/front-matter/
[github]: https://github.com
[ghpages-from-master]: https://help.github.com/en/articles/user-organization-and-project-pages#user-and-organization-pages-sites
[lesscss]: http://lesscss.org/
[jsdom]: https://github.com/jsdom/jsdom
[nodejs]: https://www.nodejs.org
[npm]: https://npmjs.com
[markdown]: https://daringfireball.net/projects/markdown/syntax

