const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development'
const isProd = env === 'production'
const isTest = env === 'test'

// This is a list of npm modules to be included in the js folder 
const assetIncludes = [
  './node_modules/vanilla-cookieconsent/dist/cookieconsent.js',
  './node_modules/vanilla-cookieconsent/dist/cookieconsent.css'
];

module.exports = {
  env,
  isDev,
  isProd,
  isTest,
  API: process.env.API_ADDRESS,
  SERVER: process.env.SERVER_ADDRESS,
  API_KEY: process.env.API_KEY,
  input: 'src',
  output: 'build',
  scssDir: 'scss',
  jsDir: 'js',
  includes: assetIncludes
}