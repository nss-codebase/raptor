'use strict';

var spawn = require('child_process').spawn;

function Project(){
}

Project.add = function(socket, data){
  var dir = data.repository.split('/').pop();
  execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/add.sh', [dir, data.repository, data.install, data.startup], {cwd:'/home/ubuntu/apps/portfolio'});
};

Project.reboot = function(socket){
  execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/reboot.sh');
};

Project.deleteAll = function(socket){
  execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/delete-all.sh');
};

Project.freeMem = function(socket){
  execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/free-mem.sh');
};

Project.cpu = function(socket){
  execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/cpu.sh');
};

function execute(socket, file, args, opts){
  args = args || [];
  opts = opts || {};

  var exe = spawn(file, args, opts);

  exe.stdout.on('data', function(data) {
    data = data.toString();
    socket.emit('stdout', {data:data});
    console.log('stdout:', data);
  });

  exe.stderr.on('data', function(data) {
    data = data.toString();
    socket.emit('stderr', {data:data});
    console.log('stderr:', data);
  });

  exe.on('close', function(code) {
    socket.emit('close', {data:code});
    console.log('close:', code);
  });
}

module.exports = Project;

