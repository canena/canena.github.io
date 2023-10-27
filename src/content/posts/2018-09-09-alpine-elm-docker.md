---
title: Alpine Elm Docker
subtitle: A Dockerfile for creating a minimal alpine docker image for your CI builds
description: A Dockerfile for creating a minimal alpine docker image for your CI builds
publishedAt: 2018-09-09
githubIssue: 19
readingTime: 1min
tags: [cicd, docker, elm, tech, web]
headerStyle: light
---

A <a href="https://docs.docker.com/engine/reference/builder/" target="_blank" rel="noopener noreferrer">Dockerfile</a> for creating a minimal alpine docker image for your <a href="https://martinfowler.com/articles/continuousIntegration.html" target="_blank" rel="noopener noreferrer"><abbr title="Continuous Integration">CI</abbr> builds</a> I salvaged from a <a href="https://elmlang.slack.com/" target="_blank" rel="noopener noreferrer">Slack</a> conversation.

```docker
FROM alpine
RUN apk add binutils \
  && wget -qO - "https://github.com/elm/compiler/releases/download/0.19.0/binaries-for-linux.tar.gz" \
  | tar -zxC /usr/local/bin/ && strip /usr/local/bin/elm && apk del binutils
```

This will result in a docker image that is roughly the size of the <a href="https://elm-lang.org" target="_blank" rel="noopener noreferrer">Elm</a> binaries we're packaging - about 40MB(!) as of the time of writing this.

```elm
{ mind | state = Blown }
```
