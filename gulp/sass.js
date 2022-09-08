const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const { isProd, input, output, includes } = require('../config.js');
const src = input + '/assets/scss/*.{scss,sass}';
const dest = output + '/assets/css';

const task = cb => {
    return gulp.src(src)
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [
                'node_modules/bootstrap/scss/',
                'node_modules/bulma-scss/'
            ]
        }).on('error', sass.logError))
        .pipe(gulp.dest(dest));
};

const include = cb => {

    // Get a list of javascript files to be included
    let cssIncludes = includes.filter(asset => asset.endsWith('.css'));
    // if(cssIncludes.length == 0){
    //     return gulp.dest(dest);
    // }
    cssIncludes = (cssIncludes.length == 0) ? '.' : cssIncludes;
    console.log(cssIncludes);
    return gulp.src(cssIncludes, {allowEmpty: true})
        .pipe(gulp.dest(dest));
}

module.exports = gulp.series(include, task);