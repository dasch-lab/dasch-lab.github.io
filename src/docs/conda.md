---
public: true
eleventyNavigation:
  parent: 'Overview'
  key: 'Conda'
---

# Conda

From the website, `conda` provides ["Package, dependency and environment management for any language"](https://docs.conda.io/en/latest/).

Conda is a package manager allows specific versions of programs to be installed, alongside their dependencies.
Different sets of programs can be installed to different [virtual environments](https://www.anaconda.com/moving-conda-environments/).
A virtual environment is basically a set of programs.

## Installing `conda` globally

Conda is part of [Anaconda](https://www.anaconda.com/distribution/), which is available for free.
Conda is also available through [Miniconda](https://docs.conda.io/en/latest/miniconda.html), a free minimal installer for conda.

First of all, remove old version if you have it:

```bash
$ sudo rm -rf /opt/miniconda3/
```

Conda can be installed on a 64-bit Linux system with the following commands...

```bash
# Downloading miniconda
$ wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
# Installing miniconda
$ sudo bash Miniconda3-latest-Linux-x86_64.sh -b -p /opt/miniconda3
# Updating conda
$ conda update -q conda
# Add permission to a group if needed
$ sudo chgrp -R group_name /opt/miniconda3/
$ sudo chmod -R g+rwX /opt/miniconda3
$ sudo find /opt/miniconda3 -type d -exec chmod g+s {} +
```

## Cloning and activating a `conda` environment

Conda virtual environments can be shared, either as a `.yml` file or a `.txt` file.
A `.yml` copy of a conda environment can be used to recreate that environment on another machine, regardless of the operating system platform used.
A `.txt` copy of a conda environment is more explicit: it can be used to create an identical copy of a conda environment using the same operating system platform as the original machine.
A conda virtual environment is used throughout this project: a [`.yml` copy](../envs/bioinfo-notebook.yml) and an [explicit `.txt` copy](../envs/bioinfo-notebook.txt) of this conda environment are provided.

A conda environment can be activated using `$ conda activate name_of_environment`.
Once activated, the programs installed in this environment are available.
Conda can be deactivated using `$ conda deactivate`.

The `conda` environment used throughout this project can be created from [bioinfo-notebook.txt](../envs/bioinfo-notebook.txt) and activated using the following commands...

```bash
# Creating the bioinfo-notebook environment
/bioinfo-notebook $ conda create --name bioinfo-notebook --file envs/bioinfo-notebook.txt
# Activating the bioinfo-notebook environment
$ conda activate bioinfo-notebook
# Once activated, the environment name is at the start of the bash prompt
(bioinfo-notebook) $
```

## Environment variables
To list any variables you may have, run `conda env config vars list`.

To set environment variables, run `conda env config vars set my_var=value`.

Once you have set an environment variable, you have to reactivate your environment: `conda activate test-env`.

To check if the environment variable has been set, run `echo $my_var` or `conda env config vars list`.

When you deactivate your environment, you can use those same commands to see that the environment variable goes away.

You can specify the environment you want to affect using the `-n` and `-p` flags. The `-n` flag allows you to name the environment and `-p` allows you to specify the path to the environment.

To unset the environment variable, run `conda env config vars unset my_var -n test-env`.

Environment variables set using `conda env config vars` will be retained in the output of conda env export. Further, you can declare environment variables in the environment.yml file as shown here:

```
name: env-name
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.7
  - codecov
variables:
  VAR1: valueA
  VAR2: valueB
```
  

## Demonstration

In this video demonstration, a conda virtual environment is created using [bioinfo-notebook.txt](../envs/bioinfo-notebook.txt).
This virtual environment is then activated using `conda activate bioinfo-notebook`.
Note that the name of the active conda environment is displayed in brackets at the start of the bash prompt: `(name of active environment) ... $`.

[![asciicast](https://asciinema.org/a/305992.svg)](https://asciinema.org/a/305992?autoplay=1)

## Further reading
1. Downloading conda: <https://docs.conda.io/projects/conda/en/latest/user-guide/install/download.html>
2. Conda packages: <https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/packages.html>
3. Conda environments: <https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/environments.html>
