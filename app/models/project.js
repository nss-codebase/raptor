'use strict';

var spawn = require('child_process').spawn;

function Project(){
}

Object.defineProperty(Project, 'collection', {
  get: function(){return global.mongodb.collection('projects');}
});

Project.findByName = function(name, cb){
  Project.collection.findOne({name:name}, cb);
};

Project.all = function(cb){
  Project.collection.find().toArray(cb);
};

Project.save = function(obj, cb){
  Project.collection.save(obj, cb);
};

Project.add = function(socket, data){
  var dir = data.repository.split('/').pop();

  Project.findByName(dir, function(err, project){
    if(!project){
      project = {name:dir, repository:data.repository, install:data.install, startup:data.startup};
      Project.save(project, function(){
        execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/add.sh', [dir, data.repository, data.install, data.startup], {cwd:'/home/ubuntu/apps/portfolio'});
        socket.emit('project', project);
      });
    }
  });
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

Project.list = function(socket){
  execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/list.sh');
};

function execute(socket, file, args, opts){
  args = args || [];
  opts = opts || {};

  var exe = spawn(file, args, opts);

  exe.stdout.on('data', function(data){
    output(socket, 'stdout', data);
  });

  exe.stderr.on('data', function(data){
    output(socket, 'stderr', data);
  });

  exe.on('close', function(data){
    output(socket, 'close', data);
  });
}

function output(socket, name, data){
  data = data.toString();
  socket.emit(name, {data:data});
  console.log(name, data);
}

module.exports = Project;

