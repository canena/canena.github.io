---
title: Stack To Elm Them All
subtitle: Ever wondered - or forgot - how to build the Elm Compiler?
description: Ever wondered - or forgot - how to build the Elm Compiler with tracing using Haskell Stack?
publishedAt: 2018-09-07
githubIssue: 17
readingTime: 1min
tags: [elm, tech]
headerStyle: light
---

Ever wondered - or forgot - how to build the <a href="https://github.com/elm/compiler" target="_blank" rel="noopener noreferrer">Elm Compiler</a> with tracing using <a href="https://docs.haskellstack.org" target="_blank" rel="noopener noreferrer">Haskell Stack</a>? Here's how you do it

Init with stack

```bash
stack init --resolver lts-11.20
```

Add options in `elm.cabal`:

```bash
Executable elm
  if flag(dev)
    ghc-options: -O0 -Wall -Werror -rtsopts -eventlog
```

Build with stack:

```bash
stack build --flag elm:dev --profile
```

Run with RTS options:

```bash
elm make ./src/Main.elm \
  --output=./dist/app.js +RTS -xc -lu -RTC \
  2>eventlog_readable.log
```

This is essentially just a reminder for me on how to do it that I wanted to preserve from death-by-slack-history.

### Might also be useful

```bash
lsb_release -a
uname -a
stack --version
```
