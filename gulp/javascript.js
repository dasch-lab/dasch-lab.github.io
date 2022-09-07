const gulp = require('gulp');
const terser = require("gulp-terser");
const { isProd, input, output, includes } = require('../config.js');

const src = input + '/assets/js/*.js';
const dest = output + '/assets/js';

const minify = cb => {

	let stream = gulp.src(src);
	let options = {
		ecma: 5,
		safari10: true,
	};

	// Apply uglify only on prod
	stream = isProd ? stream.pipe(terser(options)) : stream;

	return stream.pipe(gulp.dest(dest));
};

const include = cb => {

	// Get a list of javascript files to be included
	let jsIncludes = includes.filter(asset => asset.endsWith('.js'));
	console.log(jsIncludes);
	return gulp.src(jsIncludes)
    	.pipe(gulp.dest(dest));
}

module.exports = gulp.series(include, minify);