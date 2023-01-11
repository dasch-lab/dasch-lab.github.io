---
public: true
eleventyNavigation:
  parent: 'Overview'
  key: 'Pymol'
---

# Pymol

PyMOL is a cross-platform molecular graphic tool and has been widely used for 3D visualization of macromolecules. The utilities of PyMOL have been extensively enhanced by various plugins, including macromolecular analysis, homology modeling, protein–ligand docking, pharmacophore modeling, VS, and MD simulations

## Installing `pymol`

If you are going to use MacPorts for the installation, then you will have to install the prerequisites as shown below.
```bash
$ sudo port install tcl-corefoundation
$ sudo port install tk-quartz
```

To install pymol:

```bash
# Using Homebrew
$ brew install brewsci/bio/pymol

# Using MacPorts
$ sudo port install pymol
```

After a successful installation, type ` $ pymol ` in the terminal to run.

## Creating animated gif

It is possible to create animated gif directly from pymol by installing ffmpeg encoder. However to my experience the quality of generated gif is poor compared to animation generated from png images. To do that, images needs to be generated with pymol via `file -> export movie as -> png` and assembled with *ImageMagick*

### Install ImageMagick
`brew install ImageMagick`

### Resize series of images
`convert *.png -resize 70% newname%02d.png`

### Convert multiple filetype(s) into animated gif
`convert -delay 10 -loop 0 *.png anim.gif`<br>
`convert -fuzz 1% -delay 1x30 *.png -coalesce -layers OptimizeTransparency animation.gif`<br>
<br>
- -fuzz tells ImageMagick to treat pixels whose color values differ by less than 1% as the same color, giving the OptimizeTransparency action more pixels to chop away.<br>
- -delay 1x30 says that the animation should play a frame every 1/30 of a second. This is the ideal frame rate for quality animations<br>

`convert -fuzz 1% -delay 10 -loop 0 *.png -coalesce -layers OptimizeTransparency animation.gif`<br>
<br>

## Further reading
1. [Pymol support](https://pymol.org/2/support.html)
2. [Pymol moviemaking](https://pymol.org/tutorials/moviemaking/)
3. [ImageMagick Convert](http://imagemagick.org/script/convert.php)