# Anaconda

Anaconda is a distribution (or package manager) for data science. It's typically associated with Python, but in actuality it installs a more broad range of languages than that, such as R and system packages. 

## Install

You'll likely want to follow the [install instructions](https://docs.anaconda.com/anaconda/install/index.html) for your distribution, or use
[miniconda](https://docs.conda.io/en/latest/miniconda.html) for a smaller install. A headless "quick install" for Linux might look like this:

```bash
# Anaconda for Python
cd /tmp
wget https://repo.anaconda.com/archive/Anaconda3-2021.05-Linux-x86_64.sh

# Install to "anaconda3" in HOME, and add to your bash profile
bash Anaconda3-2021.05-Linux-x86_64.sh -p $HOME/anaconda3 -b
echo "PATH=\$HOME/anaconda3/bin:\$PATH" >> $HOME/.profile
echo export PATH >> $HOME/.profile
```

And you can browse the [archive](https://repo.anaconda.com/archive/) for more recent or earlier versions.

Once you have it installed, you can source your bash profile (or open up a new terminal) and it should be on your PATH.

```bash
$ which conda
$ which python
# /home/vanessa/anaconda3/bin/python
```

If you need Anaconda just for Python, you're good to go! If you want to create environments for different projects, continue reading.

## Create a Conda Environment

An Anaconda (or miniconda) environment is referred to as a conda environment. Yes, it has some snakey references.
Here is how to create an environment:

```bash
$ conda create --name myenv
  
...
#
# To activate this environment, use
#
#     $ conda activate myenv
#
# To deactivate an active environment, use
#
#     $ conda deactivate
```

You can then follow the instruction to activate or deactivate the environment.

```bash
$ conda activate myenv
```
What happens when you activate? Well you'll notice that your command prompt changes to indicate the name
of the active environment:

```bash
(myenv) me@computer$
```

If you now do `conda install`, the software will be installed to that environment. If you have already installed software
in that environment, it will be on your PATH (given an executable in the environment's bin) and of course the Python libraries
are available on your `PYTHONPATH`. As a bonus, you also get a bunch of freebie tools that come packaged with Anaconda (Jupyter, curl, openssl, etc.)

```bash
$ which curl
/home/vanessa/anaconda3/bin/curl
```
When you are done in your environment, just deactivate it:

```bash
$ conda deactivate
```

This environment is going to stay with your conda install until you delete it. If you
can't remember the names of your environments, just list them:

```bash
$ conda env list
```
```
# conda environments:
#
base                  *  /home/vanessa/anaconda3
myenv                    /home/vanessa/anaconda3/envs/myenv
```

To delete the environment (and make sure you have deactivated first):

```bash
$ conda env remove --name myenv
```

## Install Software

Installing software is fairly straight forward. You can find packages from [Anaconda](https://anaconda.org/anaconda/repo) or from [conda-forge](https://conda-forge.org/feedstock-outputs/). Conda forge is a community package repository, and packages build from [conda-feedstocks](https://github.com/conda-forge/conda-feedstock). If you'd like to contribute a package, you can [read the instructions here](https://conda-forge.org/#contribute). When you install from conda forge, you usually need to add the channel to search:

```bash
$ conda config --add channels conda-forge 
```

It's a super cool package manager because the entire infrastructure is maintained over GitHub, and contributing is really easy.
Let's walk through installing something. Let's say we want to search for a package first.

```bash
$ conda search requests
Loading channels: done
# Name                       Version           Build  Channel             
requests                      2.18.4  py27hc5b0589_1  pkgs/main           
...
requests                      2.25.1    pyhd3eb1b0_0  pkgs/main           
requests                      2.26.0    pyhd3eb1b0_0  pkgs/main   
```

You'll search across your channels and see all the versions available. Just omit the version to get latest:

```bash
$ conda install requests
```

or choose a specific version!

```bash
$ conda install requests@2.26.0
```

And remember if you want to install from a different channel, you need to add it first.
If you don't want to add it, you can search and specify it directly (and this appears to be faster):

```bash
$ conda search --channel conda-forge deid
```

Sometimes conda forge will have a release of common software (e.g., R) before official Anaconda - the two communities collaborate together and conda-forge can be seen like a bit of a testing ground. Finally, remember that when you are interacting with your environment programmatically, such as in a script, you'll need to activate the environment first and then interact with it.

## Mamba

A [Mamba](https://en.wikipedia.org/wiki/Mamba) is another fast-moving, venomous snake, and another
[cross platform package manager](https://github.com/mamba-org/mamba)! Some people choose to use it because it's
faster to resolve environments than Anaconda or Miniconda. You can actually install it with conda, and this is the
recommended approach:

```bash
$ conda install mamba --name mamba --channel conda-forge
```
And then install software as follows:

```bash
$ mamba install xtensor-r --channel conda-forge
```

That's it! If you have any questions or requests for documentation, please don't hesitate to [open an issue](https://github.com/rse-ops/knowledge/issues).
