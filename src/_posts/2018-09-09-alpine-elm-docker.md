---
title: Alpine Elm Docker
tags: elm cicd tech docker
---

A [Dockerfile](https://docs.docker.com/engine/reference/builder/) for creating a minimal alpine docker image for your [<abbr title="Continuous Integration">CI</abbr> builds](https://martinfowler.com/articles/continuousIntegration.html) I salvaged from a [Slack](https://elmlang.slack.com/) conversation.

    FROM alpine
    RUN apk add binutils \
      && wget -qO - "https://github.com/elm/compiler/releases/download/0.19.0/binaries-for-linux.tar.gz" \
      | tar -zxC /usr/local/bin/ && strip /usr/local/bin/elm && apk del binutils

This will result in a docker image that is roughly the size of the [Elm](https://elm-lang.org) binaries we're packaging - about 40MB(!) as of the time of writing this.

    { mind | state = Blown }


