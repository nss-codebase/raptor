'use strict';

var pm2 = require('pm2');
var spawn = require('child_process').spawn;

module.exports = function(data){
  var socket = this;
  var dir = data.repository.split('/').pop();
  var add = spawn('/home/ubuntu/apps/code/raptor/app/bash/add.sh', [dir, data.repository, data.install, data.startup], {cwd:'/home/ubuntu/apps/portfolio'});

  add.stdout.on('data', function (data) {
    console.log('stdout: ' + data);

    /*
    var bash = data.toString();
    socket.emit('bash', {bash:bash});

    if(bash.match('pm2-start')){
      var segments = bash.trim().split(' ');
      segments.shift();
      var exe = segments.pop();
      exe = '/home/ubuntu/apps/portfolio/' + dir + '/' + exe;
      pm2.connect(function(err){
        pm2.start(exe, {name:dir, env_production:{"PORT":"3010"}, env_test:{"PORT":"3011"}}, function(err, proc){
          socket.emit('bash', {err:err, proc:proc});
        });
      });
    }
    */
  });

  add.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  add.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
};

