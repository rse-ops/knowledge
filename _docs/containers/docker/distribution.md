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

## Registry Options

So you have a container, where should you put it? Here are some recommendations.

 - [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-docker-registry): supports both Docker and "OCI registry as storage" artifacts, which includes Singularity images. 
 - [Docker Hub](https://hub.docker.com/): of course was the "first" container registry, however be careful in using it because you would be required to put an account token (with access to all your repos) in a CI service. They have also toyed with purging old images and have implemented [rate limiting](https://www.docker.com/increase-rate-limits), so while it's an option, it's not highly recommended.
 - [Quay.io](https://quay.io/): is provided by RedHat, and is a nice registry because there are currently no limits on containers or pulling, and you can generate bots with repository specific tokens and permissions. How do you pronounce it? You probably want to say "KWAY" but I believe it's correctly pronounced "KEY."
  
If you are deploying from GitHub, there is a nice template [here](https://github.com/autamus/container-builder-template) to demonstrate pushing to each of an OCI registry (Docker Hub, Quay.io) or GitHub packages. If you are wanting to deploy Singularity (SIF) images in the same manner, use [this template](https://github.com/singularityhub/github-ci).
