'use strict';

var spawn = require('child_process').spawn;

module.exports = function(data){
  var dir = data.repository.split('/').pop();
  var add = spawn('/home/ubuntu/apps/code/raptor/app/bash/add.sh', [dir, data.repository, data.install, data.startup], {cwd:'/home/ubuntu/apps/portfolio'});

  add.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  add.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  add.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
};

