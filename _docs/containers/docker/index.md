---
title: Docker
tags: 
 - containers
 - docker
description: Getting started with Docker Containers
links:
 - external_url: https://docs.docker.com/get-docker/
   title: Docker Installation
 - external_url: https://docs.docker.com/get-started/
   title: Docker Quick Start
---

# Docker

Docker is one of the most well known container technologies, developed by [Docker Inc.](https://www.docker.com/)
that was founded in 2008, but really took off as early as 2014. To understand Docker, we should probably start with the basics of containers,
and a little history around them.

## Containers

A container is generally an encapsulated environment that is created from one or more binaries (images) to provide some form of isolation. Read more about [containers here]({{ site.baseurl }}/docs/containers/docker/container-images).

## What is OCI?

How have so many different communities come to some consensus around how containers work, or places to store them called container registries?
We can thank the Open Container Initiative, or OCI, for that.
The "Open Container Initiative" and encompasses a group of people and a set of projects for describing container formats and interactions. 
For more information about OCI, see [About the Open Container Initiative](https://opencontainers.org), or [dive into the specifications](https://specs.opencontainers.org).

### OCI Project Types

The runtime-spec, image-spec, and distribution-spec, provide details for how a container is built, or interacted with. 
To give you a good understanding of OCI projects, you can read more about the goals of [OCI projects]({{ site.baseurl }}/docs/containers/docker/oci-projects). 
When you understand the goals of each one, this puts you in a position to understand how they are used, why they are used, and how you can contribute.

## Content Addressability

How does somebody find your house to mail a letter? They have an address, or a unique
identifier for the location of your house. Containers are no different - we can calculate
hashes of their content called _digests_ and then use these addresses as unique identifiers 
to reference the containers. Read more about [Content Addressability]({{ site.baseurl }}/docs/containers/docker/digests) here.

## Distributing Container Images

Let's say I have a container on my host. How do I get it to you? How can you be sure
that your containers are safe if your laptop crashes? The task of distributing containers
offers an entire new space of challenges. Read about [distributing container images here]({{ site.baseurl }}/docs/containers/docker/distribution)
