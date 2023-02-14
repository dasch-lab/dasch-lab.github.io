---
public: true
eleventyNavigation:
  parent: "Overview"
  key: "PyTorch tips and tricks"
---

# PyTorch tips and tricks

We collected several PyTorch tips and tricks to handle the many steps required for training/inference processes. Below we provide a list of useful commands
with code examples.

## 1) Memory usage 

~~~
  torch.cuda.memory_allocated(device)
~~~

We can add this command for each iteration, after forward pass, and so on.

~~~
  print("Begin: {}".format(torch.cuda.memory_allocated(device)))
  model.to(device)
  print("1 - After model to device: {}".format(torch.cuda.memory_allocated(device)))
~~~

We can print the difference using variables:

~~~
  a = torch.cuda.memory_allocated(device)
  ...
  do_something
  ...
  b = torch.cuda.memory_allocated(device)
  print("Memory allocated after do_something: {}".format(b-a))
~~~

## 2) Optimizer step 

Many optimizers keep track of parameters such as an estimate of the first and second moments of the gradient, for each model weight. For the three main optimizers we have:

* Adam: twice the model size (which uses two moments)
* RMSprop: one times the model size (which uses one moment)
* SGD: zero times the model size (which doesn't uses moments)

## 3) Loading and save model

### a.  Loading to different device than the model was saved on.

~~~
  checkpoint = torch.load(save_path, map_location = device)
  model.load_state_dict(checkpoint['model'])
  optimizer.load_state_dict(checkpoint['optimizer'])
~~~

### b. Free the checkpoint variable

~~~
  del checkpoint
~~~

## 4) Asynchronous data transfer

Use `tensor.to(non_blocking=True)` when it’s applicable to overlap data transfers and kernel execution. Essentially, `non_blocking=True` allows asynchronous data transfers to reduce the execution time.


## 5) Mixed precision

Use mixed precision for forward pass (but not for backward pass)

## 6) Reset the gradients to None

Set gradients to `None` before the optimizer updates the weights.

## 7) Gradient accumulation

Update weights for every other `x` batch to mimic the larger batch size.

Let's look at an example that contains points 4), 5), 6) and 7).

~~~
  model.train()
  # 6) Reset the gradients to None
  optimizer.zero_grad(set_to_none = True)
  
  scaler = GradScaler()
  
  for i, (features, target) in enumerate(data):
    # 4) non blocking and overlapping
    features = features.to('cuda:0', non_blocking = True)
    target = target.to('cuda:0', non_blocking = True)
    
    # 5) forward pass with mixed precision
    with torch.cuda.amp.autocast():
      output = model(features)
      loss = criterion(output, target)
      
    # Backward pass without mixed precision 
    scaler.scale(loss).backward()
    
    # 7) Only update weights every other two iterations
    if (i+1) % 2 == 0 or (i+1) = len(data):
      # scaler.step() first unscales the gradients.
      # If this gradients contain infs or Nans, optimizer.step() is skipped
      scaler.step(optimizer)
      
      # If optimizer.step() was skipped, scaling factor is reduced by the backoff_factor in GradScaler()
      scaler.update()
      
      # Reset the gradient to None
      optimizer.zero_grad(set_to_none = True)
~~~

## 8) From array to torch tensor

Use `torch.from_numpy(numpy_array)` and `torch.as_tensor(others)` instead of `torch.tensor`. If both the source device and target device are CPU, `torch.from_numpy` and `torch.as_tensor` may not create data copies. If the source data is a NumPy array, it’s faster to use `torch.from_numpy(numpy_array)`. If the source data is a tensor with the same data type and device type, then `torch.as_tensor(others)` may avoid copying data if applicable. `others` can be Python list, tuple, or `torch.tensor`. If the source and target device are different, then we can use the next tip.

~~~
  torch.from_numpy(numpy_array)
  torch.as_tensor(others)
~~~

## 9) Set the sizes of all different architectural designs and batch sizes as the multiples of 8

To maximize the computation efficiency of GPU, it’s the best to ensure different architecture designs (including the input and output size/dimension/channel numbers of neural networks and batch size) are the multiples of 8 or even larger powers of two (e.g., 64, 128 and up to 256). It’s because the Tensor Cores of Nvidia GPUs achieve the best performance for matrix multiplication when the matrix dimensions align to the multiples of powers of two. 

## 10) Setting `torch.backends.cudnn.benchmark = True`

Write `torch.backends.cudnn.benchmark = True` before the training loop can speed up the computation.

WARNING: it's recommended when the input size doesn't change often, otherwise might hurt the performance.

---


### Further reading

1. <https://medium.com/deep-learning-for-protein-design/a-comprehensive-guide-to-memory-usage-in-pytorch-b9b7c78031d3>
2. <https://towardsdatascience.com/optimize-pytorch-performance-for-speed-and-memory-efficiency-2022-84f453916ea6>
