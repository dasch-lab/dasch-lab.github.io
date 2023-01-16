---
public: true
eleventyNavigation:
  parent: "Overview"
  key: "Nvidia Multi-Instance GPU"
---

# Nvidia Multi-Instance GPU (MIG)

The new 'Multi-Instance GPU (MIG)' feature allows GPUs to be partitioned into up to seven separate GPU instances for CUDA applications.

## Supported GPUs

* H100-SXM5
* H100-PCIE
* A100-SXM4 (40 and 80 GB)
* A100-PCIE (40 and 80 GB)
* A30

## Enable MIG Mode

By default, MIG mode is not enabled on the GPU, so you need to enable it:


```bash
$ nvidia-smi -i <GPU IDs> -mig 1
```

The GPUs can be selected using comma separated GPU indexes. If no GPU ID is specified, then MIG mode is applied to all the GPUs on the system.

## List GPU Instance Profiles

Once the MIG mode is activated, the NVIDIA driver provides a number of profiles that users can opt-in for when configuring the MIG feature in A100.

```bash
$ sudo nvidia-smi mig -lgip
```

## Creating GPU Instances

Before starting to use MIG, the user needs to create GPU instances using the `-cgi` option. Once the GPU instances are created, one needs to create the corresponding Compute Instance (CI). By using the `-C` option, `nvidia-smi` creates these instances.

```bash
$ sudo nvidia-smi mig -cgi <profile_ID> -C
```

Now list the available GPU instances:

```bash
$ sudo nvidia-smi mig -lgi
```

and verify that the GIs and corresponding CIs are created:

```bash
$ nvidia-smi
```

## Destroying GPU Instances

Once the GPU is in MIG mode, GIs and CIs can be configured dynamically. If the intention is to destroy all the CIs and GIs (recommended), then this can be accomplished with the following commands:

```bash
$ sudo nvidia-smi mig -dci && sudo nvidia-smi mig -dgi
```

If the output of this command says that it is impossible to destroy the instance because the GPU is occupied by a process, delete the process or restart the system with:

```bash
$ sudo reboot
```


---


### Further reading

1. Nvidia Data Center Documentation: <https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#lgi>
