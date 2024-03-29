# SLURM

SLURM refers to the "Simple Linux Utility for Resource Management" and is a job manager for high performance computing.
When you are working at at academic institution or national lab or sometimes industry, it's common to have clusters (machines that are linked
together) that you can log into and then submit jobs to a scheduler. SLURM is one of these schedulers - you can submit jobs to SLURM from the set of machines that you work from, the `login nodes`, The submission is sent to a master node queue, and the jobs are sent out to the workers, which are other machines on the cluster.

```bash
                +------------+
                |            |
                |  Worker 2  |
+------------+  |  (GPU)     |
|            |  |            |
|  Worker 1  |  +------------+
|            |
+----^-------+   +----------------------+
     |           | Priority Queue       |
     +-----------+ 1. Job A UserMark    |
     2. Run Job  | 2. Job B UserFred    |
                 |                      |
                 +-^--------------------+
                   |
                   |
                   |
                   |  1. Submit Job (sbatch...)
                   |
     +-------------+-+  +---------------+
     |               |  |               |
     |               |  |               |
     |  Login Node 1 |  |  Login Node 2 |
     |               |  |               |
     |               |  |               |
     +---------------+  +---------------+
```

## Jobs

There are two kinds of jobs:

 - **interactive jobs**: means jumping yourself onto a worker node, and issuing commands interactively. If you want to test or otherwise run commands manually, you should ask for an interactive node. You should **not be running things on the login node** because it hinders performance for other users. Your processes will be killed if they take up too much memory.
 - **batch jobs** means handing a submission script to the SLURM batch scheduler to give instruction for running one or more jobs. We provide detailed instructions in the link above, and quick command references below.


## Command Quick Reference

**Jobs**

```bash
# Submit a job
sbatch .jobs/jobFile.job

# See the entire job queue (note that you are allowed 5000 in queue at once)
squeue

# See only jobs for a given user
squeue -u username

# Crap, kill a job with ID $PID
scancel $PID

# Kill ALL jobs for a user
scancel -u username

# Kill all pending jobs
scancel -u username --state=pending

# Stop and restart jobs interactively with SLURM's scancel.
scancel -s SIGSTOP job id

# Run interactive node with 16 cores (12 plus all memory on 1 node) for 4 hours:
srun -n 12 -N 1 --mem=64000 --time 4:0:0 --pty bash

# Claim interactive node for exclusive use, 8 hours
srun --exclusive --time 8:0:0 --pty bash

# Same as above, but with X11 forwarding
srun --exclusive --time 8:0:0 --x11 --pty bash

# Same as above, but with priority over your other jobs
srun --nice=9999 --exclusive --time 8:0:0 --x11 --pty -p dev -t 12:00 bash

# Count number of running / in queue jobs
squeue -u username | wc -l

# Get estimated start times for your jobs (when Sherlock is busy)
squeue --start -u username

# Request big memory node for 4 hours
srun -N 1 -p bigmem -t 4:0:0 --pty bash

# Run a job with 1 node, 4 CPU cores, and 2 GPU
srun -N 1 -n 4 --gres=gpy:2 -p gpu --qos=gpu
```

**Big Memory Nodes**

```bash
# Submit a job
sbatch -p bigmem --qos bigmem /path/to/job/gica.job

# Interactive job
srun -p bigmem --qos bigmem --time 1:00 --exclusive --x11 --pty bash
```

**Software Modules**

```bash
# What modules are available?
module avail

# Load a module
module load MODULE_NAME

# Some modules need to be loaded under a group first
module load system
module load singularity/2.4.5
```

**Disk Usage**

```bash
# Get usage for file systems
df -k

# Get usage for your home directory (useful if you are close to quota)
du
```

### Interactive Jobs

```bash
$ srun -t 2-00 --pty bash
```

With this command you get an interactive node available for 2 days (-t 2-00) in an interactive mode (--pty) 
bash shell. If you want to be the exclusive user of the node ("I want all the memory!" (diabolical laugh) add `--exclusive`.

You can also designate how much memory you would like to use:

```bash
$ srun --mem=32G --pty bash
```

### Job Status

- `sinfo`: show the overall status of each partition, like how many nodes are idle per partition.
- `squeue`: display all jobs currently running, per given condition.
- `sstat -j jobID`: show the status of a currently running job.
- `sacct -j jobID`: show the final status of a finished job.
- `scancel`: cancel job(s). You can specify job state/conditions to cancel (e.g., `--state PENDING`).

Show jobs from userID
```bash
squeue -u userID
```

### Batch Jobs

Let's say that we have a script that we want to run, `analysis.sh`. We can hand the
script off to be run on a node as follows:

```bash
$ sbatch  -o out.%j -e err.%j analysis.sh arg1 value1
```

(Standard) Output of this script will be saved as `out.%j` (`%j` will be replaced with the jobID) 
in the current directory, and `$STDERR` will be in `err.%j`.
The `.out` and `.job` files can be written where you will easily find them, and this is a good
strategy for debugging. I usually like to keep an `.out`, and `.job` folder in my script directory
so they are organized and easy to find. The string `%j` will produce a unique identifier for the job, and the
`arg1` and `value1` are example input args and values for your script.

An example job script is shown below.

```bash
#!/bin/bash
#SBATCH --job-name=TRM000_phonetic.job
#SBATCH --output=TRM000_phonetic.job.out
#SBATCH --error=TRM000_phonetic.job.err
#SBATCH --time=2-00:00
#SBATCH --mem=12000
#SBATCH --qos=normal
#SBATCH --mail-type=ALL
#SBATCH --mail-user=$USER@stanford.edu
Rscript $HOME/shapleyProbeSets.R $SCRATCH/DATA/input.tab 0.05 1000 myJob.R
```

The above job will submit a job named `TRM000_phonetic.job`, and write to corresponding error and output files. It will
have a maximum run time of 2 days, ask for 12GB memory, and be submit to the normal queue.

Here is another example batch file with directives that reserve one node in the default queue, with 16 cores and exclusive use of the node:

```bash
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 16
#SBATCH --time=1:00:00
#SBATCH --exclusive
<<shell commands that set up and run the job>>
```

## Tools

<span id='question-what-tools-exist-to-help-with-using-slurm'></span> The following tools are useful for interacting or otherwise using SLURM.

 - [JobMaker](https://researchapps.github.io/job-maker/) is a small interface that a center can deploy, customized to their slurm.conf. Since the slurm.conf is readable by all nodes, a user can generate the data for the tool equivalently. 
 - [JobStats](https://github.com/nauhpc/jobstats) makes it easy for users to see status of jobs, and what resources were actually utilized from those requested.
  - [doppler](https://github.com/nauhpc/doppler) is a complementary web application to jobstats that shows users, and account job efficiency/resource wastage.
 - [smanage](https://vsoch.github.io/lessons/smanage/) is a tool developed out of Harvard to help with management of job arrays.

