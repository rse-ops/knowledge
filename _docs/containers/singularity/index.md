---
title: Singularity
tags: 
 - containers
 - singularity
description: Getting started with Singularity Containers
links:
 - external_url: https://sylabs.io/guides/latest/user-guide/quick_start.html
   title: Sylabs Quick Start
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

## Tutorials

### Academic

 - [Cyverse Container Camp](https://learning.cyverse.org/projects/container_camp_workshop_2019/en/latest/singularity/singularityintro.html) updated in 2019.
 - [Using Singularity on an HPC Cluster](https://github.com/bdusell/singularity-tutorial) <span id='question-how-do-i-use-singularity-on-an-hpc-cluster'> This tutorial is for using Singularity on the CRC computing cluster at the University of Notre Dame, which uses the SGE job scheduling system. It serves as a general introduction to containers and may be applicable to other computing clusters as well. The tutorial walks you through the process of building a container and running a GPU-accelerated PyTorch program on a GPU node. It also has tips for managing Python packages efficiently.
 - [Harvard Using Singularity on Odyssey](https://www.rc.fas.harvard.edu/resources/documentation/software/singularity-on-odyssey/): a tutorial for using SBATCH or an interactive session with slurm to build containers.
 - [Using Singularity](https://www.osc.edu/resources/getting_started/howto/howto_use_docker_and_singularity_containers_at_osc):  at the Ohio Supercomputing Center
 - [Singularity at Argonne](https://www.alcf.anl.gov/support-center/theta/singularity-theta) published February 2019
 - [Washington State University](https://hpc.wsu.edu/programmers-guide/singularity/) Singularity 3.0.x guide.
 - [OSIP 2019](https://github.com/rainsworth/osip2019-containerisation-workshop/) containerization workshop.
 - [UL HPC Tutorials](https://ulhpc-tutorials.readthedocs.io/en/latest/containers/singularity/) published in 2018.
 - [Vanderbilt University](https://www.vanderbilt.edu/accre/documentation/singularity/) running containers on ACCRE.
 - [Singularity on Sherlock](https://www.sherlock.stanford.edu/docs/software/using/singularity/) at Stanford University.
 - [Singularity at Case Western](https://sites.google.com/a/case.edu/hpcc/installed-software/container-platforms/singularity)
 - [Singularity at Yale](https://docs.ycrc.yale.edu/clusters-at-yale/guides/singularity/)

### Singularity Verison 2.x

 - [Singularity Tutorial](https://singularity-tutorial.github.io/) originally derived from an NIH tutorial
 - [Singularity Quick Start](https://singularity-docs.readthedocs.io/en/latest/) on readthedocs
 - [Singularity 2.x Tutorials](https://singularity.lbl.gov/tutorials) although 2.x is now deprecated, these tutorials might still be useful to interested users.

### Industry

 - [Using GPU with Nextflow](https://medium.com/@lucacozzuto/using-gpu-within-nextflow-19cd185d5e69?) and see the [singularity page](https://www.nextflow.io/docs/latest/singularity.html) on the Nextflow documentation.
 - [Singularity Containers](https://cloud.google.com/community/tutorials/singularity-containers-with-cloud-build) with Google Cloud Build.
 - [Singularity with Tensorflow](https://medium.com/singularityapp/singularity-containers-tensorflow-and-the-nvidia-jetson-nano-an-experiment-5be66ebbd4ac?): using Singularity containers with Tensorflow and the Nvidia jetson Nano, an experiment.
 - [Containers with CUDA Support](https://medium.com/@lpryszcz/containers-with-cuda-support-5467f393649f?)

## Presentations

 - [Singularity with Nomad](https://www.hashicorp.com/resources/singularity-nomad-task-driver-plugins) By Eduardo from Sylabs.
 - [Singularity for Public Health Bioinformatics](https://www.youtube.com/watch?v=juPLTMnFrcI&feature=youtu.be) on youtube.
 - [Singularity Containers for Science](https://www.slideshare.net/VanessaSochat/pearc17-reproducibility-and-containers-the-perfect-sandwich) PEARC 2017 presentation by [@vsoch](https://github.com/vsoch) of Stanford Research Computing. 
 - [Singularity for Scientific Compute](https://www.slideshare.net/VanessaSochat/singularity-containers-for-scientific-compute) a presentation on Singularity and Singularity Hub to the SCG users group, circa 2017 or 2018.

## References

 - [Sylabs User Guide](https://sylabs.io/guides/latest/user-guide/)
 - [Singularity on GitHub](https://github.com/sylabs/singularity)

Have a question? Or want to make these notes better? Please <a href="https://github.com/rse-ops/knowledge/issues">open an issue</a>.
