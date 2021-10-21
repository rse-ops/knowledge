---
title: Container Distribution
tags: 
 - containers
 - docker
description: Container registries allow us to distribute containers
---

# Distributing Container Images

[Distribution](https://www.merriam-webster.com/dictionary/distribution):

> _the action of sharing something out among a number of recipients._

Distribution, or sharing of container images, is just as important as building them in the first place. 
If you can't easily distribute your container, you lose a lot of the benefits to having containers, period.

Generally, you can think of distribution eco-system as having different use cases. 
I should be able to easily:

 - *share*: the container images that I create, across hosts, institutions, and time zones.
 - *search*: I should be able to find the container that I'm looking for.
 - *obtain*: If I find a container, and given I have permission to do so, I should be able to get it
 - *verify*: that the container I requested is the one that I wanted, and not some malicious entity.
 
Generally, a distribution comes down to a strategy that includes software, servers, and databases to fulfill these goals.
The [distribution specification](https://github.com/opencontainers/distribution-spec/blob/master/spec.md) helps to outline a lot of the interactions to make this possible.

