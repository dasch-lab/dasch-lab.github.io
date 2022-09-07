const path = require('path');
const gulp = require('gulp');
const del = require('del');
const rev = require('gulp-rev');
const rename = require('gulp-rename');
const stream = require('stream');
const { input, output } = require('../config.js');


const toCamelCase = (str) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr){
        return chr.toUpperCase();
    });
}

const toKebabCase = (str) => {
  return str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
}

const toSnakeCase = (str) => {
  return str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
}

const manifestType = (ext) => {
  const type = {
    '.js': 'js',
    '.mjs': 'js',
    '.css': 'css',
    'default': 'image'
  };

  return type[ext] || type['default'];
}

const initialRev = (cb) => {

  return gulp.src([ output + '/**/*.{css,js,mjs}'])
    .pipe(rev())
    .pipe(gulp.dest(output))
    .pipe(rev.manifest())
    .pipe(rename('manifest.json'))
    .pipe(gulp.dest(output));
}

const modifyRevPaths = () => {

  return new stream.Transform({
    decodeStrings: false,
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, done){

      // Append full path to manifest file
      let manifest = JSON.parse(chunk.contents.toString());
      let r = Object.keys(manifest).reduce((acc, curr) => {

        const extname = path.extname(curr);
        const filename = path.basename(curr, extname);
        const formatted = toSnakeCase(filename);
        const type = manifestType(extname);

        // Append ending slash if needed
        var filepath = manifest[curr];
        if(filepath.charAt(0) != '/')
          filepath = '/' + filepath;

        if(!(type in acc))
          acc[type] = {};

        acc[type][formatted] = filepath;

        return acc;
      }, {});

      // Generate a list of files to remove
      let removeList = Object.keys(manifest).map((acc, curr) => {

        var filepath = acc;
        if(filepath.charAt(0) != '/')
          filepath = '/' + filepath;

        return output + filepath;
      }, []);

      // Delete original files
      del.sync(removeList);

      chunk.contents = Buffer.from((JSON.stringify(r, null, 2)));
      done(null, chunk);
    }
  });
}

const modifyRev = (cb) => {
  return gulp.src( output + '/manifest.json')
    .pipe(modifyRevPaths())
    .pipe(gulp.dest(input + '/_data/'))
}

module.exports = gulp.series(initialRev, modifyRev);