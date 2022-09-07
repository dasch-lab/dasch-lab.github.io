const { src, dest, series, parallel } = require('gulp');
//const imagemin = require('gulp-imagemin')
//const newer = require('gulp-newer')

const { input, output } = require('../config.js');

const imageInput = `${input}/assets/images/**/*`;
//const tmpOutput = './_tmp/minified'
const imageOutput = `${output}/assets/images`;

// const minifyImages = _ => {
//   return src(imageInput + '.{png,jpg,jpeg,jpg,gif}')
//     .pipe(newer(tmpOutput))
//     .pipe(imagemin([
//       imagemin.jpegtran({ progressive: true }),
//       imagemin.optipng({ optimizationLevel: 5 })
//     ]))
//     .pipe(dest(tmpOutput))
// }

const copyImagesToDist = _ => {
  //return src(tmpOutput + '/**/*')
  return src(imageInput + '.{png,jpg,jpeg,jpg,gif,svg}')
    .pipe(dest(imageOutput));
}

const copyFaviconsToDist = _ => {
  return src(input + '/assets/favicons/**/*')
    .pipe(dest(output + '/assets/favicons'));
}

const images = series(
  //minifyImages,
  parallel(copyFaviconsToDist, copyImagesToDist)
)

module.exports = images;