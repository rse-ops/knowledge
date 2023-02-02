# Environment Modules

Environment modules make it easy to manage software, and are typically used on high performance computing systems.
Read more to learn about how they work!

## Background

You can think of environment modules like a little collection of software and versions that can easily be loaded by a user, and typically
are maintainer by a cluster administrator. Using this approach on high performance computing clusters [[1]] is common
because it allows different versions of software to co-exist, and for the user to load things as needed.
Although writing the recipes can be complex, it's a fairly common practice for cluster administrators to provide
a set of natively installed recipes for their users, or for researchers to develop and deploy their own software via containers. Even well-known package managers like Spack [[2]] and EasyBuild [[3]] provide functionality to interact with software as modules. 


## Module Software

The following environment module software might be of interest:

 - [lmod](https://lmod.readthedocs.io/en/latest/015_writing_modules.html): Is one of the "bread and butter" environment module software, commonly installed on clusters.
 - [environment_modules](http://modules.sourceforge.net/): Is also a bread and butter solution, which has had new life in the last few years.
 - [Singularity Hpc](https://singularity-hpc.readthedocs.io/): Allows you to install containers as modules.


## Usage

The most common module software is popular enough that we can provide you with a basic tutorial.
When you are on your cluster, you usually first want to find something. You can use `module spider` for that:

```bash
$ module spider python
```

When you find the version of Python that you want to use, just load it!

```bash
$ module load python@3.7.4
```

And then the Python executable will be on your path. Depending on the software that you use, you
can then explore these additional commands to get more information about the module in question:

```bash
$ module show <module>
$ module info <module>
```


[environment_modules]: http://modules.sourceforge.net/docs/Modules-Paper.pdf
[community_collections]: https://community-collections.github.io/
[1]: https://www.rc.virginia.edu/userinfo/rivanna/software/containers/
[3]: https://wiki.fysik.dtu.dk/niflheim/EasyBuild_modules
[lmod]: https://lmod.readthedocs.io/en/latest/015_writing_modules.html
[2]: https://spack.readthedocs.io/en/latest/module_file_support.html
[cmod]: http://www.lysator.liu.se/cmod/
[singularity_hpc]: https://singularity-hpc.readthedocs.io/
