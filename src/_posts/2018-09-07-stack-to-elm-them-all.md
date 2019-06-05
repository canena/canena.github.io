---
title: Stack to Elm Them All
tags: elm tech
---

Ever wondered - or forgot - how to build the [Elm Compiler](https://github.com/elm/compiler) with tracing using [Haskell Stack](https://docs.haskellstack.org)? Here's how you do it

Init with stack

```bash
stack init --resolver lts-11.20
```

Add options in `elm.cabal`:

    Executable elm
        if flag(dev)
            ghc-options: -O0 -Wall -Werror -rtsopts -eventlog

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

## Might also be useful

```bash
lsb_release -a
uname -a
stack --version
```
