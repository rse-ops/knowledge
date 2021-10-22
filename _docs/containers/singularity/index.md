---
title: Singularity
tags: 
 - containers
 - singularity
description: Getting started with Singularity Containers
links:
 - external_url: https://sylabs.io/guides/latest/user-guide/quick_start.html
   title: Sylabs Quick Start
tutorials:
  - name: Academic
    links:
     - name: Cyverse Container Camp
       url: https://learning.cyverse.org/projects/container_camp_workshop_2019/en/latest/singularity/singularityintro.html
     - name: Using Singularity at the Ohio Supercomputing Center
       url: https://www.osc.edu/resources/getting_started/howto/howto_use_docker_and_singularity_containers_at_osc
     - name: Singularity at Argonne
       url: https://www.alcf.anl.gov/support-center/theta/singularity-theta
     - name: Washington State University Guide
       url: https://hpc.wsu.edu/programmers-guide/singularity/
     - name: OSIP 2019 Containerize Workshop
       url: https://github.com/rainsworth/osip2019-containerisation-workshop/
     - name: UL HPC Tutorials
       url: https://ulhpc-tutorials.readthedocs.io/en/latest/containers/singularity/
     - name: Vanderbilt University
       url: https://www.vanderbilt.edu/accre/documentation/singularity/
     - name: Singularity on Sherlock at Stanford
       url: https://www.sherlock.stanford.edu/docs/software/using/singularity/
     - name: Singularity at Yale
       url: https://docs.ycrc.yale.edu/clusters-at-yale/guides/singularity/
  - name: Industry
    links:
     - name: Using GPU with Nextflow
       url: https://medium.com/@lucacozzuto/using-gpu-within-nextflow-19cd185d5e69?
     - name: Singularity Containers with Google Cloud Build
       url: https://cloud.google.com/community/tutorials/singularity-containers-with-cloud-build
     - name: Singularity with Tensorflow
       url: https://medium.com/singularityapp/singularity-containers-tensorflow-and-the-nvidia-jetson-nano-an-experiment-5be66ebbd4ac?   
     - name: Containers with CUDA Support
       url: https://medium.com/@lpryszcz/containers-with-cuda-support-5467f393649f?
  - name: Presentation
    links:
     - name: Singularity with Nomad
       url: https://www.hashicorp.com/resources/singularity-nomad-task-driver-plugins
     - name: Singularity for Public Health Bioinformatics
       url: https://www.youtube.com/watch?v=juPLTMnFrcI&feature=youtu.be
     - name: Singularity Containers for Science PEARC 2017 Presentation 
       url: https://www.slideshare.net/VanessaSochat/pearc17-reproducibility-and-containers-the-perfect-sandwich
       name: Singularity for Scientific Compute
       url: https://www.slideshare.net/VanessaSochat/singularity-containers-for-scientific-compute
---

# Singularity Containers

Singularity is a container technology that was originally developed for use on high performance computing.
By default, it typically has less isolation than Docker, and more seamless interaction with typical
HPC technologies.

## Install

If you are on a shared resource, either Singularity will already be available to you, or you might need
to load it as a module.

```bash
$ module load singularity
```

You can consult with your cluster admins to ask for the exact command, and can add it to your `~/.bashrc`
so it happens automatically, if desired. If you need to [install Singularity](https://sylabs.io/guides/latest/user-guide/quick_start.html#quick-installation-steps) on your host, it will require Go and several host dependencies.

## Environment

If you are on an HPC system, a very import variable to export is the `SINGULARITY_CACHEDIR`. This is where Singularity stores
pulled images, built images, and image layers (e.g., when you pull a Docker image it first pulls
the `.tar.gz` layers before assembling into a container binary). What happens if you **don't** export
this variable? The cache defaults to your HOME, your HOME quickly gets filled up (containers
are large files!) and then you are locked out.

>> don't do that.

```bash
export SINGULARITY_CACHEDIR=$SCRATCH/.singularity
mkdir -p $SINGULARITY_CACHEDIR
```

Also note for the above that we are creating the directory, which is something that needs to be
done once (and then never again!).

# Commands

Let's start with some basics. When we interact with containers, we are typically going to be
interacting with a SIF binary, which is a derivation of a squashfs image. This means that it has
good compression, and is read only, and is a file that you can move around your desktop or otherwise
interact with like any other file. When we interact with containers that we don't have on our filesystem
yet, we use what are called unique resource identifiers (URI). Examples include:

 - **docker://**: references a container on Docker Hub
 - **shub://**: a container on Singularity Hub
 - **library://**: a container from the Sylabs library
 - **https://** a container from a web address


## Pull

You **could** just run or execute a command to a container reference, but I recommend
that you pull the container first.

```bash
$ singularity pull shub://vsoch/hello-world
$ singularity run hello-world_latest.sif 
RaawwWWWWWRRRR!! Avocado!
```

It's common that you might want to name a container something different, and you
can do that as follows:

```bash
$ singularity pull --name meatballs.sif shub://vsoch/hello-world
```

## Exec

The "exec" command will execute a command to a container.

```bash
$ singularity pull docker://vanessa/salad
$ singularity exec salad_latest.sif /code/salad spoon
 singularity exec salad_latest.sif /code/salad fork
```
```
# Other options for what you can do (without sudo)
$ singularity build container.sif docker://ubuntu
$ singularity exec container.sif echo "Custom commands"
```

## Run

The run command will run the container's runscript, which is the executable (or `ENTRYPOINT`/`CMD` 
in Docker speak) that the creator intended to be used.

```bash
$ singularity pull docker://vanessa/pokemon
$ singularity run pokemon_latest.sif run catch
```

## Options

And here is a quick listing of other useful commands! This is by no means
an exaustive list, but I've found it helpful to debug and understand a container.
First, inspect things!

```bash
$ singularity inspect -l pokemon.sif  # labels
$ singularity inspect -e pokemon.sif  # environment
$ singularity inspect -r pokemon.sif  # runscript
$ singularity inspect -d pokemon.sif  # Singularity recipe definition
```

Using `--pwd` below might be necessary if the working directory is important. 
Singularity doesn't respect Docker's `WORKDIR` Dockerfile
command, as we usually use the present working directory.

```bash
# Set the present working directory with --pwd when you run the container
$ singularity run --pwd /code container.sif
```

Singularity is great because most of the time, you don't need to think about
binds. The paths that you use most often (e.g., your home and scratch and tmp)
are "inside" the container. I hesitate to use that word because the
boundry really is seamless. Thus, if your host supports 
<a href="https://en.wikipedia.org/wiki/OverlayFS" target="_blank">overlayfs</a> and the configuration allows it, your container
will by default see all the bind mounts on the host. You can specify a custom mount 
(again if the administrative configuration allows it) with `-B` or `--bind`.

```bash
# scratch, home, tmp, are already mounted :) But use --bind/-B to do custom
$ singularity run --bind $HOME/pancakes:/opt/pancakes container.sif
```

I many times have conflicts with my PYTHONPATH and need to unset it,
or even just clean the environment entirely.

```bash
PYTHONPATH= singularity run docker://continuumio/miniconda3 python
singularity run --cleanenv docker://continuumio/miniconda3 python
```

What does writing a script look like? You are going to treat singularity as
you would any other executable! It's good practice to load it in your 
<a href="https://researchapps.github.io/job-maker/" target="_blank">SBATCH</a>
scripts too.

```bash
$ singularity run --cleanenv docker://continuumio/miniconda3 python $SCRATCH/analysis/script.py
```

## Build

If you build your own container, you have a few options!

 - Created an [automated build for Docker Hub](https://docs.docker.com/docker-hub/builds/) then pull the container via the `docker://` uri.
 - add a `Singularity` recipe file to a Github repository and build it automatically on [Singularity Hub](https://www.singularity-hub.org).
 - [Build your container](https://www.sylabs.io/guides/latest/user-guide/quick_start.html#build-images-from-scratch) locally.


If you build locally and need to transfer to a cluster, you can use scp:

```bash
$ scp container.sif <username>@login.<cluster>:/scratch/users/<username>/container.sif
```

## Associated Tools

A landscape of [Associated tools](https://singularityhub.github.io/) is still maintained by @vsoch and other Singularity community members, including (but not limited to):

 - [Singularity HPC](https://singularity-hpc.readthedocs.io/en/latest/): allows installing Singularity (and other container technologies like Podman) as modules.
 - [Singularity Compose](https://singularityhub.github.io/singularity-compose/): orchestration for Singularity containers
 - [Singularity Python](https://singularityhub.github.io/singularity-cli/): Python client for Singularity
 - [Singularity Catalog](https://singularityhub.github.io/singularity-catalog/): is a nice place to browse recipes.
 - [docker2singularity](https://github.com/singularityhub/docker2singularity): an early tool to convert from Docker2Singularity on a host.
 

## Registry Options

### GitHub Packages

So you have a Singularity container, where should you put it? Since a Singularity image is considered an [ORAS artifact](https://oras.land/) you can push it natively to GitHub packages, and since this can be associated with your code and CI and there are no limits, this is the recommended approach.
You can follow [this template](https://github.com/singularityhub/github-ci) to have automated builds and deploys for your containers.

### A Docker Registry

To kill two birds with one stone, you can actually build a Docker image, push to a docker registry, and then pull down to Singularity. As an example:

```bash
$ singularity pull docker://vanessa/salad
```

This is another recommended approach as you can choose a Docker registry without rate or storage limits.  See [Docker Registry options]({{ site.baseurl }}/docs/containers/docker/distribution#registry-options) for this use case.

### Sylabs Cloud

The company Sylabs provides a [cloud](https://cloud.sylabs.io/) that you can create a free account to store your images. If you have a few small images this can work, but note that the space is limited and fills up quickly. You likely will need to pay to use it in a substantial way.

### Singularity Registry Server

[Singularity Register Server](https://singularityhub.github.io/sregistry/) (sregistry) is the open source version of Singularity Hub. It serves the Sylabs developed library API, so the Singularity software can interact with it natively. It is not an OCI registry proper, so it's not a highly recommended tool, but if you center needs to deploy a registry for users to pull with Singularity, this will fit the bill. It can be deployed with docker-compose, ansible, or (upon request) could easily work with Kubernetes.

### Singularity Hub

While [Singularity Hub](https://singularityhub.github.io/singularityhub-docs/) is no longer online, it was the first Singularity container registry,
and maintained by [@vsoch](https://github.com/vsoch) single-handedly for the 5 years she worked at Stanford. She could not take it with her, so the
registry was [converted to an archive](https://singularityhub.github.io/singularityhub-docs/2021/going-read-only/) that now is hosted at Dartmouth via the [Datalad project](https://singularity-hub.org/). As a promise of reproducibility, all of the containers that were available via the `shub://` URI are still pullable, and without any rate-limits as Singularity Hub was [forced to implement](https://singularityhub.github.io/singularityhub-docs/2019/release-announcement/) in 2019.



## Project History

Singularity is a container technology that was first developed at Lawrence Berkeley National Lab
by Greg Kurtzer in 2015, and quickly grew into a thriving open source community by 2016 and 2017.
Around 2017 Greg joined the company RStor, which eventually gave him the ability to start a small
company called Sylabs to support Singularity. In May 2020 it was announced the Greg would step
down as CEO of Sylabs, and he eventually founded another community, [HPCng](https://hpcng.org/),
and the Singularity project moved with him there. Around the same period of time (2020) Greg also 
started a company called Ctrl Q, and led a movement to convert Centos to Rocky Linux. About a year 
later (2021) Sylabs decided to fork it back, likely out of concern for its maintenance, and eventually
this fork was called "Singularity Community Edition (CE)" although it installs still to `singularity`. 
This led to drama between the two projects and a fracture in the community, with many users of the software losing confidence in the longevity of the project. However, Singularity still remains a container technology installed at many HPC centers, and although many might be
shifting to using other technologies, it's useful to know how to use it. There is still hope that these two
Singularity projects can put aside their differences and learn to work together on a shared code base.
We mention this because you will encounter _two_ Singularity projects in the wild, which can be confusing,
and there really is no guidance or logic to decide on which one to use:

 - [SingularityCE at Sylabs](https://github.com/sylabs/singularity)
 - [Singularity at HPCng](https://github.com/hpcng/singularity)

E.g., you might consider that since Sylabs was created for and continues to exist for the project,
this is the better of the two to use. You might also have preference based on personal preference.
It's an awkward situation for a user or contributor at best.

Have a question? Or want to make these notes better? Please <a href="https://github.com/rse-ops/knowledge/issues">open an issue</a>.
