---
title: An Elmstatic Experience
subtitle: A quick walkthrough of how I migrated this site to use Elmstatic
description: A quick walkthrough of how I migrated this site to use Elmstatic
publishedAt: 2019-06-05
githubIssue: 21
readingTime: 5min
tags: [elm, tech, web]
headerStyle: light
---

> <b>Update 2023-02-23</b>
> <p>Note that this site no longer employs <b>elmstatic</b>, it's a great project nontheless so the rest of the article stays as is.</p>

A quick walkthrough of how I migrated this site to use <a href="https://github.com/alexkorban/elmstatic" target="_blank" rel="noopener noreferrer">Elmstatic</a> instead of my buggy, hand-made Elm-to-static-HTML script.

### Iterate, Adapt, Repeat

Originally the blog started out using plain HTML/CSS employing a rather strict <a href="http://getbem.com/introduction/" target="_blank" rel="noopener noreferrer"><abbr title="Block-Element-Modifier">BEM</abbr></a> approach. As I got more into <a href="https://www.elm-lang.org" target="_blank" rel="noopener noreferrer">Elm</a> at the time I decided it would be a fun exercise to use it to create the markup and <a href="https://github.com/eeue56/elm-static-html-lib" target="_blank" rel="noopener noreferrer">elm-static-html-lib</a> seemed like a good choice. And so I hacked away at a <a href="https://www.nodejs.org" target="_blank" rel="noopener noreferrer">Node</a> script that produced the desired artifacts out of an Elm/Markdown mixture; the outcome certainly wasn't something to be proud of. It was pretty buggy and annoying to work with, to be honest, but being able to leverage Elm for the layout stuff and writing content in Markdown was still the big plus I hoped for, so I didn't roll back. I did wait for official server-side-rendering support that seemed to be on the horizon at that time.

### Enter Elmstatic

However, as it became clear that official support for server-side-rendering would be put on hold when 0.19 was released and <a href="https://github.com/eeue56/elm-static-html-lib" target="_blank" rel="noopener noreferrer">elm-static-html-lib</a> didn't receive an upgrade to the new language version I started to look for alternatives. Since users were now barred from (ab-)using <a href="https://discourse.elm-lang.org/t/native-code-in-0-19/826" target="_blank" rel="noopener noreferrer">never published-as-an-API <code>Native</code> modules</a> many workable approaches in Elm 0.18 seized to be an option, short of forking the <a href="https://github.com/elm/compiler" target="_blank" rel="noopener noreferrer">Elm compiler</a> - probably for the better. So I ultimately opted for <a href="https://github.com/alexkorban/elmstatic" target="_blank" rel="noopener noreferrer">Elmstatic</a> instead of rolling my own because the setup is essentially the same I had thought of earlier:

* No dynamic content creation needed so use a static site generator
* Keep on relying on <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank" rel="noopener noreferrer">Markdown</a> for content
* Continue to use <a href="https://www.elm-lang.org" target="_blank" rel="noopener noreferrer">Elm</a> for most of the layout structure and styling
* Use <a href="https://github.com/jsdom/jsdom" target="_blank" rel="noopener noreferrer">JSDOM</a> to run the Elm app to produce the final markup
* Reduce <a href="https://npmjs.com" target="_blank" rel="noopener noreferrer">NPM</a> dependencies as much as possible

On top of that the usage is so straight forward, it is a delight

```bash
npm install --save-dev elm@elm0.19.0 elmstatic && npx elmstatic init
# do your thing
npx elmstatic
```

### Content Migration

Most of my posts are pretty basic and didn't really need any adjustment apart from moving the post metadata from my custom Elm structure into the markdown <a href="https://jekyllrb.com/docs/front-matter/" target="_blank" rel="noopener noreferrer">frontmatter</a>.

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

```markdown
---
title: TypeScript vs the Real World
tags: elm tech web
---
```

Note that <a href="https://github.com/alexkorban/elmstatic" target="_blank" rel="noopener noreferrer">Elmstatic</a> takes care of the date and routing stuff for you, just name the file according to `YYYY-MM-DD-your-url-safe-title` and you're good to go.

### Layout Migration

To my surprise I didn't even hit a bump when I migrated my <a href="/posts/2017-01-18-hello-living-style-guide" target="_blank" rel="noopener noreferrer">Hello Living Styleguide</a> post that demonstrated the <a href="http://getbem.com/introduction/" target="_blank" rel="noopener noreferrer">BEM</a> blocks used for the layout. Due to the mild namespacing of the BEM styles to a <code>.ui-theme</code> that I'd always found useful it was pretty easy to include the old styles inside a custom Elmstatic layout and have them applied only to the content sub-tree of the document without disturbing the new styling. Very nice!

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
</html>
```

As I had no intention of continuing to use my hopelessly over-engineered <a href="http://getbem.com/introduction/">BEM CSS</a> styles I just adapted the <a href="https://github.com/rtfeldman/elm-css" target="_blank" rel="noopener noreferrer">elm-css</a> global styles that came with the scaffold. I might come back to that and do some cleanup in the future now that that it's backed by Elm instead of <a href="http://lesscss.org/" target="_blank" rel="noopener noreferrer">less</a>.

### Lessons Learned Along the Road

The migration turned out to be very straight forward but as always there were some minor annoyances.

#### No Typed Routes

I did lose one feature along the way in that my custom script supported extracting routes and tags from <a href="https://guide.elm-lang.org/types/custom_types.html" target="_blank" rel="noopener noreferrer">Elm Custom Types</a> with the help of some dark regex magic so Elm would complain when I got a route wrong, no big deal.

#### Static Deployment <strike>is</strike> can be easy

Not a problem with Elmstatic but after realizing that <a href="https://help.github.com/en/articles/user-organization-and-project-pages#user-and-organization-pages-sites" target="_blank" rel="noopener noreferrer">user/org pages on Github need to be served from / in `master`</a> I scrapped my deploy-to-docs-directory strategy and moved all the source files into the `src` directory and had the build-step copy the built artifacts into the repository root. Et vóila, it works!

#### Yarn Is Fast

Lately I've been using a lot of <a href="https://yarnpkg.com" target="_blank" rel="noopener noreferrer">yarn</a> over <a href="https://npmjs.com" target="_blank" rel="noopener noreferrer">npm</a>, just feels snappier.

### Conclusion

I'm rather happy how the site turned out due to the well-thought-out design of Elmstatic that leaves plenty of room for customization and having Elm as an ally when creating layouts and styles is always a breeze.

It's been a great experience, thanks <a href="https://korban.net" target="_blank" rel="noopener noreferrer">Alex Korban</a> for <a href="https://github.com/alexkorban/elmstatic" target="_blank" rel="noopener noreferrer">Elmstatic</a>!
