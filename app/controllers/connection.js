'use strict';

var projects = require('./projects');

module.exports = function(socket){
  socket.on('add', projects.add);
  socket.on('reboot', projects.reboot);
  socket.on('delete-all', projects.deleteAll);
  socket.on('free-mem', projects.freeMem);
};

