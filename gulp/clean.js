const config = require('../config.js');
const del = require('del');

const clean = (cb) => {

  return del([
    config.output + '/**/*',
    config.input + '/_data/manifest.json'
  ]);
};

module.exports = clean;