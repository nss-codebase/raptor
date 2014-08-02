'use strict';

var spawn = require('child_process').spawn;
var mongodb = require('mongodb');
var fs = require('fs');

function Project(){
}

Object.defineProperty(Project, 'collection', {
  get: function(){return global.mongodb.collection('projects');}
});

Project.findByName = function(name, cb){
  Project.collection.findOne({name:name}, cb);
};

Project.findById = function(_id, cb){
  _id = mongodb.ObjectID(_id);
  Project.collection.findOne({_id:_id}, cb);
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
      project = {name:dir, subdomain:data.subdomain, port:data.port, repository:data.repository, install:data.install, startup:data.startup};
      Project.save(project, function(){
        execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/add.sh', [dir, data.repository, data.install, data.startup], {cwd:'/home/ubuntu/apps/portfolio'});
        socket.emit('project');
      });
    }
  });
};

Project.reboot = function(socket){
  execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/reboot.sh');
};

Project.deleteAll = function(socket){
  Project.collection.remove(function(){
    execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/delete-all.sh');
    socket.emit('project');
  });
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

Project.raptor = function(socket){
  execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/raptor.sh');
};

Project.proxy = function(socket){
  Project.all(function(err, projects){
    var o = {};

    projects.forEach(function(p){
      o[p.subdomain] = 'http://localhost:'+p.port;
    });

    o = JSON.stringify(o);

    fs.writeFile('/home/ubuntu/proxy.json', o, function(err){
      execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/proxy.sh');
    });
  });
};

Project.deleteProject = function(socket, data){
  var _id = mongodb.ObjectID(data.id);
  Project.collection.findAndRemove({_id:_id}, function(err, project){
   var alias = project.startup.split(' ').pop();
   execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/delete-project.sh', [alias, project.name]);
   socket.emit('project');
  });
};

Project.updateProject = function(socket, data){
  Project.findById(data.id, function(err, project){
    execute(socket, '/home/ubuntu/apps/code/raptor/app/bash/update-project.sh', [project.name, project.repository, project.install, project.startup], {cwd:'/home/ubuntu/apps/portfolio'});
  });
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

