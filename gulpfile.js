require('dotenv-flow').config();
const gulp = require('gulp');
const clean = require('./gulp/clean');
const eleventy = require('./gulp/eleventy');
const images = require('./gulp/images');
const sass = require('./gulp/sass');
const javascript = require('./gulp/javascript');
const manifest = require('./gulp/manifest');

// Assets task
gulp.task('assets', gulp.series(
	gulp.series(clean),
	gulp.parallel(sass, images, javascript),
	gulp.series(manifest)
));

// Watch task
gulp.task('watch', gulp.series('assets', eleventy.watch, function(){

	gulp.watch('./src/scss/*.{scss,sass}', gulp.series(sass));
	gulp.watch('./src/images/**/*', gulp.series(images));
	gulp.watch('./src/js/**/*.js', gulp.series(javascript));
}));

// Build task
gulp.task('build', gulp.series('assets', eleventy.build));
