---
title: Sun Grid Engine
tags: 
 - scheduling
 - resource-management
description: Getting started with Sun Grid Engine (SGE)
links:
  - name: SGE Documentation
    url: http://star.mit.edu/cluster/docs/0.93.3/guides/sge.html
  - name: Command reference between SLURM and SGE (pdf)
    url: https://hpcsupport.utsa.edu/foswiki/pub/Main/SampleSlurmSubmitScripts/SGEtoSLURMconversion.pdf
---

# Sun Grid Engine

Sun Grid Engine (SGE) is an alternative to SLURM, and it provides a similar set of commands, with slight variation.
The [documentation](http://star.mit.edu/cluster/docs/0.93.3/guides/sge.html) is a good place to start, or if you are familiar with
[SLURM]({{ site.baseurl }}/docs/schedulers/slurm), we've translated the [command conversion tables](https://hpcsupport.utsa.edu/foswiki/pub/Main/SampleSlurmSubmitScripts/SGEtoSLURMconversion.pdf) here:

Here are some common commands and flags in SGE and SLURM with their respective equivalents. Is there anything missing? [Let us know](https://github.com/rse-ops/knowledge/issues).

| **User Commands** | **SGE** | **SLURM** |
| --- | --- | --- |
| **Interactive login** | qlogin | `srun --pty bash or srun (-p "partition") --time=4:0:0 --pty bash` For a quick dev node, just run "sdev" |
| **Job submission** | qsub \[script_file\] | sbatch \[script_file\] |
| **Job deletion** | qdel \[job_id\] | scancel \[job_id\] |
| **Job status by job** | qstat -u \\* \[-j job_id\] | squeue \[job_id\] |
| **Job status by user** | qstat \[-u user_name\] | squeue -u \[user_name\] |
| **Job hold** | qhold \[job_id\] | scontrol hold \[job_id\] |
| **Job release** | qrls \[job_id\] | scontrol release \[job_id\] |
| **Queue list** | qconf -sql | squeue |
| **List nodes** | qhost | sinfo -N OR scontrol show nodes |
| **Cluster status** | qhost -q | sinfo |
| [**GUI**](http://slurm.schedmd.com/sview.html) | qmon | sview |
| **Environmental** |     |     |
| **Job ID** | $JOB_ID | $SLURM_JOBID |
| **Submit directory** | $SGE\_O\_WORKDIR | $SLURM\_SUBMIT\_DIR |
| **Submit host** | $SGE\_O\_HOST | $SLURM\_SUBMIT\_HOST |
| **Node list** | $PE_HOSTFILE | $SLURM\_JOB\_NODELIST |
| **Job Array Index** | $SGE\_TASK\_ID | $SLURM\_ARRAY\_TASK_ID |
| **Job Specification** |     |     |
| **Script directive** | #$  | #SBATCH |
| **queue** | -q \[queue\] | -p \[queue\] |
| **count of nodes** | N/A | -N \[min\[-max\]\] |
| **CPU count** | -pe \[PE\] \[count\] | -n \[count\] |
| **Wall clock limit** | -l h_rt=\[seconds\] | -t \[min\] OR -t \[days-hh:mm:ss\] |
| **Standard out file** | -o \[file_name\] | -o \[file_name\] |
| **Standard error file** | -e \[file_name\] | e \[file_name\] |
| **Combine STDOUT & STDERR files** | -j yes | (use -o without -e) |
| **Copy environment** | -V  | --export=\[ALL \| NONE \| variables\] |
| **Event notification** | -m abe | --mail-type=\[events\] |
| **send notification email** | -M \[address\] | --mail-user=\[address\] |
| **Job name** | -N \[name\] | --job-name=\[name\] |
| **Restart job** | -r \[yes\|no\] | --requeue OR --no-requeue (NOTE:  <br>configurable default) |
| **Set working directory** | -wd \[directory\] | --workdir=\[dir_name\] |
| **Resource sharing** | -l exclusive | --exclusive OR--shared |
| **Memory size** | -l mem_free=\[memory\]\[K\|M\|G\] | --mem=\[mem\]\[M\|G\|T\] OR --mem-per-cpu=  <br>\[mem\]\[M\|G\|T\] |
| **Charge to an account** | -A \[account\] | --account=\[account\] |
| **Tasks per node** | (Fixed allocation_rule in PE) | --tasks-per-node=\[count\] |
|     |     | --cpus-per-task=\[count\] |
| **Job dependancy** | -hold\_jid \[job\_id \| job_name\] | --depend=\[state:job_id\] |
| **Job project** | -P \[name\] | --wckey=\[name\] |
| **Job host preference** | -q \[queue\]@\[node\] OR -q  <br>\[queue\]@@\[hostgroup\] | --nodelist=\[nodes\] AND/OR --exclude=  <br>\[nodes\] |
| **Quality of service** |     | --qos=\[name\] |
| **Job arrays** | -t \[array_spec\] | --array=\[array_spec\] (Slurm version 2.6+) |
| **Generic Resources** | -l \[resource\]=\[value\] | --gres=\[resource_spec\] |
| **Lincenses** | -l \[license\]=\[count\] | --licenses=\[license_spec\] |
| **Begin Time** | -a \[YYMMDDhhmm\] | --begin=YYYY-MM-DD\[THH:MM\[:SS\]\] |

| SGE | SLURM |
| --- | --- |
| qstat  <br><br>> qstat -u username  <br>> qstat -f | squeue  <br><br>> squeue -u username  <br>> squeue -al |
| qsub  <br><br>> qsub -N jobname  <br>> qsub -l h_rt=24:00:00  <br>> qsub -pe dmp4 16  <br>> qsub -l mem=4G  <br>> qsub -o filename  <br>> qsub -e filename  <br>> qsub -l scratch_free=20G | sbatch  <br><br>> sbatch -J jobname  <br>> sbatch -t 24:00:00  <br>> sbatch -p node -n 16<br><br>> sbatch --mem=4000  <br>> sbatch -o filename  <br>> sbatch -e filename |
| \# Interactive run, one core | \# Interactive run, one core |
| qrsh -l h_rt=8:00:00 | salloc -t 8:00:00  <br>interactive -p core -n 1 -t 8:00:00 |
| qdel | scancel |

| SGE for a single-core application | SLURM for a single-core application |
| --- | --- |
| #!/bin/bash<br>#<br>#<br>#$ -N test<br>#$ -j y<br>#$ -o test.output<br>#$ -cwd<br>#$ -M $USER@yourschool.edu<br>#$ -m bea<br>\# Request 5 hours run time<br>#$ -l h_rt=5:0:0<br>#$ -P your\_project\_id_here<br>#<br>#$ -l mem=4G<br>\# <br> <br><call your app here> | #!/bin/bash <br>#<br>#SBATCH -J test<br>#SBATCH -o test."%j".out<br>#SBATCH -e test."%j".err<br>\# Default in slurm<br>#SBATCH --mail-user $USER@yourschool.edu<br>#SBATCH --mail-type=ALL<br>#SBATCH -t 5:0:0 \# Request 5 hours run time<br>#SBATCH --mem=4000<br>#SBATCH -p normal<br><br> <br><load modules, call your app here> |

Comparison of some parallel environments set by sge and slurm:

| SGE | SLURM |
| --- | --- |
| `$JOB_ID` | `$SLURM_JOB_ID` |
| `$NSLOTS` | `$SLURM_NPROCS` |
