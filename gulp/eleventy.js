const exec = require('child_process').exec

// const eleventy = cb => {
//   const command = 'eleventy --config=eleventy.js'

//   let child = exec(command, function (err, stdout, stderr) {
//     //console.log(stdout)
//     //console.log(stderr)
//     cb(err)
//   });

//   child.stdout.on('data', function(data) {
//   	process.stdout.write(data.toString());
//     //console.log(data.toString()); 
// 	});
// }

const runCommand = (command, cb) => {
  
  let child = exec(command, function (err, stdout, stderr) {
    //console.log(stdout)
    //console.log(stderr)
    cb(err)
  });

  child.stdout.on('data', function(data) {
    process.stdout.write(data.toString());
    //console.log(data.toString()); 
  });
}

const build = cb => {
  runCommand('eleventy --config=eleventy.js', cb)
}

const watch = cb => {
  runCommand('eleventy --serve --config=eleventy.js', cb)
}

module.exports = {
  'build': build,
  'watch': watch
};