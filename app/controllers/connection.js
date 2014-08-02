'use strict';

var projects = require('./projects');

module.exports = function(socket){
  socket.on('add', projects.add);
  socket.on('reboot', projects.reboot);
  socket.on('delete-all', projects.deleteAll);
  socket.on('free-mem', projects.freeMem);
  socket.on('cpu', projects.cpu);
  socket.on('list', projects.list);
  socket.on('proxy', projects.proxy);
  socket.on('delete-project', projects.deleteProject);
  socket.on('update-project', projects.updateProject);
};

